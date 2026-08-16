import { Link } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { curriculum } from '../data/game.js'

export default function Learn() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav />
        <h1 className="font-display text-3xl sm:text-4xl">Curriculum 📚</h1>
      </div>

      <div className="mt-8">
        <Companion lines={['Pick a subject to see its lessons! 🌟']} />
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {curriculum.map((subject) => (
          <Link
            key={subject.id}
            to={`/subject/${subject.id}`}
            className={cn(
              'chunky chunky-press animate-fade-in rounded-4xl p-8 text-center no-underline transition-transform hover:-translate-y-1',
              subject.themeClass,
            )}
          >
            <span className="block text-6xl sm:text-7xl">{subject.emoji}</span>
            <h2 className="mt-4 font-display text-3xl">{subject.title}</h2>
            <p className="mx-auto mt-2 max-w-xs text-lg opacity-90">{subject.blurb}</p>
            <span className="mt-5 inline-block rounded-full bg-card/70 px-4 py-1.5 text-sm">
              {subject.topics.length} lessons 📖
            </span>
            <span className="mt-4 block font-display text-base font-extrabold opacity-80">
              Open lessons →
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}