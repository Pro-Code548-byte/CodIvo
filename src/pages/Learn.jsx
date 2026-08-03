import { btnOutline, btnSm } from '../components/buttonClasses.js'
import { headingGradient } from '../components/headingClasses.js'

const lessons = [
  { title: 'Variables & Data Types', level: 'Beginner' },
  { title: 'Conditionals & Loops', level: 'Beginner' },
  { title: 'Functions & Scope', level: 'Intermediate' },
  { title: 'Arrays & Objects', level: 'Intermediate' },
  { title: 'Algorithms & Big O', level: 'Advanced' },
]

export default function Learn() {
  return (
    <section className="animate-fade-in">
      <h1 className={`mb-2 text-[clamp(1.9rem,6vw,2.2rem)] font-bold ${headingGradient}`}>
        Learning Path
      </h1>
      <p className="mb-8 text-base text-muted sm:text-lg">
        Work through the lessons in order, or jump to any topic.
      </p>
      <div className="flex flex-col gap-3">
        {lessons.map((lesson, i) => (
          <div
            className="flex flex-wrap items-center gap-4 rounded-[10px] border border-surface-2 bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            key={lesson.title}
          >
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h3 className="mb-1 text-[1.05rem] font-bold transition-colors duration-300 hover:text-accent">
                {lesson.title}
              </h3>
              <span className="inline-block rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-bold text-muted">
                {lesson.level}
              </span>
            </div>
            <button className={`${btnOutline} ${btnSm} ml-auto`}>Start Lesson</button>
          </div>
        ))}
      </div>
    </section>
  )
}
