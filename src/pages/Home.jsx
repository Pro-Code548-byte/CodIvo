import { Link } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { KidCard, BookOpenIcon, SwordsIcon, BotIcon, RocketIcon, LoginIcon, CodeXmlIcon } from '../components/kid.jsx'
import { cn, headingGradient } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'
import { challenges, lands, stickers } from '../data/game.js'

const features = [
  { title: 'Learn', text: 'Step-by-step lessons in HTML, CSS and Python.', to: '/map', Icon: BookOpenIcon, emoji: '📚' },
  { title: 'Duel', text: 'Two friends code side by side in a friendly match.', to: '/race', Icon: SwordsIcon, emoji: '⚔️' },
  { title: 'Race Bot', text: 'Race Codi Bot in a speed run of your code steps.', to: '/race-bot', Icon: BotIcon, emoji: '🤖' },
]

export default function Home() {
  const { profile, ready } = useGame()
  const loggedIn = ready && profile

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
<section className="animate-fade-in text-center">
        <h1 className="font-display text-5xl font-extrabold leading-tight sm:text-6xl">
          Learn coding <span className={headingGradient}>the fun way</span> 🎮
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
          Codivo turns coding into a game for kids ages 6–12. Build with HTML, style with CSS,
          think with Python — and collect trophies along the way.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {loggedIn ? (
            <Link
              to="/map"
              className="chunky chunky-press inline-flex items-center gap-2 rounded-3xl bg-jungle px-6 py-4 font-display text-xl font-extrabold text-jungle-foreground no-underline sm:text-2xl"
            >
              <CodeXmlIcon className="size-6" aria-hidden />
              Keep learning
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="chunky chunky-press inline-flex items-center gap-2 rounded-3xl bg-primary px-6 py-4 font-display text-xl font-extrabold text-primary-foreground no-underline sm:text-2xl"
              >
                <RocketIcon className="size-6" aria-hidden />
                Start free
              </Link>
              <Link
                to="/login"
                className="chunky chunky-press inline-flex items-center gap-2 rounded-3xl bg-card px-6 py-4 font-display text-xl font-extrabold text-card-foreground no-underline sm:text-2xl"
              >
                <LoginIcon className="size-6" aria-hidden />
                Log in
              </Link>
            </>
          )}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="pillow rounded-full bg-card px-5 py-2 font-display text-lg">
            🌍 {lands.length} worlds
          </span>
          <span className="pillow rounded-full bg-card px-5 py-2 font-display text-lg">
            🎮 {challenges.length} games
          </span>
          <span className="pillow rounded-full bg-card px-5 py-2 font-display text-lg">
            ⭐ {stickers.length} stickers
          </span>
        </div>
      </section>

      {loggedIn && (
        <div className="flex justify-center">
          <Companion lines={[`Welcome back, ${profile.name}! Ready for the next puzzle?`]} tone="sunny" />
        </div>
      )}

<section className="grid gap-4 pt-2 sm:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.Icon
          return (
            <Link to={feature.to} key={feature.title} className="no-underline">
              <KidCard
                className="h-full animate-fade-in p-6 hover:border-primary"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <span className="flex items-start justify-between">
                  <Icon className="size-10 text-primary" aria-hidden />
                  <span aria-hidden className="animate-bounce-soft text-3xl">
                    {feature.emoji}
                  </span>
                </span>
                <h2 className="mt-3 font-display text-2xl">{feature.title}</h2>
                <p className="mt-1 text-lg text-muted-foreground">{feature.text}</p>
              </KidCard>
            </Link>
          )
        })}
      </section>

      <section>
        <h2 className="font-display text-3xl font-extrabold">
          Coding worlds to explore 🌍
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {lands.map((land, index) => (
            <div
              key={land.id}
              className={cn('pillow animate-fade-in rounded-4xl p-6', land.themeClass)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <p className="animate-float text-5xl">{land.emoji}</p>
              <p className="mt-3 font-display text-2xl">{land.name}</p>
              <p className="mt-1 text-lg opacity-90">{land.blurb}</p>
            </div>
          ))}
        </div>
</section>
    </main>
  )
}
