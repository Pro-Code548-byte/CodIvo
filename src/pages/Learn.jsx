import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'
import { useProgress } from '../context/progressContext.js'
import { headingGradient } from '../components/headingClasses.js'
import { languages } from '../data/learningPaths.js'

export default function Learn() {
  const { lang } = useParams()
  const active = languages.find((l) => l.id === lang)
  const { user } = useAuth()
  const { completed, toggle } = useProgress()

  if (!active) return <Navigate to="/learn/html" replace />

  const doneList = completed[active.id] ?? []
  const totalTopics = active.outline.reduce((n, m) => n + m.topics.length, 0)
  const pct = totalTopics ? Math.round((doneList.length / totalTopics) * 100) : 0

  return (
    <section className="animate-fade-in">
      <h1 className={`mb-2 text-[clamp(1.9rem,6vw,2.2rem)] font-bold ${headingGradient}`}>
        Learning Path
      </h1>
      <p className="mb-8 text-base text-muted sm:text-lg">
        Pick a language to see its roadmap and the fundamentals you should master.
      </p>

      <div className="mb-8 flex flex-wrap gap-2.5">
        {languages.map((language) => {
          const isActive = language.id === active.id
          return (
            <Link
              key={language.id}
              to={`/learn/${language.id}`}
              className={`rounded-full px-4 py-2 text-sm font-bold no-underline transition-colors duration-150 ${
                isActive
                  ? 'bg-primary text-white'
                  : 'border border-surface-2 bg-surface text-ink hover:border-primary'
              }`}
            >
              {language.name}
            </Link>
          )
        })}
      </div>

      <div className="mb-8 rounded-[10px] border border-surface-2 bg-surface p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[1.6rem] font-extrabold text-ink">{active.name}</h2>
          <span className="text-sm font-semibold text-muted">{active.fullName}</span>
        </div>
        <p className="mt-1 text-sm font-semibold text-primary">{active.tagline}</p>
        <p className="mt-2 text-base text-muted">{active.description}</p>
      </div>

      <div className="mb-8 rounded-[10px] border border-surface-2 bg-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[1.05rem] font-bold text-ink">Your Progress</h2>
          <span className="text-sm font-semibold text-muted">
            {doneList.length} of {totalTopics} topics
          </span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full border border-surface-2 bg-bg">
          <div
            className="h-full rounded-full bg-success transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        {!user && (
          <p className="mt-3 text-sm font-semibold text-muted">
            <Link to="/login" className="no-underline text-accent hover:underline">
              Log in
            </Link>{' '}
            to save your progress.
          </p>
        )}
      </div>

      <h2 className="mb-4 text-[1.25rem] font-bold text-ink">Outline</h2>
      <div className="mb-8 flex flex-col gap-3">
        {active.outline.map((module, i) => (
          <div
            key={module.title}
            className="rounded-[10px] border border-surface-2 bg-surface p-5"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-[1.05rem] font-bold text-ink">{module.title}</h3>
            </div>
            <ul className="mt-3 grid list-none gap-x-6 gap-y-1.5 p-0 sm:grid-cols-2">
              {module.topics.map((topic) => {
                const done = doneList.includes(topic)
                return (
                  <li key={topic}>
                    <button
                      type="button"
                      onClick={() => toggle(active.id, topic)}
                      disabled={!user}
                      className={`flex w-full items-start gap-2 rounded-[10px] border px-3 py-2 text-left text-sm transition-colors duration-150 disabled:cursor-not-allowed ${
                        done
                          ? 'border-success/40 bg-success/10 text-success'
                          : 'border-surface-2 bg-bg text-muted enabled:hover:border-primary'
                      }`}
                    >
                      <span
                        className={`inline-flex size-4 shrink-0 items-center justify-center rounded-full border text-[0.7rem] font-bold text-white ${
                          done ? 'border-success bg-success' : 'border-surface-2 bg-surface'
                        }`}
                      >
                        {done && '&#10003;'}
                      </span>
                      <span className={done ? 'line-through' : ''}>{topic}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-[1.25rem] font-bold text-ink">Things You Should Know</h2>
      <ul className="flex list-none flex-col gap-2 p-0">
        {active.essentials.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 rounded-[10px] border border-surface-2 bg-surface px-4 py-3 text-sm text-ink"
          >
            <span className="mt-[1px] font-bold text-success">&#10003;</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
