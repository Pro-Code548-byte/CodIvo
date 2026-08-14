import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckIcon, InitialBadge, KidButton, KidCard } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'
import { AVATARS, companions } from '../data/game.js'

export default function Profile() {
  const { profile, updateProfile } = useGame()
  const navigate = useNavigate()
  const [name, setName] = useState(profile?.name ?? '')
  const [avatar, setAvatar] = useState(profile?.avatar ?? AVATARS[0])
  const [companionId, setCompanionId] = useState(profile?.companionId ?? companions[0].id)
  const selectedBuddy = companions.find((c) => c.id === companionId) ?? companions[0]

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/learn')
  }

  const save = () => {
    updateProfile({ name: name.trim() || profile?.name || 'Friend', avatar, companionId })
    goBack()
  }

  return (
    <main className="mx-auto flex min-h-[75vh] w-full max-w-md flex-col justify-center px-4 py-10">
      <KidCard className="animate-pop-in p-6">
        <div className="text-center">
          <p className="text-4xl">✏️</p>
          <h1 className="mt-2 font-display text-3xl">Change name &amp; character</h1>
          <p className="mt-1 text-base text-muted-foreground">
            Pick a cool name and a buddy for your adventures!
          </p>
        </div>

        <div className="mt-5 flex items-center gap-4 rounded-3xl bg-secondary/60 p-4">
          <InitialBadge name={name || profile?.name} className="size-14 text-3xl sm:size-16 sm:text-4xl" />
          <div className="min-w-0">
            <p className="truncate font-display text-2xl">{name.trim() || 'Friend'}</p>
            <p className="text-base text-muted-foreground">
              <span className="mr-1 text-xl">{avatar}</span>
              with {selectedBuddy.emoji} {selectedBuddy.name}
            </p>
          </div>
        </div>

        <label className="mt-5 block font-display text-lg" htmlFor="profile-name">
          Your name
        </label>
        <input
          id="profile-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={16}
          placeholder="e.g. Alex"
          className="mt-1 w-full rounded-2xl border-4 border-input bg-background px-4 py-3 font-display text-xl outline-none focus:border-ring"
        />

        <p className="mt-5 font-display text-lg">Character</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAvatar(a)}
              aria-label={`avatar ${a}`}
              className={cn(
                'chunky chunky-press size-14 rounded-2xl bg-secondary text-3xl transition-transform',
                avatar === a && 'scale-110 ring-4 ring-ring',
              )}
            >
              {a}
            </button>
          ))}
        </div>

        <p className="mt-5 font-display text-lg">Buddy</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {companions.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCompanionId(c.id)}
              className={cn(
                'chunky chunky-press rounded-2xl bg-sunny p-2 text-sunny-foreground',
                companionId === c.id && 'ring-4 ring-ring',
              )}
            >
              <span className="block text-3xl">{c.emoji}</span>
              <span className="block font-display text-sm">{c.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <KidButton tone="muted" onClick={goBack}>
            Cancel
          </KidButton>
          <KidButton tone="jungle" onClick={save} className="inline-flex items-center gap-2">
            <CheckIcon className="size-5" />
            Save
          </KidButton>
        </div>
      </KidCard>
    </main>
  )
}