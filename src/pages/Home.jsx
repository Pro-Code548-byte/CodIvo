import { Link } from 'react-router-dom'
import { btnAccent, btnPrimary } from '../components/buttonClasses.js'
import { card, cardHover } from '../components/cardClasses.js'
import { headingGradient } from '../components/headingClasses.js'

const features = [
  {
    title: 'Learn',
    text: 'Step-by-step lessons with interactive examples.',
    color: 'bg-primary',
    shadow: 'shadow-[0_4px_0_0_var(--color-primary-hover)]',
  },
  {
    title: 'Duel',
    text: 'Face other coders head-to-head in timed battles.',
    color: 'bg-accent',
    shadow: 'shadow-[0_4px_0_0_var(--color-accent-hover)]',
  },
  {
    title: 'Race the Bot',
    text: 'Test your speed against our AI challenger.',
    color: 'bg-warning',
    shadow: 'shadow-[0_4px_0_0_#d9a600]',
  },
]

const decoration = [
  'left-[-14px] top-[-12px] bg-primary animate-bob',
  'right-[-10px] top-10 bg-accent animate-bob',
  'left-[-8px] bottom-[-14px] bg-warning animate-bob',
]

const marqueeItems = [
  'Learn',
  'Duel',
  'Race the Bot',
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'Level Up',
]

const sparkles = [
  { className: 'left-[8%] top-2 text-primary', delay: '0s' },
  { className: 'right-[12%] top-6 text-accent', delay: '-0.6s' },
  { className: 'left-[30%] bottom-2 text-warning', delay: '-1.2s' },
  { className: 'right-[28%] bottom-4 text-accent', delay: '-1.6s' },
]

export default function Home() {
  return (
    <section className="animate-fade-in relative">
      {sparkles.map((sparkle, i) => (
        <span
          key={i}
          aria-hidden
          className={`animate-twinkle pointer-events-none absolute ${sparkle.className}`}
          style={{ animationDelay: sparkle.delay }}
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
          </svg>
        </span>
      ))}

      <h1
        className={`animate-bounce-in mb-2 text-[clamp(2rem,7vw,2.8rem)] font-extrabold ${headingGradient}`}
      >
        Welcome to Cod Ivo
      </h1>
      <p className="animate-pop-in mb-8 text-base text-muted sm:text-lg" style={{ animationDelay: '150ms' }}>
        Learn to code, duel your friends, and race our bot in live coding challenges.
      </p>
      <div className="my-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link to="/learn" className={`${btnPrimary} animate-pop-in text-center`} style={{ animationDelay: '250ms' }}>
          Start Learning
        </Link>
        <Link to="/duel" className={`${btnAccent} animate-pop-in text-center`} style={{ animationDelay: '350ms' }}>
          Duel Now
        </Link>
      </div>

      <div className="my-10 overflow-hidden rounded-[14px] border-2 border-surface-2 bg-surface py-3 shadow-[0_4px_0_0_var(--color-surface-2)]">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10">
              {marqueeItems.map((item, i) => (
                <span key={item} className="flex items-center gap-10">
                  <span className="text-base font-extrabold uppercase tracking-widest text-muted">
                    {item}
                  </span>
                  <span
                    className={`size-2.5 rounded-[4px] ${['bg-primary', 'bg-accent', 'bg-warning'][i % 3]}`}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className={`animate-pop-in ${card} ${cardHover} relative overflow-hidden p-0`}
            style={{ animationDelay: `${(i + 1) * 250}ms` }}
          >
            <span
              className={`absolute ${decoration[i]} size-4 rounded-[4px] border-2 border-black/15`}
            />
            <span
              className={`mb-1 block h-3 border-b-2 border-black/15 ${feature.color} ${feature.shadow}`}
            />
            <div className="p-5">
              <h3 className="mb-1.5 text-lg font-extrabold text-accent transition-colors duration-300 hover:text-primary">
                {feature.title}
              </h3>
              <p className="m-0 text-muted">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
