import { useCallback, useEffect, useRef, useState } from 'react'
import { GameContext } from './gameContext.js'
import {
  AVATARS,
  companions,
  getChallengesInLand,
  getChallenge,
} from '../data/game.js'

const STORAGE_KEY = 'codivo-kids-state-v3'

const DEFAULT_STATE = { account: null, users: {} }

function makeProfile(name, email) {
  return {
    id: `child-${Date.now()}`,
    name: name.trim() || email.split('@')[0] || 'Friend',
    avatar: AVATARS[0],
    companionId: companions[0].id,
    companionLevel: 1,
    outfitId: null,
    completedChallengeIds: [],
    stickerIds: [],
    minutesLearning: 0,
    createdAt: new Date().toISOString(),
  }
}

function hashPassword(password) {
  let hash = 0x811c9dc5
  for (let i = 0; i < password.length; i++) {
    hash ^= password.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(36)
}

function migrate(saved) {
  if (!saved) return DEFAULT_STATE
  if (saved.users) {
    return { account: saved.account ?? null, users: saved.users }
  }
  const users = {}
  if (saved.account?.email) {
    users[saved.account.email] = {
      passwordHash: hashPassword(saved.account.password),
      profile: saved.profile ?? null,
    }
  }
  return { account: saved.account?.email ?? null, users }
}

export function GameProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE)
  const [ready, setReady] = useState(false)
  const stateRef = useRef(state)

  const commit = useCallback((next) => {
    stateRef.current = next
    setState(next)
  }, [])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- legacy pattern: hydrate state once on mount
      commit(migrate(JSON.parse(saved)))
    } catch {
      commit(DEFAULT_STATE)
    }
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, [])

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, ready])

  const signUp = useCallback(
    (email, password) => {
      const value = email.trim().toLowerCase()
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please type a real email address.'
      if (password.length < 6) return 'Password needs at least 6 characters.'
      const s = stateRef.current
      if (s.users[value]) return 'That email already has an account. Please log in instead.'
      commit({
        ...s,
        users: {
          ...s.users,
          [value]: { passwordHash: hashPassword(password), profile: makeProfile(value.split('@')[0], value) },
        },
        account: value,
      })
      return null
    },
    [commit],
  )

  const signIn = useCallback(
    (email, password) => {
      const value = email.trim().toLowerCase()
      const s = stateRef.current
      const user = s.users[value]
      if (!user || user.passwordHash !== hashPassword(password)) {
        return "That email or password doesn't match."
      }
      commit({ ...s, account: value })
      return null
    },
    [commit],
  )

  const logout = useCallback(() => {
    commit({ ...stateRef.current, account: null })
  }, [commit])

  const patchActiveProfile = useCallback(
    (fn) => {
      const s = stateRef.current
      if (!s.account) return null
      const user = s.users[s.account]
      if (!user) return null
      const profile = fn(user.profile)
      if (!profile) return null
      commit({ ...s, users: { ...s.users, [s.account]: { ...user, profile } } })
      return profile
    },
    [commit],
  )

  const completeChallenge = useCallback(
    (challengeId) => {
      const s = stateRef.current
      if (!s.account) return { newLandComplete: false, leveledUp: false }
      const profile = s.users[s.account]?.profile
      if (!profile) return { newLandComplete: false, leveledUp: false }
      const challenge = getChallenge(challengeId)
      if (!challenge || profile.completedChallengeIds.includes(challengeId)) {
        return { newLandComplete: false, leveledUp: false }
      }
      const completed = [...profile.completedChallengeIds, challengeId]
      const stickerIds = profile.stickerIds.includes(challenge.stickerId)
        ? profile.stickerIds
        : [...profile.stickerIds, challenge.stickerId]
      const companionLevel = Math.min(6, 1 + Math.floor(completed.length / 2))
      const newLandComplete = getChallengesInLand(challenge.landId).every((c) =>
        completed.includes(c.id),
      )
      const leveledUp = companionLevel > profile.companionLevel
      patchActiveProfile(() => ({
        ...profile,
        completedChallengeIds: completed,
        stickerIds,
        companionLevel,
        minutesLearning: profile.minutesLearning + challenge.minutes,
      }))
      return { newLandComplete, leveledUp }
    },
    [patchActiveProfile],
  )

  const updateProfile = useCallback(
    (patch) => {
      patchActiveProfile((p) => ({ ...p, ...patch }))
    },
    [patchActiveProfile],
  )

  const chooseOutfit = useCallback(
    (id) => {
      patchActiveProfile((p) => ({ ...p, outfitId: p.outfitId === id ? null : id }))
    },
    [patchActiveProfile],
  )

  const addMinutes = useCallback(
    (minutes) => {
      patchActiveProfile((p) => ({ ...p, minutesLearning: p.minutesLearning + minutes }))
    },
    [patchActiveProfile],
  )

  const profile = state.account ? state.users[state.account]?.profile ?? null : null

  return (
    <GameContext.Provider
      value={{
        ready,
        profile,
        account: state.account,
        signUp,
        signIn,
        logout,
        completeChallenge,
        updateProfile,
        chooseOutfit,
        addMinutes,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}