import { Link, Navigate, useParams } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'
import { conceptLabels, getChallengesInLand, getLand, getSticker, isChallengeUnlocked } from '../data/game.js'

export default function Land() {
  const { landId } = useParams()
  const land = getLand(landId)
  const { profile, ready } = useGame()
  const completed = ready ? profile?.completedChallengeIds ?? [] : []

  if (!land) return <Navigate to="/learn" replace />

  const list = getChallengesInLand(land.id)
  const landDone = list.every((c) => completed.includes(c.id))

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
<div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav />
        <h1 className={cn('rounded-3xl px-5 py-2 font-display text-2xl sm:text-4xl', land.themeClass)}>
          {land.emoji} {land.name} ✨
        </h1>
      </div>

      <div className="mt-8">
        <Companion lines={['Pick a game! Each one is short and fun. 🎯']} />
      </div>

      <ol className="mt-8 flex flex-col gap-4 p-0">
        {list.map((challenge, index) => {
          const done = completed.includes(challenge.id)
          const unlocked = isChallengeUnlocked(challenge, completed)
          const sticker = getSticker(challenge.stickerId)
          const row = (
            <div
              className={cn(
                'pillow animate-fade-in flex items-center gap-4 rounded-4xl border-4 border-card bg-card p-5 transition-transform duration-200',
                unlocked ? 'hover:-translate-y-1 hover:border-primary' : 'opacity-70 grayscale',
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span
                className={cn(
                  'grid size-16 shrink-0 place-items-center rounded-full bg-secondary font-display text-3xl',
                  done && 'animate-pop',
                )}
              >
                {done ? '✅' : unlocked ? index + 1 : '🔒'}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-2xl">
                  {done ? '⭐ ' : ''}
                  {challenge.title}
                </span>
                <span className="block text-lg text-muted-foreground">{challenge.kidPrompt}</span>
                <span className="mt-2 inline-block rounded-full bg-secondary px-3 py-1 text-sm">
                  {conceptLabels[challenge.concept]} · {challenge.minutes} min
                </span>
              </span>
              <span aria-hidden className="shrink-0 text-4xl">
                {done ? sticker.emoji : '🔍'}
              </span>
            </div>
          )
          return (
            <li key={challenge.id} className="list-none">
              {unlocked ? (
                <Link to={`/challenge/${challenge.id}`} className="block no-underline">
                  {row}
                </Link>
              ) : (
                row
              )}
            </li>
          )
        })}
      </ol>

{landDone && (
        <div className="mt-10 text-center">
          <p className="animate-pop text-2xl">🎉 You finished {land.name}! 🎉</p>
          <Link to="/trophies" className="mt-3 inline-block text-lg underline">
            See your {land.certificateName} certificate 📜
          </Link>
        </div>
      )}
    </main>
  )
}
