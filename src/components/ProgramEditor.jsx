import { useEffect, useRef, useState } from 'react'
import { cn } from './cn.js'
import { getBlockDef } from '../data/blocks.js'
import { makeNode } from '../data/program.js'

const BROAD = [
  'h1', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'button',
  'div', 'section', 'article', 'header', 'nav', 'main', 'footer',
  'form', 'label', 'input', 'textarea', 'select',
]

function readDrag(e) {
  const raw =
    e.dataTransfer.getData('application/x-codivo') || e.dataTransfer.getData('text/plain')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function removeNode(nodes, id, parent) {
  const out = []
  let removed = null
  let removedIndex = -1
  let removedParent = parent
  for (const n of nodes) {
    if (n.id === id) {
      removed = n
      removedIndex = out.length
      removedParent = parent
      continue
    }
    out.push(n.children?.length ? { ...n, children: removeNode(n.children, id, n.id).out } : n)
  }
  return { out, removed, removedIndex, removedParent }
}

function insertAt(nodes, parentId, index, node) {
  if (parentId === 'root') {
    const list = [...nodes]
    list.splice(index, 0, node)
    return list
  }
  return nodes.map((n) => {
    if (n.id === parentId) {
      const children = [...(n.children ?? [])]
      children.splice(index, 0, node)
      return { ...n, children }
    }
    return n.children?.length ? { ...n, children: insertAt(n.children, parentId, index, node) } : n
  })
}

function contains(nodes, id) {
  return nodes.some((n) => n.id === id || (n.children?.length && contains(n.children, id)))
}

function isDescendant(nodes, dragId, parentId) {
  for (const n of nodes) {
    if (n.id === dragId) return contains(n.children ?? [], parentId)
    if (n.children?.length && isDescendant(n.children, dragId, parentId)) return true
  }
  return false
}

function updateField(nodes, id, key, value) {
  return nodes.map((n) => {
    if (n.id === id) return { ...n, fields: { ...n.fields, [key]: value } }
    return n.children?.length ? { ...n, children: updateField(n.children, id, key, value) } : n
  })
}

function removeById(nodes, id) {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) => (n.children?.length ? { ...n, children: removeById(n.children, id) } : n))
}

function canDrop(type, parentId, parentDef, index) {
  if (type === 'doctype') return parentId === 'root' && index === 0
  if (parentId === 'root') return BROAD.includes(type)
  return !!parentDef?.canContain && !!parentDef.allowedChildren?.includes(type)
}

function tagOf(def) {
  return def.syntax.slice(1, -1)
}

function Slot({ parentId, index, hovered, onEnter, onLeave, onDrop, big, staticText }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-2xl border-2 border-dashed px-2 text-sm font-extrabold transition-all',
        hovered
          ? 'border-ring bg-sunny/70 py-4 text-ring'
          : big
            ? 'border-muted/80 py-8 text-muted-foreground'
            : 'border-transparent py-1.5 text-transparent',
      )}
      onDragEnter={(e) => {
        e.preventDefault()
        onEnter(parentId, index)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        onLeave(parentId, index)
      }}
      onDrop={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onDrop(e, parentId, index)
      }}
    >
      {hovered ? '⬇ Drop here!' : (staticText ?? '')}
    </div>
  )
}

