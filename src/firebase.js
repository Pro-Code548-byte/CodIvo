import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCs7rOS3VXrZfQbI6r-98H-Dp5kcAzNb_E',
  authDomain: 'codivo-3cb4f.firebaseapp.com',
  projectId: 'codivo-3cb4f',
  storageBucket: 'codivo-3cb4f.firebasestorage.app',
  messagingSenderId: '1010774708108',
  appId: '1:1010774708108:web:a7243d48c5ecbe0d0350a9',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export function authErrorMessage(code) {
  const messages = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts — try again later.',
    'auth/network-request-failed': 'Network error — check your connection.',
  }
  return messages[code] ?? 'Something went wrong. Please try again.'
}
