import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { Confetti, KidButton, KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'

const MAX = 6

function ProgressRow({ label, value, flag }) {
  return (
    <div className="mt-3">
      <p className="font-display text-xl">{label}</p>
      <div className="mt-1 flex gap-2">
        {Array.from({ length: MAX }, (_, i) => (
          <div key={i} className={cn('h-8 flex-1 rounded-full', i < value ? 'bg-jungle' : 'bg-secondary/70')} />
        ))}
        <span className="text-2xl">{flag}</span>
      </div>
    </div>
  )
}

export default function Race() {
  const { profile } = useGame()
  const [mode, setMode] = useState('race')
  const [running, setRunning] = useState(false)
  const [you, setYou] = useState(0)
  const [friend, setFriend] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!running || done) return undefined
    const id = window.setInterval(() => setFriend((f) => Math.min(MAX, f + 1)), 1400)
    return () => window.clearInterval(id)
  }, [running, done])

useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- legacy pattern: finish race when a racer reaches the end
    if (running && (you >= MAX || friend >= MAX)) setDone(true)
  }, [you, friend, running])

  const teamPower = Math.min(MAX, Math.round((you + friend) / 2))

  const start = () => {
    setRunning(true)
    setDone(false)
  }

  const playAgain = () => {
    setYou(0)
    setFriend(0)
    setDone(false)
    setRunning(false)
  }

return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <Confetti active={done} />
<div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav />
        <h1 className="font-display text-3xl sm:text-4xl">Play with a Friend 🏁</h1>
      </div>

      <div className="mt-6">
        <Companion
          lines={done ? ['Great effort! You both earned stars! â­â­'] : ['Tap the big button fast to move! Everyone gets stars.']}
          tone={done ? 'sunny' : 'card'}
        />
      </div>

      <div className="mt-6 flex gap-3">
        {['race', 'team'].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m)
              playAgain()
            }}
            className={cn(
              'chunky chunky-press flex-1 rounded-3xl bg-card px-5 py-4 font-display text-xl',
              mode === m && 'bg-candy text-candy-foreground ring-4 ring-ring',
            )}
          >
            {m === 'race' ? 'ðŸ Friendly Race' : 'ðŸ¤ Team Mode'}
          </button>
        ))}
      </div>

      <div>
        <ProgressRow label={`${profile?.avatar ?? 'ðŸ¦Š'} ${profile?.name ?? 'You'}`} value={you} flag="ðŸŒˆ" />
        <ProgressRow label="ðŸ¨ Friend" value={friend} flag="ðŸŒˆ" />
        {mode === 'team' && (
          <div className="mt-4 rounded-3xl bg-jungle/30 p-4 text-center text-xl">
            Team power: {teamPower} / {MAX} ðŸ’ª
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {running ? (
          done ? (
            <>
              <KidButton tone="candy" onClick={playAgain}>
                ðŸ”„ Play again
              </KidButton>
              <Link to="/map">
                <KidButton tone="muted">ðŸ—ºï¸ Back to map</KidButton>
              </Link>
            </>
          ) : (
            <KidButton
              tone="primary"
              onClick={() => setYou((v) => Math.min(MAX, v + 1))}
              className="px-12 py-8 text-4xl"
            >
              ðŸ‘Ÿ Go!
            </KidButton>
          )
        ) : (
          <KidButton tone="jungle" onClick={start}>
            â–¶ï¸ Start
          </KidButton>
        )}
      </div>
    </main>
  )
}
