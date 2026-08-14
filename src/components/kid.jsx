import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from './cn.js'

const toneClasses = {
  primary: 'bg-primary text-primary-foreground',
  jungle: 'bg-jungle text-jungle-foreground',
  ocean: 'bg-ocean text-ocean-foreground',
  grape: 'bg-grape text-grape-foreground',
  candy: 'bg-candy text-candy-foreground',
  sunny: 'bg-sunny text-sunny-foreground',
  muted: 'bg-card text-card-foreground',
  danger: 'bg-destructive text-destructive-foreground',
}

export function KidButton({ tone = 'primary', className, children, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        'chunky chunky-press inline-block cursor-pointer rounded-3xl px-6 py-3 font-display text-lg font-extrabold no-underline transition-transform duration-100 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none',
        toneClasses[tone] ?? toneClasses.primary,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function KidCard({ className, children, ...props }) {
  return (
    <div className={cn('pillow rounded-4xl border-4 border-card bg-card transition-transform duration-200 hover:-translate-y-1', className)} {...props}>
      {children}
    </div>
  )
}

export function KidKidCard({ className, children }) {
  return <KidCard className={cn('p-6', className)}>{children}</KidCard>
}

export function KidStat({ label, value }) {
  return (
    <div className="rounded-3xl bg-secondary/60 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-display text-2xl">{value}</p>
    </div>
  )
}

export function InitialBadge({ name = 'Friend', className }) {
  const letter = (String(name).trim().charAt(0) || 'F').toUpperCase()
  return (
    <span
      aria-hidden
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-extrabold text-primary-foreground sm:size-9',
        className,
      )}
    >
      {letter}
    </span>
  )
}

export function KidNav({ to = '/learn', label = 'Learn' }) {
  return (
    <Link
      to={to}
      className="chunky chunky-press inline-flex items-center gap-1.5 rounded-3xl bg-card px-3 py-1.5 font-display text-base text-card-foreground no-underline shadow-pillow sm:px-4 sm:py-2 sm:text-lg"
    >
      <span aria-hidden className="text-lg sm:text-xl">
        🏠
      </span>
      {label}
    </Link>
  )
}

const confettiEmojis = ['🎉', '✨', '⭐', '🎊', '🌈', '💫', '🦋']

export function Confetti({ active }) {
  const [pieces] = useState(() => Array.from({ length: 34 }, (_, i) => i))
  if (!active) return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((i) => (
        <span
          key={i}
          className="absolute animate-confetti text-3xl"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 8) * 0.18}s`,
            animationDuration: `${2 + (i % 5) * 0.3}s`,
          }}
        >
          {confettiEmojis[i % confettiEmojis.length]}
        </span>
      ))}
    </div>
  )
}

function Icon({ children, size = 24, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function HomeIcon(props) {
  return (
    <Icon {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </Icon>
  )
}

export function BookOpenIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </Icon>
  )
}

export function SwordsIcon(props) {
  return (
    <Icon {...props}>
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" y1="19" x2="19" y2="13" />
      <line x1="16" y1="16" x2="20" y2="20" />
      <line x1="19" y1="21" x2="21" y2="19" />
      <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
      <line x1="5" y1="14" x2="9" y2="18" />
      <line x1="7" y1="17" x2="4" y2="20" />
      <line x1="3" y1="19" x2="5" y2="21" />
    </Icon>
  )
}

export function BotIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </Icon>
  )
}

export function RocketIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
    </Icon>
  )
}

export function LoginIcon(props) {
  return (
    <Icon {...props}>
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    </Icon>
  )
}

export function CodeXmlIcon(props) {
  return (
    <Icon {...props}>
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </Icon>
  )
}

export function CheckIcon(props) {
  return (
    <Icon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  )
}

export function TrophyIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </Icon>
  )
}

export function LogOutIcon(props) {
  return (
    <Icon {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </Icon>
  )
}