import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useGame } from '../context/gameContext.js'
import { AVATARS, companions } from '../data/game.js'
import { KidButton, HomeIcon, BookOpenIcon, SwordsIcon, BotIcon, TrophyIcon, LogOutIcon, CheckIcon } from './kid.jsx'
import { cn } from './cn.js'

const navItems = [
  { to: '/', label: 'Home', Icon: HomeIcon, exact: true },
  { to: '/map', label: 'Learn', Icon: BookOpenIcon, exact: false },
  { to: '/race', label: 'Duel', Icon: SwordsIcon, exact: false },
  { to: '/race-bot', label: 'Race Bot', Icon: BotIcon, exact: false },
]

const pillBase =
  'inline-flex items-center gap-1.5 rounded-2xl px-2.5 py-1.5 font-display text-base no-underline transition-colors duration-100 sm:px-3 sm:py-2 sm:text-lg'

function ProfileMenu({ profile, onLogout }) {
  const { updateProfile } = useGame()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState(profile?.name ?? '')
  const [avatar, setAvatar] = useState(profile?.avatar ?? AVATARS[0])
  const [companionId, setCompanionId] = useState(profile?.companionId ?? companions[0].id)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const openDialog = () => {
    setName(profile?.name ?? '')
    setAvatar(profile?.avatar ?? AVATARS[0])
    setCompanionId(profile?.companionId ?? companions[0].id)
    setOpen(false)
    setDialogOpen(true)
  }

  const save = () => {
    updateProfile({ name: name.trim() || profile?.name || 'Friend', avatar, companionId })
    setDialogOpen(false)
  }

  const headerBtn = (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-haspopup="menu"
      aria-expanded={open}
className="chunky chunky-press flex items-center gap-1.5 rounded-3xl bg-card px-3 py-1.5 font-display text-base sm:gap-2 sm:px-4 sm:py-2 sm:text-lg"
    >
      <span className="text-xl sm:text-2xl">{profile?.avatar ?? AVATARS[0]}</span>
      <span className="max-w-20 truncate sm:max-w-24">{profile?.name}</span>
      <span aria-hidden>▾</span>
    </button>
  )

  return (
    <div ref={ref} className="relative">
      {open ? (
        <div className="flex flex-col items-end gap-1">
          {headerBtn}
          <div role="menu" className="w-56 animate-fade-in rounded-2xl border-2 border-surface-2 bg-card p-1.5 shadow-pillow">
            <button
              type="button"
              role="menuitem"
              onClick={openDialog}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-base font-bold text-foreground no-underline transition-colors duration-100 hover:bg-secondary"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Change name &amp; character
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false)
                navigate('/trophies')
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-base font-bold text-foreground no-underline transition-colors duration-100 hover:bg-secondary"
            >
              <TrophyIcon className="size-4" />
              My trophies
            </button>
            <div className="mx-1 my-1 border-t-2 border-dashed border-surface-2" />
            <button
              type="button"
              role="menuitem"
              onClick={onLogout}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-base font-bold text-danger transition-colors duration-100 hover:bg-danger/10"
            >
              <LogOutIcon className="size-4" />
              Log out
            </button>
          </div>
        </div>
      ) : (
        headerBtn
      )}

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md animate-pop-in rounded-3xl border-4 border-card bg-card p-6 shadow-pillow">
            <h2 className="mb-4 font-display text-2xl">My profile</h2>
            <label className="font-display text-lg" htmlFor="nav-name">
              Name
            </label>
            <input
              id="nav-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-2xl border-4 border-input bg-background px-4 py-3 font-display text-xl outline-none focus:border-ring"
            />
            <p className="mt-4 font-display text-lg">Character</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAvatar(a)}
                  aria-label={`avatar ${a}`}
                  className={cn('chunky chunky-press size-14 rounded-2xl bg-secondary text-3xl', avatar === a && 'ring-4 ring-ring')}
                >
                  {a}
                </button>
              ))}
            </div>
            <p className="mt-4 font-display text-lg">Buddy</p>
            <div className="mt-1 grid grid-cols-4 gap-2">
              {companions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCompanionId(c.id)}
                  className={cn('chunky chunky-press rounded-2xl bg-sunny p-2 text-sunny-foreground', companionId === c.id && 'ring-4 ring-ring')}
                >
                  <span className="block text-3xl">{c.emoji}</span>
                  <span className="block font-display text-sm">{c.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <KidButton tone="jungle" onClick={save} className="inline-flex items-center gap-2">
                <CheckIcon className="size-5" />
                Save
              </KidButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { profile, ready, logout } = useGame()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b-4 border-card/60 bg-background/90 backdrop-blur">
<nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 px-3 py-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-3 sm:px-4">
        <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-primary no-underline sm:text-3xl">
          🧩 Codivo
        </Link>

        <ul className="order-3 flex w-full flex-wrap items-center justify-center gap-1.5 p-0 sm:order-none sm:w-auto sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.Icon
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    cn(
                      pillBase,
                      isActive ? 'bg-sunny text-sunny-foreground' : 'text-foreground hover:bg-secondary',
                    )
                  }
                >
                  <Icon size={22} />
                  {item.label}
                </NavLink>
              </li>
            )
          })}
        </ul>

<div className="ml-auto flex items-center gap-1.5 sm:ml-0 sm:gap-2 sm:justify-self-end">
          {ready && profile ? (
            <ProfileMenu profile={profile} onLogout={handleLogout} />
          ) : ready ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link to="/login" className="rounded-2xl px-3 py-2 font-display text-base text-foreground no-underline transition-colors duration-100 hover:bg-secondary sm:px-4 sm:text-lg">
                Log in
              </Link>
              <Link
                to="/signup"
                className="chunky chunky-press rounded-3xl bg-primary px-3 py-1.5 font-display text-base text-primary-foreground no-underline sm:px-4 sm:py-2 sm:text-lg"
              >
                Sign up
              </Link>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  )
}
