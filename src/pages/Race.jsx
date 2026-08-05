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
      <h1 className={`mb-2 text-[clamp(1.9rem,6vw,2.2rem)] font-extrabold ${headingGradient}`}>
        Race the Bot
      </h1>
      <p className="mb-8 text-base text-muted sm:text-lg">
        You vs. our AI. Click "I solved it!" as fast as you can — the bot is always coding.
      </p>

      <div className="my-8 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-14 shrink-0 items-center justify-center rounded-[10px] border-2 border-accent-hover bg-accent text-sm font-extrabold text-white shadow-[0_3px_0_0_var(--color-accent-hover)]">
            You
          </span>
          <div className="h-7 flex-1 overflow-hidden rounded-full border-2 border-accent/40 bg-bg">
            <div
              className="h-full rounded-full border-r-2 border-accent-hover bg-accent bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.18)_0_10px,transparent_10px_20px)] transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-14 shrink-0 items-center justify-center rounded-[10px] border-2 border-danger/60 bg-danger text-sm font-extrabold text-white shadow-[0_3px_0_0_#c2245a]">
            Bot
          </span>
          <div className="h-7 flex-1 overflow-hidden rounded-full border-2 border-danger/40 bg-bg">
            <div
              className="h-full rounded-full border-r-2 border-danger/60 bg-danger bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.18)_0_10px,transparent_10px_20px)] transition-[width] duration-100 ease-linear"
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

      {status === 'you-win' && (
        <p className="inline-block rounded-[12px] border-2 border-[#3f9c3f] bg-success px-5 py-2.5 text-lg font-extrabold text-white shadow-[0_4px_0_0_#3f9c3f]">
          You beat the bot!
        </p>
      )}
      {status === 'bot-wins' && (
        <p className="inline-block rounded-[12px] border-2 border-danger/60 bg-danger px-5 py-2.5 text-lg font-extrabold text-white shadow-[0_4px_0_0_#c2245a]">
          The bot beat you this time.
        </p>
      )}
    </section>
  )
}
