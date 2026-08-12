import { useEffect, useMemo, useState } from 'react'
import { cn } from './cn.js'
import { useGame } from '../context/gameContext.js'
import { getCompanion, getOutfit } from '../data/game.js'

const sizeClasses = { sm: 'text-4xl', md: 'text-6xl', lg: 'text-8xl' }

export function CompanionAvatar({ size = 'md', animate = true, className }) {
  const { profile } = useGame()
  const buddy = getCompanion(profile?.companionId)
  const outfit = profile?.outfitId ? getOutfit(profile.outfitId) : null

  return (
    <div className={cn('relative inline-block', className)}>
      <span
        role="img"
        aria-label={buddy.name}
        className={cn('inline-block', sizeClasses[size] ?? sizeClasses.md, animate && 'animate-bounce-soft')}
      >
        {buddy.emoji}
      </span>
      {outfit && (
        <span aria-hidden className="absolute -right-2 -top-2 animate-sparkle text-2xl">
          {outfit.emoji}
        </span>
      )}
    </div>
  )
}

export default function Companion({ lines, size = 'md', tone = 'card' }) {
  const { profile } = useGame()
  const buddy = getCompanion(profile?.companionId)
  const list = useMemo(() => (Array.isArray(lines) ? lines : [lines]), [lines])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (list.length < 2) return undefined
    const id = window.setInterval(() => setIndex((i) => (i + 1) % list.length), 5000)
    return () => window.clearInterval(id)
  }, [list])

  return (
<div className="flex w-full max-w-full items-end gap-3 sm:w-auto">
      <CompanionAvatar size={size} />
      <div
        className={cn(
          'pillow relative min-w-0 max-w-md flex-1 rounded-3xl px-4 py-3 text-base font-bold sm:flex-none sm:px-5 sm:py-4 sm:text-lg',
          tone === 'sunny' ? 'bg-sunny text-sunny-foreground' : 'bg-card text-card-foreground',
        )}
      >
        <span className="mr-1 font-display text-base opacity-70">{buddy.name}:</span>
        {list[index % list.length]}
      </div>
    </div>
  )
}
