import { useState } from 'react'
import { btnGhost, btnOutline, btnPrimary } from '../components/buttonClasses.js'
import { headingGradient } from '../components/headingClasses.js'

export default function Race() {
  const [progress, setProgress] = useState(0)
  const [botProgress, setBotProgress] = useState(0)
  const [status, setStatus] = useState('ready')
  const [intervalId, setIntervalId] = useState(null)

  const startRace = () => {
    if (intervalId) return
    setProgress(0)
    setBotProgress(0)
    setStatus('running')
    const id = setInterval(() => {
      setBotProgress((prev) => {
        const next = Math.min(prev + Math.random() * 4, 100)
        if (next >= 100) {
          clearInterval(id)
          setStatus('bot-wins')
        }
        return next
      })
    }, 100)
    setIntervalId(id)
  }

  const solve = () => {
    setProgress((prev) => {
      const next = Math.min(prev + Math.random() * 20, 100)
      if (next >= 100) {
        clearInterval(intervalId)
        setStatus('you-win')
      }
      return next
    })
  }

  const reset = () => {
    clearInterval(intervalId)
    setIntervalId(null)
    setProgress(0)
    setBotProgress(0)
    setStatus('ready')
  }

  return (
    <section className="animate-fade-in">
      <h1 className={`mb-2 text-[clamp(1.9rem,6vw,2.2rem)] font-bold ${headingGradient}`}>
        Race the Bot
      </h1>
      <p className="mb-8 text-base text-muted sm:text-lg">
        You vs. our AI. Click "I solved it!" as fast as you can — the bot is always coding.
      </p>

      <div className="my-8 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="w-14 shrink-0 text-sm font-bold text-muted sm:text-base">You</span>
          <div className="h-6 flex-1 overflow-hidden rounded-full border border-surface-2 bg-surface">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-14 shrink-0 text-sm font-bold text-muted sm:text-base">Bot</span>
          <div className="h-6 flex-1 overflow-hidden rounded-full border border-surface-2 bg-surface">
            <div
              className="h-full rounded-full bg-danger transition-[width] duration-100 ease-linear"
              style={{ width: `${botProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="my-6 flex flex-wrap gap-3">
        <button className={btnPrimary} onClick={startRace} disabled={status === 'running'}>
          Start Race
        </button>
        <button className={btnOutline} onClick={solve} disabled={status !== 'running'}>
          I Solved It!
        </button>
        <button className={btnGhost} onClick={reset}>
          Reset
        </button>
      </div>

      {status === 'you-win' && <p className="text-lg font-bold text-success">You beat the bot!</p>}
      {status === 'bot-wins' && (
        <p className="text-lg font-bold text-danger">The bot beat you this time.</p>
      )}
    </section>
  )
}
