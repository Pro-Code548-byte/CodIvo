import { useState } from 'react'
import { btnPrimary } from '../components/buttonClasses.js'
import { card, cardHover, badge } from '../components/cardClasses.js'
import { headingGradient } from '../components/headingClasses.js'

const challenges = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', color: 'success' },
  { id: 2, title: 'Palindrome Check', difficulty: 'Easy', color: 'success' },
  { id: 3, title: 'Reverse a String', difficulty: 'Easy', color: 'success' },
  { id: 4, title: 'FizzBuzz', difficulty: 'Medium', color: 'warning' },
]

const barColor = {
  success: 'border-[#3f9c3f] bg-success shadow-[0_4px_0_0_#3f9c3f]',
  warning: 'border-[#d9a600] bg-warning shadow-[0_4px_0_0_#d9a600]',
}

const badgeColor = {
  success: 'border-[#3f9c3f] bg-success text-white',
  warning: 'border-[#d9a600] bg-warning text-white',
}

export default function Duel() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="animate-fade-in">
      <h1 className={`mb-2 text-[clamp(1.9rem,6vw,2.2rem)] font-extrabold ${headingGradient}`}>
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
                ? 'border-accent shadow-[0_5px_0_0_var(--color-accent)]'
                : cardHover
            } cursor-pointer p-0 overflow-hidden`}
            key={challenge.id}
            onClick={() => setSelected(challenge.id)}
          >
            <span
              className={`mb-1 block h-3 border-b-2 border-black/15 ${barColor[challenge.color]}`}
            />
            <div className="p-5">
              <h3 className="mb-2 text-lg font-extrabold transition-colors duration-300 hover:text-accent">
                {challenge.title}
              </h3>
              <span className={`${badge} ${badgeColor[challenge.color]}`}>
                {challenge.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className={`${btnPrimary} mt-6 w-full sm:w-auto`} disabled={!selected}>
        {selected ? 'Start Duel' : 'Select a challenge'}
      </button>
    </section>
  )
}
