const env = (import.meta.env ?? {})

export const FIREBASE_CONFIG = {
  apiKey: env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: env.VITE_FIREBASE_APP_ID ?? '',
}

export const isFirebaseReady = Boolean(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId)

let app = null
let firestore = null

export async function initFirebase() {
  if (app) return app
  const { initializeApp } = await import('firebase/app')
  app = initializeApp(FIREBASE_CONFIG)
  return app
}

export async function initFirestore() {
  if (firestore) return firestore
  const app = await initFirebase()
  const { getFirestore } = await import('firebase/firestore')
  firestore = getFirestore(app)
  return firestore
}

export function getFirestoreInstance() {
  return firestore
}