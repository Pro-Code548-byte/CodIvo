import { Link, Navigate, useParams } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { curriculum } from '../data/game.js'

export default function Subject() {
  const { subjectId } = useParams()
  const subject = curriculum.find((s) => s.id === subjectId)
  if (!subject) return <Navigate to="/learn" replace />

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav to="/learn" label="Back" />
        <h1 className={cn('rounded-3xl px-4 py-1.5 font-display text-2xl sm:text-3xl', subject.themeClass)}>
          {subject.emoji} {subject.title}
        </h1>
      </div>

      <p className="mt-4 text-center text-xl text-muted-foreground">{subject.blurb}</p>

      <div className="mt-5 flex justify-center">
        <Companion lines={[`Here is everything you'll learn in ${subject.title}! 🌟`]} tone="sunny" />
      </div>

      <ol className="mt-8 flex list-none flex-col gap-3 p-0">
        {subject.topics.map((topic, index) => (
          <li key={topic.id}>
            <Link
              to={`/topic/${subject.id}/${topic.id}`}
              className={cn(
                'pillow animate-fade-in flex items-start gap-4 rounded-4xl border-4 border-card bg-card p-5 no-underline transition-transform hover:-translate-y-0.5 hover:border-primary',
              )}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary font-display text-xl">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-xl">
                    {topic.emoji} {topic.title}
                  </span>
                  {topic.lessonId && (
                    <span className="rounded-full bg-jungle px-2.5 py-0.5 text-xs font-extrabold text-jungle-foreground">
                      ▶ Play now
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-lg text-muted-foreground">{topic.text}</span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center self-center rounded-full bg-secondary font-display text-xl">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  )
}