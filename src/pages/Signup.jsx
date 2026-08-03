import { useState } from 'react'
import { Link } from 'react-router-dom'
import { btnPrimary } from '../components/buttonClasses.js'
import { headingGradient } from '../components/headingClasses.js'

const inputClasses =
  'rounded-[10px] border border-surface-2 bg-bg px-3.5 py-2.5 text-base text-ink focus:border-transparent focus:outline-2 focus:outline-primary'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('Signup is not wired to a backend yet — check back soon!')
  }

  return (
    <section className="flex animate-fade-in justify-center">
      <div className="w-full max-w-[400px] rounded-[10px] border border-surface-2 bg-surface p-6 shadow-sm sm:p-8">
        <h1 className={`mb-2 text-center text-[clamp(1.9rem,6vw,2.2rem)] font-bold ${headingGradient}`}>
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
              placeholder="Choose a password"
            />
          </label>
          <button type="submit" className={`${btnPrimary} w-full`}>
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4 text-lg font-bold">{message}</p>}
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
