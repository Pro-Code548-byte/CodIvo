import { headingGradient } from '../components/headingClasses.js'

const suggestions = [
  'How do I start learning?',
  'Explain Duel mode',
  'What is Race the Bot?',
  'How do I save my progress?',
]

export default function Help() {
  return (
    <section className="animate-fade-in">
      <h1 className={`mb-2 text-[clamp(1.9rem,6vw,2.2rem)] font-extrabold ${headingGradient}`}>
        AI Assistant
      </h1>
      <p className="mb-8 text-base text-muted sm:text-lg">
        Your coding companion. Ask anything about Cod Ivo, lessons, or code.
      </p>

      <div className="flex min-h-[420px] flex-col overflow-hidden rounded-[14px] border-2 border-surface-2 bg-surface shadow-[0_5px_0_0_var(--color-surface-2)]">
        <div className="flex flex-col gap-4 border-b-2 border-surface-2 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border-2 border-primary-hover bg-primary text-white shadow-[0_3px_0_0_var(--color-primary-hover)]">
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M18.4 5.6l-2.1 2.1m-8.6 8.6-2.1 2.1" />
              </svg>
            </div>
            <div>
              <p className="m-0 text-sm font-bold text-accent">Cod Ivo Assistant</p>
              <p className="m-0 mt-1.5 rounded-[10px] rounded-tl-sm border-2 border-surface-2 bg-bg px-4 py-3 font-medium text-ink">
                Hi! I&apos;m your AI assistant. I can help you navigate Cod Ivo, explain
                concepts, and give coding tips. What would you like to know?
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <p className="m-0 text-sm font-extrabold text-muted">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="cursor-default rounded-full border-2 border-surface-2 bg-bg px-4 py-2 text-sm font-bold text-muted shadow-[0_3px_0_0_var(--color-surface-2)] transition-all duration-150 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t-2 border-surface-2 p-4">
          <div className="flex items-center gap-2 rounded-[10px] border-2 border-surface-2 bg-bg px-4 py-2 shadow-[0_3px_0_0_var(--color-surface-2)] transition-all duration-150 focus-within:border-primary focus-within:shadow-[0_4px_0_0_var(--color-primary)]">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full bg-transparent py-1.5 font-medium text-ink placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              aria-label="Send message"
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[8px] border-2 border-primary-hover bg-primary text-white shadow-[0_3px_0_0_var(--color-primary-hover)] transition-all duration-100 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-none"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
