import { initFirestore, isFirebaseReady } from './firebase.js'

const ROOM_TTL = 2 * 60 * 60 * 1000

function connectLocal(code) {
  return new BroadcastChannel(`codivo-duel-${code}`)
}

async function connectFirestore({ code, role }) {
  const db = await initFirestore()
  const { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, addDoc } = await import('firebase/firestore')
  const roomRef = doc(db, 'duels', code)
  const actionsRef = collection(db, 'duels', code, 'actions')
  const listeners = new Set()
  let closed = false

  const emit = (msg) => {
    for (const cb of listeners) cb({ data: msg })
  }

  if (role === 'guest') {
    let snap
    try {
      snap = await getDoc(roomRef)
    } catch {
      snap = null
    }
    if (!snap?.exists() || (snap.data()?.expiresAt ?? 0) < Date.now()) {
      throw new Error('Room not found')
    }
  }

  const unsubRoom = onSnapshot(roomRef, (snap) => {
    if (closed) return
    if (!snap.exists()) {
      emit({ type: 'close' })
      return
    }
    emit({ type: 'sync', state: snap.data() })
  })

  let unsubActions = null
  if (role === 'host') {
    unsubActions = onSnapshot(actionsRef, (snap) => {
      if (closed) return
      snap.docChanges().forEach((change) => {
        if (change.type !== 'added') return
        emit(change.doc.data())
        deleteDoc(change.doc.ref).catch(() => {})
      })
    })
  }

  return {
    postMessage(msg) {
      if (closed) return
      if (msg?.type === 'close') {
        if (role === 'host') deleteDoc(roomRef).catch(() => {})
        return
      }
      if (role === 'host' && msg?.type === 'sync') {
        setDoc(roomRef, { ...msg.state, expiresAt: Date.now() + ROOM_TTL }).catch(() => {})
        return
      }
      if (role === 'guest' && msg?.type === 'sync') return
      const { type, ...rest } = msg
      addDoc(actionsRef, { type, ...rest }).catch(() => {})
    },
    addEventListener(type, cb) {
      if (type === 'message') listeners.add(cb)
    },
    removeEventListener(type, cb) {
      if (type === 'message') listeners.delete(cb)
    },
    close() {
      closed = true
      unsubRoom()
      unsubActions?.()
    },
    kind: 'firestore',
  }
}

export async function connectDuel({ code, role }) {
  if (isFirebaseReady) {
    try {
      return await connectFirestore({ code, role })
    } catch {
      throw new Error('Room not found')
    }
  }
  return connectLocal(code)
}

export function transportKind(ch) {
  return ch?.kind ?? 'local'
}