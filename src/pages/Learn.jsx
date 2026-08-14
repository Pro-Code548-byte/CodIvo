import { useState } from 'react'
import { Link } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { curriculum } from '../data/game.js'

export default function Learn() {
  const [activeId, setActiveId] = useState(curriculum[0].id)
  const active = curriculum.find((c) => c.id === activeId) ?? curriculum[0]

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav />
        <h1 className="font-display text-3xl sm:text-4xl">Curriculum 📚</h1>
      </div>

      <div className="mt-6">
        <Companion lines={['Pick a subject to see everything you will learn. 🌟']} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {curriculum.map((subject) => (
          <button
            key={subject.id}
            type="button"
            onClick={() => setActiveId(subject.id)}
            className={cn(
              'chunky chunky-press animate-fade-in rounded-3xl p-5 text-left transition-transform',
              subject.themeClass,
              activeId === subject.id
                ? 'scale-[1.03] ring-4 ring-ring'
                : 'opacity-85 hover:-translate-y-1',
            )}
          >
            <span className="block text-5xl">{subject.emoji}</span>
            <span className="mt-2 block font-display text-2xl">{subject.title}</span>
            <span className="mt-1 block text-base opacity-90">{subject.blurb}</span>
            <span className="mt-3 inline-block rounded-full bg-card/70 px-3 py-1 text-sm">
              {subject.topics.length} topics 📖
            </span>
          </button>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-3xl">
          {active.emoji} {active.title} — what you'll learn
        </h2>
        <ol className="mt-4 flex list-none flex-col gap-3 p-0">
          {active.topics.map((topic, index) => (
            <li
              key={topic.id}
              className="pillow animate-fade-in flex items-start gap-4 rounded-4xl border-4 border-card bg-card p-5"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary font-display text-xl">
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-xl">
                  {topic.emoji} {topic.title}
                </span>
                <span className="mt-1 block text-lg text-muted-foreground">{topic.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <h3 className="mt-10 font-display text-3xl">🧪 Projects — try it yourself!</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {active.projects.map((project, index) => (
            <article
              key={project.id}
              className="pillow animate-fade-in rounded-4xl border-4 border-dashed border-card bg-card/60 p-5"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span className="block text-4xl">{project.emoji}</span>
              <span className="mt-2 block font-display text-xl">{project.title}</span>
              <span className="mt-1 block text-lg text-muted-foreground">{project.text}</span>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-lg">
          Ready to play? <Link to="/map" className="underline">Go to the map 🗺️</Link>
        </p>
      </section>
    </main>
  )
}