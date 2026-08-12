import Companion, { CompanionAvatar } from '../components/Companion.jsx'
import { KidCard, KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'
import { getChallengesInLand, lands, outfits, stickers } from '../data/game.js'

export default function Trophies() {
  const { profile, chooseOutfit } = useGame()
  const completed = profile?.completedChallengeIds ?? []
  const ownedStickers = profile?.stickerIds ?? []
  const level = profile?.companionLevel ?? 1

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <KidNav />
        <h1 className="font-display text-4xl">My Shelf ðŸ†</h1>
      </div>

      <div className="mt-6">
        <Companion lines={["Look at all your stickers! I'm so proud of you."]} />
      </div>

<KidCard className="mt-6 p-6">
        <h2 className="text-2xl font-extrabold">My buddy 🧸</h2>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <CompanionAvatar size="lg" />
          <div>
            <p className="font-display text-2xl">Level {level}</p>
            <p className="text-lg text-muted-foreground">Your buddy grows when you play more games!</p>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-extrabold">Outfits 👗</h3>
        <div className="mt-2 flex flex-wrap gap-3">
          {outfits.map((outfit) => {
            const unlocked = level >= outfit.unlocksAtLevel
            return (
              <button
                key={outfit.id}
                type="button"
                disabled={!unlocked}
                onClick={() => chooseOutfit(outfit.id)}
                className={cn(
                  'chunky chunky-press rounded-3xl bg-secondary px-4 py-3 font-display text-lg',
                  !unlocked && 'cursor-not-allowed opacity-60 grayscale',
                  profile?.outfitId === outfit.id && 'ring-4 ring-ring',
                )}
              >
                <span className="mr-2 text-2xl">{unlocked ? outfit.emoji : 'ðŸ”’'}</span>
                {outfit.name}
              </button>
            )
          })}
        </div>
      </KidCard>

      <KidCard className="mt-6 p-6">
        <h2 className="text-2xl font-extrabold">Sticker book 📖</h2>
        <div className="mt-3 grid grid-cols-3 gap-4 sm:grid-cols-5">
          {stickers.map((sticker) => {
            const owned = ownedStickers.includes(sticker.id)
            return (
              <div key={sticker.id} className={cn('rounded-3xl bg-secondary/70 p-4 text-center', owned ? 'animate-pop' : 'opacity-50 grayscale')}>
                <p className="text-5xl">{owned ? sticker.emoji : 'â”'}</p>
                <p className="mt-1 text-sm">{owned ? sticker.name : 'Keep playing!'}</p>
              </div>
            )
          })}
        </div>
      </KidCard>

      <KidCard className="mt-6 p-6">
        <h2 className="text-2xl font-extrabold">Certificates 📜</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {lands.map((land) => {
            const earned = getChallengesInLand(land.id).every((c) => completed.includes(c.id))
            return (
              <div key={land.id} className={cn('rounded-4xl border-4 border-dashed p-5 text-center', earned ? land.themeClass : 'opacity-60')}>
                <p className="text-5xl">{earned ? 'ðŸŽ“' : 'ðŸ”’'}</p>
                <p className="mt-1 font-display text-xl font-extrabold">{land.certificateName}</p>
                {earned ? (
                  <>
                    <p className="text-base">Great job, {profile?.name ?? 'friend'}!</p>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="mt-2 rounded-full bg-card px-4 py-2 text-base text-card-foreground"
                    >
                      ðŸ–¨ï¸ Print it
                    </button>
                  </>
                ) : (
                  <p className="text-base">Finish {land.name} to earn it</p>
                )}
              </div>
            )
          })}
        </div>
      </KidCard>
    </main>
  )
}
