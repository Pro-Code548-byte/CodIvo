import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { Confetti, KidButton, KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'

const MAX = 8
const difficultyMs = { easy: 1500, medium: 1000, fast: 700 }

function ProgressRow({ label, value, tone = 'bg-jungle' }) {
  return (
    <div className="mt-3">
      <p className="font-display text-xl">{label}</p>
      <div className="mt-1 flex items-center gap-2">
        {Array.from({ length: MAX }, (_, i) => (
          <div key={i} className={cn('h-8 flex-1 rounded-full', i < value ? tone : 'bg-secondary/70')} />
        ))}
        <span className="text-2xl">ðŸ</span>
      </div>
    </div>
  )
}

export default function RaceBot() {
  const { profile } = useGame()
  const [difficulty, setDifficulty] = useState('easy')
  const [running, setRunning] = useState(false)
  const [you, setYou] = useState(0)
  const [bot, setBot] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!running || done) return undefined
    const id = window.setInterval(() => setBot((b) => Math.min(MAX, b + 1)), difficultyMs[difficulty])
    return () => window.clearInterval(id)
  }, [running, done, difficulty])

useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- legacy pattern: finish race when a racer reaches the end
    if (running && (you >= MAX || bot >= MAX)) setDone(true)
  }, [you, bot, running])

  const reset = () => {
    setYou(0)
    setBot(0)
    setDone(false)
    setRunning(false)
  }

  const youWin = done && you >= MAX

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
<Confetti active={done} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav />
        <h1 className="font-display text-4xl">Race the Bot 🤖</h1>
      </div>

      <div className="mt-6">
        <Companion
          lines={
            done
              ? [youWin ? 'You beat the bot! Amazing! â­' : 'So close! The bot is fast â€” try again!']
              : ['Tap the big button to run your code steps. Ready?']
          }
          tone={done ? 'sunny' : 'card'}
        />
      </div>

      <div className="mt-6 flex gap-3">
        {Object.keys(difficultyMs).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => {
              setDifficulty(d)
              reset()
            }}
className={cn(
              'chunky chunky-press flex-1 rounded-3xl bg-card px-4 py-3 font-display text-lg',
              difficulty === d && 'bg-ocean text-ocean-foreground ring-4 ring-ring',
            )}
          >
            {d === 'easy' ? '🐢 Easy' : d === 'medium' ? '🚗 Medium' : '⚡ Fast'}
          </button>
        ))}
      </div>

      <div>
        <ProgressRow label={`${profile?.avatar ?? 'ðŸ¦Š'} ${profile?.name ?? 'You'}`} value={you} tone="bg-jungle" />
        <ProgressRow label="ðŸ¤– Codi Bot" value={bot} tone="bg-grape" />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {running ? (
          done ? (
            <>
              <KidButton tone="candy" onClick={reset}>
                ðŸ”„ Race again
              </KidButton>
              <Link to="/map">
                <KidButton tone="muted">ðŸ—ºï¸ Back to learning</KidButton>
              </Link>
            </>
          ) : (
            <KidButton
              tone="primary"
              onClick={() => setYou((v) => Math.min(MAX, v + 1))}
              className="px-12 py-8 text-4xl"
            >
              ðŸ‘Ÿ Run step!
            </KidButton>
          )
        ) : (
          <KidButton tone="jungle" onClick={() => setRunning(true)}>
            â–¶ï¸ Start race
          </KidButton>
        )}
      </div>
    </main>
  )
}
