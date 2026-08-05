import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useAuth } from '../context/authContext.js'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/learn', label: 'Learn' },
  { to: '/duel', label: 'Duel' },
  { to: '/race', label: 'Race the Bot' },
  { to: '/help', label: 'Help' },
]

const linkBase =
  'block rounded-full border-2 px-4 py-1.5 text-sm font-extrabold no-underline transition-all duration-100 active:translate-y-0.5 active:shadow-none'

export default function Navbar() {
  const { user } = useAuth()
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await signOut(auth)
    setOpen(false)
  }

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('codivo-theme', next ? 'dark' : 'light')
  }

  return (
    <nav className="relative sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b-2 border-surface-2 bg-bg px-4 py-4 sm:px-6">
      <NavLink
        to="/"
        className="group flex items-center gap-2.5 text-[1.4rem] font-extrabold tracking-wide no-underline hover:animate-wiggle"
      >
        <span className="flex size-9 items-center justify-center rounded-[10px] border-2 border-primary-hover bg-primary shadow-[0_3px_0_0_var(--color-primary-hover)] transition-transform duration-150 group-hover:rotate-12">
          <svg
            className="size-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M18.4 5.6l-2.1 2.1m-8.6 8.6-2.1 2.1" />
          </svg>
        </span>
        <span>
          <span className="text-primary">Cod</span> <span className="text-accent">Ivo</span>
        </span>
      </NavLink>
      <ul
        className={`${
          open ? 'max-sm:flex' : 'max-sm:hidden'
        } m-0 flex flex-wrap list-none gap-1 p-0 max-sm:absolute max-sm:inset-x-4 max-sm:top-full max-sm:z-10 max-sm:mt-2 max-sm:flex-col max-sm:gap-1 max-sm:rounded-[14px] max-sm:border-2 max-sm:border-surface-2 max-sm:bg-bg max-sm:p-2 max-sm:shadow-[0_4px_0_0_var(--color-surface-2)]`}
      >
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? `${linkBase} border-primary-hover bg-primary text-white shadow-[0_3px_0_0_var(--color-primary-hover)]`
                  : `${linkBase} border-surface-2 bg-bg text-muted shadow-[0_3px_0_0_var(--color-surface-2)] hover:-translate-y-0.5 hover:border-primary hover:text-ink`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        {user ? (
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className={`${linkBase} w-full border-surface-2 bg-bg text-muted shadow-[0_3px_0_0_var(--color-surface-2)] hover:-translate-y-0.5 hover:border-danger hover:text-danger`}
            >
              Log Out
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? `${linkBase} border-primary-hover bg-primary text-white shadow-[0_3px_0_0_var(--color-primary-hover)]`
                    : `${linkBase} border-surface-2 bg-bg text-muted shadow-[0_3px_0_0_var(--color-surface-2)] hover:-translate-y-0.5 hover:border-primary hover:text-ink`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                onClick={() => setOpen(false)}
                className={`${linkBase} border-accent-hover bg-accent text-white shadow-[0_3px_0_0_var(--color-accent-hover)] enabled:hover:-translate-y-0.5 enabled:hover:brightness-110`}
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div className="flex items-center gap-1">
        {user && (
          <span className="hidden rounded-full border-2 border-surface-2 bg-surface px-3.5 py-1 text-sm font-bold text-muted sm:block">
            Hi, {user.displayName ?? user.email}
          </span>
        )}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="rounded-[10px] border-2 border-surface-2 p-2 text-muted shadow-[0_3px_0_0_var(--color-surface-2)] transition-all duration-100 active:translate-y-0.5 active:shadow-none hover:-translate-y-0.5 hover:border-primary hover:text-ink"
        >
          {dark ? (
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
            </svg>
          ) : (
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="hidden rounded-[10px] border-2 border-surface-2 p-2 text-muted shadow-[0_3px_0_0_var(--color-surface-2)] transition-all duration-100 active:translate-y-0.5 active:shadow-none hover:-translate-y-0.5 hover:border-primary hover:text-ink max-sm:block"
        >
          {open ? (
            <svg
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