function BlockNode({ node, onUpdate, onRemove, hover, onEnter, onLeave, onDrop }) {
  const def = getBlockDef(node.type)
  const tag = tagOf(def)

  return (
    <div className={cn('rounded-3xl border-2', def.colorClass)}>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            'application/x-codivo',
            JSON.stringify({ from: 'program', id: node.id }),
          )
          e.dataTransfer.effectAllowed = 'move'
        }}
        className="flex min-w-0 cursor-grab flex-wrap items-center gap-2 px-3 py-2 active:cursor-grabbing"
      >
        <span aria-hidden className="text-base opacity-60">⠿</span>
        <span aria-hidden className="text-xl">{def.emoji}</span>
        <span className="truncate uppercase tracking-wide">{def.name}</span>
        <code className="rounded-lg bg-card/50 px-2 py-0.5 font-mono text-xs font-bold">
          {def.acceptsText ? `<${tag}> … </${tag}>` : def.syntax}
        </code>
        <button
          type="button"
          aria-label={`remove ${def.name} block`}
          onClick={() => onRemove(node.id)}
          className="ml-auto grid size-8 place-items-center rounded-full bg-card/60 text-base text-card-foreground transition-transform hover:scale-110"
        >
          ✕
        </button>
      </div>

      {def.acceptsText && (
        <div className="px-3 pb-2.5">
          {def.fields.length === 1 ? (
            <label className="flex items-center gap-1.5 rounded-xl bg-card/60 px-3 py-1.5">
              <code className="font-mono text-xs font-bold opacity-80">&lt;{tag}&gt;</code>
              <input
                value={node.fields[def.fields[0].key] ?? ''}
                onChange={(e) => onUpdate(node.id, def.fields[0].key, e.target.value)}
                placeholder={def.fields[0].label}
                className="min-w-0 flex-1 rounded-lg bg-transparent px-1 text-sm font-bold outline-none placeholder:opacity-60 focus:bg-card/60"
              />
              <code className="font-mono text-xs font-bold opacity-80">&lt;/{tag}&gt;</code>
            </label>
          ) : (
            <div className="flex flex-col gap-1.5">
              {def.fields.map((f) => (
                <label key={f.key} className="block rounded-xl bg-card/60 px-3 py-1.5">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wide opacity-75">
                    {f.label}
                  </span>
                  <input
                    value={node.fields[f.key] ?? ''}
                    onChange={(e) => onUpdate(node.id, f.key, e.target.value)}
                    placeholder={f.label}
                    className="w-full rounded-lg bg-transparent px-1 text-sm font-bold outline-none placeholder:opacity-60 focus:bg-card/60"
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {def.canContain && (
        <div className="ml-4 border-l-4 border-card/70 pb-1.5 pl-3">
          {(node.children ?? []).length === 0 ? (
            <Slot
              parentId={node.id}
              index={0}
              hovered={hover?.parentId === node.id && hover?.index === 0}
              onEnter={onEnter}
              onLeave={onLeave}
              onDrop={onDrop}
              staticText={`Drop inside ${def.name} 👇`}
            />
          ) : (
            <div className="flex flex-col gap-1">
              {(node.children ?? []).map((child, i) => (
                <div key={child.id} className="flex flex-col gap-1">
                  <Slot
                    parentId={node.id}
                    index={i}
                    hovered={hover?.parentId === node.id && hover?.index === i}
                    onEnter={onEnter}
                    onLeave={onLeave}
                    onDrop={onDrop}
                  />
                  <BlockNode
                    node={child}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                    hover={hover}
                    onEnter={onEnter}
                    onLeave={onLeave}
                    onDrop={onDrop}
                  />
                </div>
              ))}
              <Slot
                parentId={node.id}
                index={(node.children ?? []).length}
                hovered={hover?.parentId === node.id && hover?.index === (node.children ?? []).length}
                onEnter={onEnter}
                onLeave={onLeave}
                onDrop={onDrop}
                staticText="Drop inside to add more"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ProgramEditor({ program, onChange }) {
  const [hover, setHover] = useState(null)
  const [hint, setHint] = useState(null)
  const hintTimer = useRef(null)

  useEffect(() => {
    const clear = () => setHover(null)
    window.addEventListener('dragend', clear)
    return () => window.removeEventListener('dragend', clear)
  }, [])

  const flash = (msg) => {
    setHint(msg)
    window.clearTimeout(hintTimer.current)
    hintTimer.current = window.setTimeout(() => setHint(null), 2600)
  }

  const handleDrop = (e, parentId, index) => {
    const d = readDrag(e)
    if (!d) return
    const parentDef = parentId === 'root' ? null : getBlockDef(parentId)
    if (!canDrop(d.type, parentId, parentDef, index)) {
      if (d.type === 'doctype') {
        flash('🧾 DOCTYPE must be the very first block — drop it at the top!')
      } else if (parentId === 'root') {
        flash('🙅 That block belongs inside a page part — try BODY, HEADER, MAIN or a SECTION.')
      } else {
        flash(`🙅 A ${parentDef?.name} block can't hold that. Try a different part of the page!`)
      }
      return
    }
    if (d.from === 'program' && isDescendant(program, d.id, parentId)) {
      flash('🙅 A block can\u2019t be dropped inside itself!')
      return
    }

    let next
    let targetIndex = index
    if (d.from === 'program') {
      const { out, removed, removedIndex, removedParent } = removeNode(program, d.id, 'root')
      if (!removed) return
      if (removedParent === parentId && removedIndex < targetIndex) targetIndex -= 1
      next = insertAt(out, parentId, targetIndex, removed)
    } else {
      next = insertAt(program, parentId, index, makeNode(d.type))
    }
    onChange(next)
    setHover(null)
  }

  return (
    <div className="pillow rounded-4xl border-4 border-card bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-xl font-extrabold">My page 🛠️</h3>
        <span className="text-sm font-bold text-muted-foreground">
          {program.length} block{program.length === 1 ? '' : 's'}
        </span>
      </div>

      {program.length === 0 ? (
        <Slot
          parentId="root"
          index={0}
          hovered={hover?.parentId === 'root' && hover?.index === 0}
          onEnter={(pid, i) => setHover({ parentId: pid, index: i })}
          onLeave={(pid, i) =>
            setHover((h) => (h?.parentId === pid && h?.index === i ? null : h))
          }
          onDrop={handleDrop}
          big
          staticText="Drag blocks here 👇  (or tap a block above)"
        />
      ) : (
        <div className="flex flex-col gap-1">
          {program.map((n, i) => (
            <div key={n.id} className="flex flex-col gap-1">
              <Slot
                parentId="root"
                index={i}
                hovered={hover?.parentId === 'root' && hover?.index === i}
                onEnter={(pid, idx) => setHover({ parentId: pid, index: idx })}
                onLeave={(pid, idx) =>
                  setHover((h) => (h?.parentId === pid && h?.index === idx ? null : h))
                }
                onDrop={handleDrop}
              />
              <BlockNode
                node={n}
                onUpdate={(id, key, value) => onChange(updateField(program, id, key, value))}
                onRemove={(id) => onChange(removeById(program, id))}
                hover={hover}
                onEnter={(pid, idx) => setHover({ parentId: pid, index: idx })}
                onLeave={(pid, idx) =>
                  setHover((h) => (h?.parentId === pid && h?.index === idx ? null : h))
                }
                onDrop={handleDrop}
              />
            </div>
          ))}
          <Slot
            parentId="root"
            index={program.length}
            hovered={hover?.parentId === 'root' && hover?.index === program.length}
            onEnter={(pid, i) => setHover({ parentId: pid, index: i })}
            onLeave={(pid, i) =>
              setHover((h) => (h?.parentId === pid && h?.index === i ? null : h))
            }
            onDrop={handleDrop}
            staticText="➕ Drop here to add more"
          />
        </div>
      )}

      {hint && (
        <p className="mt-3 animate-shake rounded-2xl bg-sunny px-4 py-2 text-sm font-extrabold text-sunny-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}