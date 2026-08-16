import { cn } from './cn.js'
import { blockRegistry, categoryLabels } from '../data/blocks.js'
import { unlockInfo } from '../data/lessons.js'

const CATEGORY_ORDER = ['structure', 'text', 'semantic', 'media', 'link', 'form']

export default function BlockPalette({ unlocked, onDragStart, onAdd }) {
  const unlockedSet = new Set(unlocked)
  const defs = Object.values(blockRegistry)

  return (
    <div className="flex flex-col gap-5">
      {CATEGORY_ORDER.map((cat) => {
        const items = defs.filter((d) => d.category === cat)
        if (items.length === 0) return null
        const anyUnlocked = items.some((d) => unlockedSet.has(d.id))
        return (
          <section key={cat}>
            <h4 className="mb-2 flex items-center gap-2 font-display text-lg font-extrabold">
              {categoryLabels[cat]}
              {!anyUnlocked && <span aria-hidden>🔒</span>}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {items.map((d) => {
                const isOpen = unlockedSet.has(d.id)
                const info = isOpen ? null : unlockInfo(d.id)
                return (
                  <button
                    key={d.id}
                    type="button"
                    draggable={isOpen}
                    onDragStart={(e) => {
                      if (!isOpen) return
                      e.dataTransfer.setData(
                        'application/x-codivo',
                        JSON.stringify({ from: 'toolbox', type: d.id }),
                      )
                      e.dataTransfer.effectAllowed = 'move'
                      onDragStart()
                    }}
                    onClick={() => isOpen && onAdd(d.id)}
                    className={cn(
                      'chunky chunky-press rounded-3xl p-3 text-left font-display text-base font-extrabold',
                      isOpen
                        ? cn('cursor-grab active:cursor-grabbing', d.colorClass)
                        : 'cursor-not-allowed bg-muted text-muted-foreground opacity-60 grayscale',
                    )}
                    {...(isOpen ? {} : { 'aria-disabled': true })}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl" aria-hidden>{isOpen ? d.emoji : '🔒'}</span>
                      <span className="uppercase tracking-wide">{d.name}</span>
                    </span>
                    <code className="mt-1 block font-mono text-xs font-bold opacity-90">{d.syntax}</code>
                    {isOpen ? (
                      <span className="mt-1 block text-xs font-bold leading-snug opacity-85">
                        {d.description}
                      </span>
                    ) : (
                      <span className="mt-1 block rounded-full bg-card/80 px-2 py-0.5 text-center text-[11px] font-extrabold">
                        {info ? `Lesson ${info.order}: ${info.title}` : 'Soon 🔜'}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}