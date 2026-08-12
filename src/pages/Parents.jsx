import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KidButton, KidCard, KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'
import { challenges, conceptLabels, getChallengesInLand, lands } from '../data/game.js'

function StatBox({ label, value }) {
  return (
    <div className="rounded-3xl bg-secondary/60 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-display text-2xl">{value}</p>
    </div>
  )
}

export default function Parents() {
  const { parent, profile, updateParent, resetAll } = useGame()
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [wrong, setWrong] = useState(false)

  if (!unlocked) {
    return (
<main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-5 px-4">
        <div className={cn('text-center', wrong && 'animate-shake')}>
          <p className="text-5xl">🔒</p>
          <h1 className="mt-3 font-display text-3xl">Grown-ups only 👨‍👩‍👧</h1>
          <p className="mt-2 text-base text-muted-foreground">Enter the 4-digit PIN (demo PIN: 1234)</p>
          <input
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ''))
              setWrong(false)
            }}
            className="mt-4 w-full rounded-3xl border-4 border-input bg-background px-5 py-4 text-center font-display text-3xl tracking-[0.5em] outline-none focus:border-ring"
          />
          {wrong && <p className="mt-2 text-base text-destructive">That PIN didn't match. 🔒</p>}
          <div className="mt-4 flex justify-center">
            <KidButton
              tone="primary"
              onClick={() => {
                if (pin === parent.pin) {
                  setUnlocked(true)
                } else {
                  setWrong(true)
                  setPin('')
                }
              }}
            >
              Unlock
            </KidButton>
          </div>
          <Link to="/" className="mt-4 inline-block text-base underline">
            Back to Codivo Kids 🧒
          </Link>
        </div>
      </main>
    )
  }

  const completedIds = profile?.completedChallengeIds ?? []
  const concepts = Array.from(
    new Set(challenges.filter((c) => completedIds.includes(c.id)).map((c) => c.concept)),
  )

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <KidNav to="/map" label="Kid app" />
        <h1 className="font-display text-3xl">Parent Dashboard 🧑‍💼</h1>
      </div>

      <KidCard className="mt-6 p-6">
        <h2 className="text-2xl font-extrabold">{profile ? `${profile.avatar} ${profile.name}` : 'No child profile yet'}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
<StatBox label="Challenges completed 🎮" value={`${completedIds.length} of ${challenges.length}`} />
          <StatBox label="Time learning ⏱️" value={`${profile?.minutesLearning ?? 0} min`} />
          <StatBox label="Stickers earned ⭐" value={`${profile?.stickerIds?.length ?? 0}`} />
        </div>
      </KidCard>

      <KidCard className="mt-6 p-6">
        <h2 className="text-2xl font-extrabold">Progress by land 🌍</h2>
        <ul className="mt-3 flex list-none flex-col gap-2 p-0">
{lands.map((land) => {
            const list = getChallengesInLand(land.id)
            const done = list.filter((c) => completedIds.includes(c.id)).length
            return (
              <li key={land.id} className="rounded-2xl bg-secondary/60 px-4 py-3">
                <div className="flex items-center justify-between text-lg">
                  <span>
                    {land.emoji} {land.name}
                  </span>
                  <span>
                    ✅ {done} / {list.length}
                  </span>
                </div>
                <div className="mt-2 flex gap-1.5">
                  {Array.from({ length: list.length }, (_, i) => (
                    <div
                      key={i}
                      className={cn('h-3 flex-1 rounded-full', i < done ? 'bg-primary' : 'bg-card')}
                    />
                  ))}
                </div>
              </li>
            )
          })}
        </ul>
      </KidCard>

      <KidCard className="mt-6 p-6">
        <h2 className="text-2xl font-extrabold">What they've learned 🎓</h2>
        {concepts.length === 0 ? (
          <p className="mt-2 text-lg text-muted-foreground">
            Nothing yet - the first challenge covers putting steps in order.
          </p>
        ) : (
          <ul className="mt-2 list-disc pl-6 text-lg">
            {concepts.map((c) => (
              <li key={c}>{conceptLabels[c]}</li>
            ))}
          </ul>
        )}
      </KidCard>

      <KidCard className="mt-6 p-6">
        <h2 className="text-2xl font-extrabold">Settings ⚙️</h2>
        <label className="mt-4 block text-lg">
          Daily screen-time limit: {parent.dailyMinutesLimit} minutes
          <input
            type="range"
            min={10}
            max={120}
            step={5}
            value={parent.dailyMinutesLimit}
            onChange={(e) => updateParent({ dailyMinutesLimit: Number(e.target.value) })}
            className="mt-2 w-full"
          />
        </label>
        <label className="mt-4 flex items-center gap-3 text-lg">
          <input
            type="checkbox"
            checked={parent.raceEnabled}
            onChange={(e) => updateParent({ raceEnabled: e.target.checked })}
            className="size-6"
          />
          Allow friendly &quot;Race&quot; mode with friends 🏁
        </label>
        <label className="mt-4 block text-lg">
          Contact email
          <input
            type="email"
            value={parent.email}
            onChange={(e) => updateParent({ email: e.target.value })}
            className="mt-1 w-full rounded-2xl border-4 border-input bg-background px-4 py-2"
          />
        </label>
        <button
          type="button"
          onClick={() => {
            resetAll()
            setUnlocked(false)
            setPin('')
          }}
          className="mt-6 rounded-2xl bg-destructive px-4 py-2 text-destructive-foreground"
        >
          Reset child profile
        </button>
      </KidCard>
    </main>
  )
}
