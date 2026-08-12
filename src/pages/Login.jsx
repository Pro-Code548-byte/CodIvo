import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { KidButton, KidCard } from '../components/kid.jsx'
import { useGame } from '../context/gameContext.js'

const inputClasses =
  'mt-2 w-full rounded-3xl border-4 border-input bg-background px-5 py-3 text-lg outline-none focus:border-ring'

export default function Login() {
  const { ready, profile, signIn } = useGame()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (ready && profile) return <Navigate to="/map" replace />

  const submit = () => {
    const err = signIn(email, password)
    if (err) {
      setError(err)
      return
    }
    navigate('/map')
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="text-center font-display text-4xl">Welcome back 👋</h1>
      <KidCard className="mt-6 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <label htmlFor="login-email" className="font-display text-xl">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
          />
          <label htmlFor="login-password" className="mt-5 block font-display text-xl">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className={inputClasses}
          />
          {error && <p className="mt-3 text-lg text-destructive">{error}</p>}
          <div className="mt-6 flex justify-center">
            <KidButton tone="primary" type="submit" className="px-10 py-4 text-xl">
              🔑 Log in
            </KidButton>
          </div>
        </form>
      </KidCard>
      <p className="mt-6 text-center text-lg">
        New here?{' '}
        <Link to="/signup" className="underline">
          Create an account
        </Link>
      </p>
    </main>
  )
}