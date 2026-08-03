import { useState } from 'react'
import { btnPrimary } from '../components/buttonClasses.js'
import { headingGradient } from '../components/headingClasses.js'

const challenges = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy' },
  { id: 2, title: 'Palindrome Check', difficulty: 'Easy' },
  { id: 3, title: 'Reverse a String', difficulty: 'Easy' },
  { id: 4, title: 'FizzBuzz', difficulty: 'Medium' },
]

const card =
  'cursor-pointer rounded-[10px] border bg-surface p-5 transition-colors duration-150'

export default function Duel() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="animate-fade-in">
      <h1 className={`mb-2 text-[clamp(1.9rem,6vw,2.2rem)] font-bold ${headingGradient}`}>
        Duel Mode
      </h1>
      <p className="mb-8 text-base text-muted sm:text-lg">
        Pick a challenge and go head-to-head with another coder. First to solve it wins.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {challenges.map((challenge) => (
          <div
            className={`${card} ${
              selected === challenge.id
                ? 'border-accent bg-surface-2'
                : 'border-surface-2 hover:border-primary'
            }`}
            key={challenge.id}
            onClick={() => setSelected(challenge.id)}
          >
            <h3 className="mb-2 font-bold transition-colors duration-300 hover:text-accent">
              {challenge.title}
            </h3>
            <span className="inline-block rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-bold text-muted">
              {challenge.difficulty}
            </span>
          </div>
        ))}
      </div>
      <button className={`${btnPrimary} mt-6 w-full sm:w-auto`} disabled={!selected}>
        {selected ? 'Start Duel' : 'Select a challenge'}
      </button>
    </section>
  )
}
