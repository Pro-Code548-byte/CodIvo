import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'
import { useProgress } from '../context/progressContext.js'
import { headingGradient } from '../components/headingClasses.js'
import { card, chip } from '../components/cardClasses.js'
import { languages } from '../data/learningPaths.js'

const moduleColors = ['bg-primary', 'bg-accent', 'bg-success', 'bg-warning', 'bg-danger']

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
      <h1 className={`mb-2 text-[clamp(1.9rem,6vw,2.2rem)] font-extrabold ${headingGradient}`}>
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
              className={`${chip} ${
                isActive
                  ? 'border-primary-hover bg-primary text-white shadow-[0_3px_0_0_var(--color-primary-hover)] active:translate-y-0.5 active:shadow-none'
                  : 'border-surface-2 bg-surface text-ink shadow-[0_3px_0_0_var(--color-surface-2)] hover:-translate-y-0.5 hover:border-primary hover:text-primary'
              }`}
            >
              {language.name}
            </Link>
          )
        })}
      </div>

      <div className={`${card} mb-8 overflow-hidden p-0`}>
        <span className="mb-1 block h-3 border-b-2 border-black/15 bg-primary shadow-[0_4px_0_0_var(--color-primary-hover)]" />
        <div className="p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[1.6rem] font-extrabold text-ink">{active.name}</h2>
            <span className="text-sm font-bold text-muted">{active.fullName}</span>
          </div>
          <p className="mt-1 text-sm font-extrabold text-primary">{active.tagline}</p>
          <p className="mt-2 text-base text-muted">{active.description}</p>
        </div>
      </div>

      <div className={`${card} mb-8 p-0`}>
        <span className="mb-1 block h-3 border-b-2 border-black/15 bg-success shadow-[0_4px_0_0_#3f9c3f]" />
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[1.05rem] font-extrabold text-ink">Your Progress</h2>
            <span className="rounded-full border-2 border-surface-2 bg-bg px-3 py-0.5 text-sm font-extrabold text-muted">
              {doneList.length} of {totalTopics} topics
            </span>
          </div>
          <div className="mt-3 h-5 overflow-hidden rounded-full border-2 border-success/40 bg-bg">
            <div
              className="h-full rounded-full border-r-2 border-success/40 bg-success transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          {!user && (
            <p className="mt-3 text-sm font-bold text-muted">
              <Link to="/login" className="no-underline text-accent hover:underline">
                Log in
              </Link>{' '}
              to save your progress.
            </p>
          )}
        </div>
      </div>

      <h2 className="mb-4 text-[1.25rem] font-extrabold text-ink">Outline</h2>
      <div className="mb-8 flex flex-col gap-4">
        {active.outline.map((module, i) => (
          <div key={module.title} className={`${card} overflow-hidden p-0`}>
            <span
              className={`mb-1 block h-3 border-b-2 border-black/15 ${moduleColors[i % moduleColors.length]} shadow-[0_4px_0_0_rgba(0,0,0,0.15)]`}
            />
            <div className="p-5">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] border-2 border-black/15 bg-primary font-extrabold text-white shadow-[0_3px_0_0_var(--color-primary-hover)]">
                  {i + 1}
                </span>
                <h3 className="text-[1.05rem] font-extrabold text-ink">{module.title}</h3>
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
                        className={`flex w-full items-start gap-2 rounded-[10px] border-2 px-3 py-2 text-left text-sm transition-all duration-150 disabled:cursor-not-allowed ${
                          done
                            ? 'border-success/50 bg-success/10 text-success'
                            : 'border-surface-2 bg-bg text-muted shadow-[0_2px_0_0_var(--color-surface-2)] enabled:hover:-translate-y-0.5 enabled:hover:border-primary enabled:hover:shadow-[0_3px_0_0_var(--color-primary)]'
                        }`}
                      >
                        <span
                          className={`inline-flex size-5 shrink-0 items-center justify-center rounded-[6px] border-2 text-[0.7rem] font-extrabold text-white ${
                            done
                              ? 'border-success/50 bg-success'
                              : 'border-surface-2 bg-surface'
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
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-[1.25rem] font-extrabold text-ink">Things You Should Know</h2>
      <ul className="flex list-none flex-col gap-2 p-0">
        {active.essentials.map((item) => (
          <li
            key={item}
            className={`${card} flex items-start gap-2.5 px-4 py-3 text-sm text-ink`}
          >
            <span className="mt-[1px] font-extrabold text-success">&#10003;</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
