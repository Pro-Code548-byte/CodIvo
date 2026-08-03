import { Link } from 'react-router-dom'
import { btnOutline, btnPrimary } from '../components/buttonClasses.js'
import { headingGradient } from '../components/headingClasses.js'

export default function Home() {
  return (
    <section className="animate-fade-in">
      <h1
        className={`mb-2 text-[clamp(2rem,7vw,2.8rem)] font-bold ${headingGradient}`}
      >
        Welcome to Cod Ivo
      </h1>
      <p className="mb-8 text-base text-muted sm:text-lg">
        Learn to code, duel your friends, and race our bot in live coding challenges.
      </p>
      <div className="my-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link to="/learn" className={`${btnPrimary} text-center`}>
          Start Learning
        </Link>
        <Link to="/duel" className={`${btnOutline} text-center`}>
          Duel Now
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        <div
          className="animate-fade-in rounded-[10px] border border-surface-2 bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          style={{ animationDelay: '100ms' }}
        >
          <h3 className="mb-1.5 font-bold text-accent transition-colors duration-300 hover:text-primary">
            Learn
          </h3>
          <p className="m-0 text-muted">Step-by-step lessons with interactive examples.</p>
        </div>
        <div
          className="animate-fade-in rounded-[10px] border border-surface-2 bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          style={{ animationDelay: '200ms' }}
        >
          <h3 className="mb-1.5 font-bold text-accent transition-colors duration-300 hover:text-primary">
            Duel
          </h3>
          <p className="m-0 text-muted">Face other coders head-to-head in timed battles.</p>
        </div>
        <div
          className="animate-fade-in rounded-[10px] border border-surface-2 bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          style={{ animationDelay: '300ms' }}
        >
          <h3 className="mb-1.5 font-bold text-accent transition-colors duration-300 hover:text-primary">
            Race the Bot
          </h3>
          <p className="m-0 text-muted">Test your speed against our AI challenger.</p>
        </div>
      </div>
    </section>
  )
}
