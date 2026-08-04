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
  'block rounded-lg px-3.5 py-2 text-sm font-semibold no-underline transition-colors duration-150'

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
    <nav className="relative sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-surface-2 bg-bg px-4 py-4 sm:px-6">
      <NavLink to="/" className="text-[1.4rem] font-extrabold tracking-wide no-underline">
        <span className="text-primary">Cod</span> <span className="text-accent">Ivo</span>
      </NavLink>
      <ul
        className={`${
          open ? 'max-sm:flex' : 'max-sm:hidden'
        } m-0 flex flex-wrap list-none gap-1 p-0 max-sm:absolute max-sm:inset-x-4 max-sm:top-full max-sm:z-10 max-sm:mt-2 max-sm:flex-col max-sm:gap-0.5 max-sm:rounded-[10px] max-sm:border max-sm:border-surface-2 max-sm:bg-bg max-sm:p-2 max-sm:shadow-lg`}
      >
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? `${linkBase} bg-primary text-white`
                  : `${linkBase} text-muted hover:bg-surface-2 hover:text-ink`
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
              className={`${linkBase} w-full text-muted hover:bg-surface-2 hover:text-ink`}
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
                    ? `${linkBase} bg-primary text-white`
                    : `${linkBase} text-muted hover:bg-surface-2 hover:text-ink`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? `${linkBase} bg-primary text-white`
                    : `${linkBase} bg-accent text-white enabled:hover:bg-accent-hover`
                }
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div className="flex items-center gap-1">
        {user && (
          <span className="hidden text-sm font-semibold text-muted sm:block">
            Hi, {user.displayName ?? user.email}
          </span>
        )}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="rounded-lg p-2 text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
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
          className="hidden rounded-lg p-2 text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-ink max-sm:block"
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
