import { useMemo } from 'react'
import { cn } from './cn.js'
import { ATTR_HELP, getBlockDef } from '../data/blocks.js'
import { buildHtml, buildRows, codeFor, readPayload, wrapDoc } from '../data/blockKit.js'

export function PaletteChip({ code, className, payload, onAdd }) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/x-codivo', JSON.stringify(payload))
        e.dataTransfer.effectAllowed = 'copyMove'
      }}
      onClick={() => onAdd?.()}
      className={cn(
        'chunky chunky-press blockly cursor-grab px-3 py-2 text-left font-mono text-sm font-extrabold active:cursor-grabbing',
        className,
      )}
    >
      {code}
    </button>
  )
}

export function PartBuilder({ part, value, onAdd, onRemove, onText, onAttr, onClear, paintMode }) {
  const { rows } = useMemo(() => buildRows(value.blocks), [value.blocks])
  const html = useMemo(() => buildHtml(rows, value.texts, value.attrs), [rows, value.texts, value.attrs])
  return (
    <div className="rounded-4xl border-4 border-dashed border-card bg-card/40 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl">
          {part.emoji} {part.name}
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="chunky chunky-press rounded-full bg-muted px-3 py-1 text-sm font-bold"
        >
          🧹 Clear
        </button>
      </div>
      <p className="text-sm text-muted-foreground">{part.hint}</p>
      {paintMode && (
        <p className="mt-1 rounded-2xl bg-sunny/60 px-3 py-2 text-sm font-extrabold text-sunny-foreground">
          🎨 Paint this part: drop blocks, type your words, then open the style= pill and paint! Example:{' '}
          <code className="rounded-lg bg-white/80 px-1.5 py-0.5 font-mono text-xs">color: #ff6b9d</code>
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-2 rounded-3xl bg-secondary/60 p-2">
        {part.tags.map((tag) => {
          const def = getBlockDef(tag)
          const chips = def?.voidElement
            ? [{ tag, isClose: false }]
            : [
                { tag, isClose: false },
                { tag, isClose: true },
              ]
          return chips.map((c) => (
            <PaletteChip
              key={`${c.tag}-${c.isClose}`}
              code={codeFor(c.tag, c.isClose, def)}
              className={cn(c.isClose ? 'bg-space text-space-foreground' : (def?.colorClass ?? 'bg-ocean'))}
              payload={{ from: 'palette', tag: c.tag, isClose: c.isClose }}
              onAdd={() => onAdd(c.tag, c.isClose)}
            />
          ))
        })}
      </div>
      <div className="mt-2 rounded-3xl bg-secondary/50 p-3">
        <p className="font-display text-sm font-extrabold">
          {part.emoji} What is the {part.name}? — {part.about}
        </p>
        <div className="mt-2 grid gap-2">
          {part.tags.map((tag) => {
            const def = getBlockDef(tag)
            if (!def) return null
            return (
              <div key={tag} className="rounded-2xl bg-white/70 p-2">
                <p className="font-mono text-xs font-extrabold">
                  {def.emoji} {def.syntax} — {def.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {(def.attrs ?? []).map((name) => (
                    <span
                      key={name}
                      className="rounded-full bg-ocean/10 px-2 py-0.5 text-xs font-bold text-ocean-foreground"
                    >
                      {name} = {ATTR_HELP[name] ?? 'Makes this element special.'}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div
        className="kid-scroll mt-2 min-h-24 overflow-y-auto rounded-3xl border-4 border-dashed border-muted bg-white/60 p-2"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const p = readPayload(e)
          if (p?.from === 'palette') onAdd(p.tag, p.isClose)
        }}
      >
        {rows.length === 0 && (
          <p className="p-2 text-center text-sm font-bold text-muted-foreground">
            Drop your {part.name} blocks here! 👇
          </p>
        )}
        {rows.map((r) => {
          const def = getBlockDef(r.tag)
          return (
            <div key={r.id} className="mb-2 flex flex-wrap items-center gap-2" style={{ marginLeft: r.depth * 18 }}>
              <span
                className={cn(
                  'blockly px-3 py-1.5 font-mono text-sm font-extrabold',
                  r.mismatch
                    ? 'bg-red-500 text-white'
                    : r.isClose
                      ? 'bg-space text-space-foreground'
                      : r.kind === 'void'
                        ? 'bg-grape text-grape-foreground'
                        : def?.colorClass,
                )}
              >
                {r.code}
              </span>
              {r.kind === 'open' && def?.acceptsText && (
                <input
                  className="w-36 rounded-full bg-white px-3 py-1 text-sm"
                  placeholder="Type here…"
                  value={value.texts[r.id] ?? ''}
                  onChange={(e) => onText(r.id, e.target.value)}
                />
              )}
              {r.kind !== 'close' &&
                (def?.attrs ?? []).map((name) => (
                  <label
                    key={name}
                    className="flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs font-bold text-foreground/70"
                  >
                    {name}=
                    <input
                      className="w-16 bg-transparent font-mono text-xs outline-none"
                      value={value.attrs[r.id]?.[name] ?? ''}
                      onChange={(e) => onAttr(r.id, name, e.target.value)}
                    />
                  </label>
                ))}
              <button
                type="button"
                onClick={() => onRemove(r.id)}
                className="chunky-press rounded-full bg-red-400 px-2 text-xs font-extrabold text-white"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>
      {html.trim() && (
        <iframe
          title={`${part.name} preview`}
          srcDoc={wrapDoc(html)}
          sandbox="allow-popups"
          className="mt-2 min-h-28 w-full rounded-3xl bg-white"
        />
      )}
    </div>
  )
}

export function Wireframe({ project, parts, myId, players }) {
  const ownerName = (partId) => {
    for (const [pid, ids] of Object.entries(parts)) if (ids.includes(partId)) return pid
    return null
  }
  return (
    <div className="overflow-hidden rounded-4xl border-4 border-muted bg-white shadow-inner">
      <div className="flex items-center gap-2 border-b-2 border-muted bg-secondary/70 px-3 py-2">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-sunny" />
        <span className="h-3 w-3 rounded-full bg-jungle" />
        <span className="ml-2 font-mono text-xs font-bold text-muted-foreground">{project.title}.html</span>
      </div>
      <div className="p-3">
        {project.parts.map((p, i) => {
          const owner = ownerName(p.id)
          const me = owner === myId
          const other = owner && !me ? players.find((pl) => pl.id === owner) : null
          return (
            <div
              key={p.id}
              className={cn(
                'rounded-2xl border-4 border-dashed p-2 text-center',
                i > 0 && 'mt-2',
                me ? 'border-ocean bg-ocean/10' : other ? 'border-grape bg-grape/10' : 'border-muted bg-secondary/40',
              )}
            >
              <div className="flex flex-wrap items-center justify-center gap-2 font-display text-sm font-extrabold">
                <span className="text-lg">{p.emoji}</span> {p.name}
                <span
                  className={cn(
                    'rounded-full px-2 text-xs',
                    me ? 'bg-ocean text-white' : other ? 'bg-grape text-white' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {me ? '👉 Yours' : other ? `${other.avatar} ${other.name}` : '🆓 Free'}
                </span>
              </div>
              <p className="mt-1 text-xs font-bold text-muted-foreground">{p.about}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function RoomChips({ players, ready, myId }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {players.map((p) => (
        <span
          key={p.id}
          className={cn(
            'flex items-center gap-2 rounded-full bg-card px-3 py-1.5 font-display text-sm font-extrabold ring-2',
            p.id === myId ? 'ring-ocean' : 'ring-grape/50',
          )}
        >
          <span className="text-lg">{p.avatar}</span> {p.name} {p.id === myId && '(you)'}
          {ready?.[p.id] && <span className="rounded-full bg-jungle px-2 text-xs text-white">✔ Ready</span>}
        </span>
      ))}
    </div>
  )
}