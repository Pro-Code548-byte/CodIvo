import { Link } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { cn } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'
import { challenges, getChallengesInLand, isLandUnlocked, lands } from '../data/game.js'

export default function Map() {
  const { profile, ready } = useGame()
  const completed = ready ? profile?.completedChallengeIds ?? [] : []

  const finishedGames = challenges.filter((c) => completed.includes(c.id)).length

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
<header>
        <h1 className="animate-fade-in font-display text-4xl font-extrabold sm:text-5xl">
          My Learning Path 🗺️
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Three worlds to explore: HTML, CSS and Python. 🌱
        </p>
      </header>

      <div className="mt-6">
        <Companion
          lines={
            ready && profile
              ? [`Hi ${profile.name}! Pick a world to start coding.`, 'Finish every lesson in a world to open the next one!']
              : ['Pick a world to start coding!', 'Finish every lesson in a world to open the next one!']
          }
        />
      </div>

<div className="mt-10 grid gap-6 md:grid-cols-3">
        {lands.map((land, index) => {
          const list = getChallengesInLand(land.id)
          const done = list.filter((c) => completed.includes(c.id)).length
          const unlocked = isLandUnlocked(land, completed)
          const card = (
            <div
              className={cn(
                'pillow animate-fade-in relative flex h-full flex-col items-center gap-2 rounded-4xl border-4 border-card p-6 text-center transition-transform',
                land.themeClass,
                unlocked ? 'hover:-translate-y-2 hover:border-card' : 'opacity-70 grayscale',
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className={cn('text-7xl', unlocked && 'animate-float')}>{land.emoji}</span>
              <h2 className="font-display text-3xl">{land.name}</h2>
              <p className="text-lg">{land.blurb}</p>
              {unlocked ? (
                <p className="mt-auto flex items-center gap-2 rounded-full bg-card/70 px-4 py-2 font-display text-lg text-card-foreground">
                  <span aria-hidden>✅</span>
                  {done} / {list.length} done
                </p>
              ) : (
                <p className="mt-auto flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 font-display text-lg text-card-foreground">
                  <span className="text-3xl" aria-hidden>
                    🔒
                  </span>
                  Finish the land before!
                </p>
              )}
            </div>
          )
          return unlocked ? (
            <Link to={`/land/${land.id}`} className="block no-underline" key={land.id}>
              {card}
            </Link>
          ) : (
            <div key={land.id}>{card}</div>
          )
        })}
      </div>

<p className="mt-10 pb-4 text-center text-xl">
        You finished <span className="font-display text-3xl">{finishedGames}</span> games. Keep
        going! ⭐
      </p>
    </main>
  )
}
