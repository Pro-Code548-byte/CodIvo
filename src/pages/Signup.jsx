import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, authErrorMessage } from '../firebase.js'
import { useAuth } from '../context/authContext.js'
import { btnPrimary } from '../components/buttonClasses.js'
import { headingGradient } from '../components/headingClasses.js'

const inputClasses =
  'rounded-[10px] border-2 border-surface-2 bg-bg px-3.5 py-2.5 text-base font-medium text-ink transition-all duration-150 shadow-[0_2px_0_0_var(--color-surface-2)] focus:border-primary focus:outline-none focus:shadow-[0_3px_0_0_var(--color-primary)]'

export default function Signup() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const { user: created } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(created, { displayName: name.trim() })
      navigate('/')
    } catch (err) {
      setError(authErrorMessage(err.code))
      setSubmitting(false)
    }
  }

  if (user) return <Navigate to="/" replace />

  return (
    <section className="flex animate-fade-in justify-center">
      <div className="w-full max-w-[400px] rounded-[14px] border-2 border-surface-2 bg-surface p-6 shadow-[0_5px_0_0_var(--color-surface-2)] sm:p-8">
        <h1 className={`mb-2 text-center text-[clamp(1.9rem,6vw,2.2rem)] font-extrabold ${headingGradient}`}>
          Create Account
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-muted">
            Name
            <input
              className={inputClasses}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-muted">
            Email
            <input
              className={inputClasses}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-muted">
            Password
            <input
              className={inputClasses}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Choose a password"
            />
          </label>
          <button type="submit" disabled={submitting} className={`${btnPrimary} w-full`}>
            {submitting ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>
        {error && <p className="mt-4 text-lg font-bold text-danger">{error}</p>}
        <p className="mt-5 text-center text-muted">
          Already have an account?{' '}
          <Link to="/login" className="no-underline text-accent hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  )
}
