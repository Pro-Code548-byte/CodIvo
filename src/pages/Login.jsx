import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, authErrorMessage } from '../firebase.js'
import { useAuth } from '../context/authContext.js'
import { btnPrimary } from '../components/buttonClasses.js'
import { headingGradient } from '../components/headingClasses.js'

const inputClasses =
  'rounded-[10px] border-2 border-surface-2 bg-bg px-3.5 py-2.5 text-base font-medium text-ink transition-all duration-150 shadow-[0_2px_0_0_var(--color-surface-2)] focus:border-primary focus:outline-none focus:shadow-[0_3px_0_0_var(--color-primary)]'

export default function Login() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname ?? '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate(from, { replace: true })
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
          Log In
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              placeholder="Your password"
            />
          </label>
          <button type="submit" disabled={submitting} className={`${btnPrimary} w-full`}>
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>
        {error && <p className="mt-4 text-lg font-bold text-danger">{error}</p>}
        <p className="mt-5 text-center text-muted">
          New here?{' '}
          <Link to="/signup" className="no-underline text-accent hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  )
}
