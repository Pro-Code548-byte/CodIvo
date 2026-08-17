import { useCallback, useEffect, useRef, useState } from 'react'
import { GameContext } from './gameContext.js'
import {
  AVATARS,
  companions,
  getChallengesInLand,
  getChallenge,
} from '../data/game.js'
import { initFirebase, initFirestore, isFirebaseReady } from '../lib/firebase.js'

const STORAGE_KEY = 'codivo-kids-state-v3'

const DEFAULT_STATE = { account: null, users: {} }

function makeProfile(name, email) {
  return {
    id: `child-${Date.now()}`,
    name: (name ?? '').trim() || email.split('@')[0] || 'Friend',
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

async function writeProfileDoc(uid, profile) {
  if (!isFirebaseReady || !uid || !profile) return
  try {
    const db = await initFirestore()
    const { doc, setDoc } = await import('firebase/firestore')
    await setDoc(doc(db, 'users', uid), profile)
  } catch {
    // offline or not configured — local state still works
  }
}

async function readProfileDoc(uid) {
  if (!isFirebaseReady || !uid) return null
  try {
    const db = await initFirestore()
    const { doc, getDoc } = await import('firebase/firestore')
    const snap = await getDoc(doc(db, 'users', uid))
    return snap.exists() ? snap.data() : null
  } catch {
    return null
  }
}

function readCachedProfile(uid, email) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    return saved?.users?.[uid]?.profile ?? saved?.users?.[email]?.profile ?? null
  } catch {
    return null
  }
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
    let unsub = null
    let cancelled = false
    const hydrate = (next) => {
      if (cancelled) return
      commit(next)
      setReady(true)
    }
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
      if (isFirebaseReady) {
        ;(async () => {
          const app = await initFirebase()
          const { getAuth, onAuthStateChanged } = await import('firebase/auth')
          unsub = onAuthStateChanged(getAuth(app), (user) => {
            if (!user) {
              hydrate({ ...migrate(saved), account: null })
              return
            }
            ;(async () => {
              let profile = (await readProfileDoc(user.uid)) ?? readCachedProfile(user.uid, user.email)
              if (!profile) profile = makeProfile('', user.email)
              writeProfileDoc(user.uid, profile)
              hydrate({
                account: user.uid,
                users: { [user.uid]: { profile } },
              })
            })()
          })
        })()
      } else {
        hydrate(migrate(saved))
      }
    } catch {
      hydrate(DEFAULT_STATE)
    }
    return () => {
      cancelled = true
      unsub?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, [])

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, ready])

  const signUp = useCallback(
    async (email, password, name) => {
      const value = email.trim().toLowerCase()
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please type a real email address.'
      if (password.length < 6) return 'Password needs at least 6 characters.'
      if (isFirebaseReady) {
        try {
          const app = await initFirebase()
          const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth')
          const cred = await createUserWithEmailAndPassword(getAuth(app), value, password)
          const profile = makeProfile(name, value)
          writeProfileDoc(cred.user.uid, profile)
          const s = stateRef.current
          commit({ ...s, account: cred.user.uid, users: { ...s.users, [cred.user.uid]: { profile } } })
          return null
        } catch (err) {
          const code = err?.code ?? ''
          if (code.includes('email-already-in-use')) return 'That email already has an account. Please log in instead.'
          if (code.includes('weak-password')) return 'Password needs at least 6 characters.'
          return 'Something went wrong — try again!'
        }
      }
      const s = stateRef.current
      if (s.users[value]) return 'That email already has an account. Please log in instead.'
      commit({
        ...s,
        users: {
          ...s.users,
          [value]: { passwordHash: hashPassword(password), profile: makeProfile(name, value) },
        },
        account: value,
      })
      return null
    },
    [commit],
  )

  const signIn = useCallback(
    async (email, password) => {
      const value = email.trim().toLowerCase()
      if (isFirebaseReady) {
        try {
          const app = await initFirebase()
          const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')
          const cred = await signInWithEmailAndPassword(getAuth(app), value, password)
          const s = stateRef.current
          const cached = readCachedProfile(cred.user.uid, value)
          const profile = (await readProfileDoc(cred.user.uid)) ?? cached ?? makeProfile('', value)
          writeProfileDoc(cred.user.uid, profile)
          commit({
            ...s,
            account: cred.user.uid,
            users: { ...s.users, [cred.user.uid]: { profile } },
          })
          return null
        } catch (err) {
          const code = err?.code ?? ''
          if (code.includes('invalid-credential') || code.includes('user-not-found') || code.includes('wrong-password')) {
            return "That email or password doesn't match."
          }
          return 'Something went wrong — try again!'
        }
      }
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
    if (isFirebaseReady) {
      initFirebase()
        .then((app) =>
          import('firebase/auth').then(({ getAuth, signOut }) => signOut(getAuth(app)).catch(() => {})),
        )
        .catch(() => {})
    }
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
      writeProfileDoc(s.account, profile)
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