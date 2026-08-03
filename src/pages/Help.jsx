import { headingGradient } from '../components/headingClasses.js'

export default function Help() {
  return (
    <section className="animate-fade-in">
      <h1 className={`mb-2 text-[clamp(1.9rem,6vw,2.2rem)] font-bold ${headingGradient}`}>
        Help Center
      </h1>
      <p className="mb-8 text-base text-muted sm:text-lg">Answers to common questions about Cod Ivo.</p>
      <div className="flex flex-col gap-3">
        <details className="rounded-[10px] border border-surface-2 bg-surface px-5 py-4 transition-colors duration-200 hover:border-primary" open>
          <summary className="cursor-pointer text-[1.05rem] font-bold transition-colors duration-200 hover:text-accent">
            How do I start learning?
          </summary>
          <p className="m-0 mt-3 text-muted">
            Head to the Learn page and pick a lesson. Lessons are ordered from beginner to
            advanced.
          </p>
        </details>
        <details className="rounded-[10px] border border-surface-2 bg-surface px-5 py-4 transition-colors duration-200 hover:border-primary">
          <summary className="cursor-pointer text-[1.05rem] font-bold transition-colors duration-200 hover:text-accent">
            How does Duel mode work?
          </summary>
          <p className="m-0 mt-3 text-muted">
            Select a challenge, then you and your opponent solve the same problem. The first
            correct solution wins the duel.
          </p>
        </details>
        <details className="rounded-[10px] border border-surface-2 bg-surface px-5 py-4 transition-colors duration-200 hover:border-primary">
          <summary className="cursor-pointer text-[1.05rem] font-bold transition-colors duration-200 hover:text-accent">
            What is "Race the Bot"?
          </summary>
          <p className="m-0 mt-3 text-muted">
            It's a speed challenge against our AI. Solve problems faster than the bot to win.
          </p>
        </details>
        <details className="rounded-[10px] border border-surface-2 bg-surface px-5 py-4 transition-colors duration-200 hover:border-primary">
          <summary className="cursor-pointer text-[1.05rem] font-bold transition-colors duration-200 hover:text-accent">
            Do I need an account?
          </summary>
          <p className="m-0 mt-3 text-muted">
            You can browse and learn without one. Create an account to save progress and compete
            in duels.
          </p>
        </details>
      </div>
    </section>
  )
}
