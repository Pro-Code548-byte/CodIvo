import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { KidButton, KidCard } from '../components/kid.jsx'
import { useGame } from '../context/gameContext.js'

const inputClasses =
  'mt-2 w-full rounded-3xl border-4 border-input bg-background px-5 py-3 text-lg outline-none focus:border-ring'

export default function Signup() {
  const { ready, profile, signUp } = useGame()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (ready && profile) return <Navigate to="/map" replace />

  const submit = () => {
    const err = signUp(email, password)
    if (err) {
      setError(err)
      return
    }
    navigate('/map')
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="text-center font-display text-4xl">Create your account ✨</h1>
      <p className="mt-2 text-center text-lg text-muted-foreground">
        Just an email and a password — then you can start coding.
      </p>
      <KidCard className="mt-6 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <label htmlFor="signup-email" className="font-display text-xl">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
          />
          <label htmlFor="signup-password" className="mt-5 block font-display text-xl">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className={inputClasses}
          />
          {error && <p className="mt-3 text-lg text-destructive">{error}</p>}
          <div className="mt-6 flex justify-center">
            <KidButton tone="primary" type="submit" className="px-10 py-4 text-xl">
              🚀 Create account
            </KidButton>
          </div>
        </form>
      </KidCard>
      <p className="mt-6 text-center text-lg">
        Already have an account?{' '}
        <Link to="/login" className="underline">
          Log in
        </Link>
      </p>
    </main>
  )
}