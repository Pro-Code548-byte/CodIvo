import { useCallback, useEffect, useState } from 'react'
import { GameContext } from './gameContext.js'
import {
  AVATARS,
  DEFAULT_PARENT,
  companions,
  getChallengesInLand,
  getChallenge,
} from '../data/game.js'

const STORAGE_KEY = 'codivo-kids-state-v2'

const DEFAULT_STATE = { profile: null, parent: DEFAULT_PARENT, account: null }

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

export function GameProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- legacy pattern: hydrate state once on mount
      if (saved) setState({ ...DEFAULT_STATE, ...JSON.parse(saved) })
    } catch {
      // ignore corrupted state
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, ready])

  const signUp = useCallback((email, password) => {
    const value = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please type a real email address.'
    if (password.length < 6) return 'Password needs at least 6 characters.'
    setState((s) => ({
      ...s,
      account: { email: value, password },
      parent: { ...s.parent, email: value },
      profile: s.profile ?? makeProfile(value.split('@')[0], value),
    }))
    return null
  }, [])

  const signIn = useCallback((email, password) => {
    const value = email.trim().toLowerCase()
    let error = null
    setState((s) => {
      if (!s.account || s.account.email !== value || s.account.password !== password) {
        error = "That email or password doesn't match."
        return s
      }
      return s
    })
    if (error) return error
    setState((s) => {
      if (!s.profile) {
        return {
          ...s,
          profile: makeProfile(value.split('@')[0], value),
        }
      }
      return s
    })
    return null
  }, [])

  const logout = useCallback(() => {
    setState({ profile: null, parent: DEFAULT_PARENT, account: null })
  }, [])

  const completeChallenge = useCallback((challengeId) => {
    const challenge = getChallenge(challengeId)
    let newLandComplete = false
    let leveledUp = false
    setState((s) => {
      if (!s.profile || !challenge || s.profile.completedChallengeIds.includes(challengeId)) {
        return s
      }
      const completed = [...s.profile.completedChallengeIds, challengeId]
      const stickerIds = s.profile.stickerIds.includes(challenge.stickerId)
        ? s.profile.stickerIds
        : [...s.profile.stickerIds, challenge.stickerId]
      const companionLevel = Math.min(6, 1 + Math.floor(completed.length / 2))
      newLandComplete = getChallengesInLand(challenge.landId).every((c) =>
        completed.includes(c.id),
      )
      leveledUp = companionLevel > s.profile.companionLevel
      return {
        ...s,
        profile: {
          ...s.profile,
          completedChallengeIds: completed,
          stickerIds,
          companionLevel,
          minutesLearning: s.profile.minutesLearning + challenge.minutes,
        },
      }
    })
    return { newLandComplete, leveledUp }
  }, [])

  const updateProfile = useCallback((patch) => {
    setState((s) => (s.profile ? { ...s, profile: { ...s.profile, ...patch } } : s))
  }, [])

  const chooseOutfit = useCallback((id) => {
    setState((s) =>
      s.profile
        ? { ...s, profile: { ...s.profile, outfitId: s.profile.outfitId === id ? null : id } }
        : s,
    )
  }, [])

  const addMinutes = useCallback((minutes) => {
    setState((s) =>
      s.profile
        ? { ...s, profile: { ...s.profile, minutesLearning: s.profile.minutesLearning + minutes } }
        : s,
    )
  }, [])

  const updateParent = useCallback((patch) => {
    setState((s) => ({ ...s, parent: { ...s.parent, ...patch } }))
  }, [])

  const resetAll = useCallback(() => {
    setState({ profile: null, parent: DEFAULT_PARENT, account: null })
  }, [])

  return (
    <GameContext.Provider
      value={{
        ready,
        profile: state.profile,
        parent: state.parent,
        account: state.account,
        signUp,
        signIn,
        logout,
        completeChallenge,
        updateProfile,
        chooseOutfit,
        addMinutes,
        updateParent,
        resetAll,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}