import { useCallback, useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuth } from './authContext.js'
import { ProgressContext } from './progressContext.js'

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const [state, setState] = useState({ uid: null, completed: {}, loading: false })
  const { uid, completed, loading } = state

  if (uid !== (user?.uid ?? null)) {
    setState({ uid: user?.uid ?? null, completed: {}, loading: !!user })
  }

  useEffect(() => {
    if (!user) return undefined
    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        setState({ uid: user.uid, completed: snap.data()?.completedTopics ?? {}, loading: false })
      },
      () => {
        setState({ uid: user.uid, completed: {}, loading: false })
      },
    )
    return unsubscribe
  }, [user])

  const toggle = useCallback(
    async (lang, topic) => {
      if (!user) return
      const current = completed[lang] ?? []
      const nextList = current.includes(topic)
        ? current.filter((t) => t !== topic)
        : [...current, topic]
      const next = { ...completed, [lang]: nextList }
      setState({ uid: user.uid, completed: next, loading: false })
      await setDoc(doc(db, 'users', user.uid), { completedTopics: next }, { merge: true })
    },
    [user, completed],
  )

  return (
    <ProgressContext.Provider value={{ completed, loading, toggle }}>
      {children}
    </ProgressContext.Provider>
  )
}
