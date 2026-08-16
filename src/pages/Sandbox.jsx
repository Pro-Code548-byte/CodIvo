import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { KidButton, KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { blockRegistry, categoryLabels, getBlockDef } from '../data/blocks.js'
import { buildHtml, buildRows, codeFor, nextId, readPayload, PREVIEW_SCRIPT, PREVIEW_STYLE } from '../data/blockKit.js'

const STORE_KEY = 'codivo-sandbox-v1'

function PaletteChip({ code, className, payload, onAdd }) {
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

export default function Sandbox() {
  const [workspace, setWorkspace] = useState([])
  const [texts, setTexts] = useState({})
  const [attrs, setAttrs] = useState({})
  const [title, setTitle] = useState('')
  const [saved, setSaved] = useState(null)
  const [gallery, setGallery] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) ?? '[]')
    } catch {
      return []
    }
  })

  const { rows, openCount } = useMemo(() => buildRows(workspace), [workspace])
  const html = useMemo(() => buildHtml(rows, texts, attrs), [rows, texts, attrs])
  const srcDoc = useMemo(() => {
    let doc = html
    if (!doc.trim()) return ''
    if (doc.includes('</head>')) doc = doc.replace('</head>', PREVIEW_STYLE + '</head>')
    if (doc.includes('</body>')) doc = doc.replace('</body>', PREVIEW_SCRIPT + '</body>')
    return doc
  }, [html])

  const categories = useMemo(() => {
    const order = ['structure', 'text', 'semantic', 'media', 'link', 'form']
    const groups = {}
    for (const id of order) {
      const defs = Object.values(blockRegistry).filter((d) => d.category === id)
      if (defs.length) groups[id] = defs
    }
    return groups
  }, [])

  const addBlock = (tag, isClose) =>
    setWorkspace((w) => [...w, { id: nextId(), tag, isClose }])

  const removeBlock = (id) => {
    setWorkspace((w) => w.filter((x) => x.id !== id))
    setTexts((t) => {
      const rest = {}
      for (const [k, v] of Object.entries(t)) if (k !== id) rest[k] = v
      return rest
    })
    setAttrs((a) => {
      const rest = {}
      for (const [k, v] of Object.entries(a)) if (k !== id) rest[k] = v
      return rest
    })
  }

  const clearAll = () => {
    setWorkspace([])
    setTexts({})
    setAttrs({})
  }

  const save = () => {
    const entry = {
      id: `s${Date.now()}`,
      title: title.trim() || 'My creation',
      blocks: workspace,
      texts,
      attrs,
      html,
      ts: Date.now(),
    }
    const next = [entry, ...gallery].slice(0, 12)
    setGallery(next)
    localStorage.setItem(STORE_KEY, JSON.stringify(next))
    setSaved(entry.title)
  }

  const load = (entry) => {
    setWorkspace(entry.blocks ?? [])
    setTexts(entry.texts ?? {})
    setAttrs(entry.attrs ?? {})
    setTitle(entry.title)
    setSaved(null)
  }

  const remove = (id) => {
    const next = gallery.filter((g) => g.id !== id)
    setGallery(next)
    localStorage.setItem(STORE_KEY, JSON.stringify(next))
  }

  return (
    <main className="mx-auto w-full max-w-[1700px] px-2 py-4 sm:px-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav />
        <h1 className="font-display text-3xl sm:text-4xl">Sandbox 🧪</h1>
      </div>

      <div className="mt-3">
        <Companion
          lines={[
            'Anything goes here! Drag any blocks you like, type your words, and build whatever you dream up. Save it to your gallery!',
          ]}
          tone="card"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 rounded-4xl bg-card p-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name your creation…"
          className="w-full max-w-xs rounded-full border-4 border-muted bg-white px-4 py-2 font-display text-lg font-extrabold"
        />
        <KidButton tone="jungle" onClick={save} disabled={!workspace.length}>
          💾 Save to gallery
        </KidButton>
        {saved && <span className="font-display text-lg font-extrabold text-jungle">✅ Saved “{saved}”!</span>}
        <KidButton tone="muted" onClick={clearAll} disabled={!workspace.length}>
          🧹 Start over
        </KidButton>
      </div>

      <div className="mt-3 grid gap-3 lg:flex lg:max-h-[80vh] lg:flex-row lg:gap-3">
        <section className="kid-scroll overflow-y-auto rounded-4xl border-4 border-dashed border-card bg-card/40 p-3 lg:w-64 lg:flex-none">
          <h2 className="font-display text-xl">🧱 Block shelf</h2>
          {Object.entries(categories).map(([id, defs]) => (
            <div key={id} className="mt-3">
              <p className="font-display text-sm font-extrabold text-muted-foreground">{categoryLabels[id]}</p>
              <div className="mt-1 flex flex-wrap gap-2 lg:flex-col">
                {defs.map((def) => {
                  const chips = def.voidElement
                    ? [{ tag: def.id, isClose: false }]
                    : [
                        { tag: def.id, isClose: false },
                        { tag: def.id, isClose: true },
                      ]
                  return chips.map((c) => (
                    <PaletteChip
                      key={`${c.tag}-${c.isClose}`}
                      code={codeFor(c.tag, c.isClose, def)}
                      className={cn(c.isClose ? 'bg-space text-space-foreground' : def.colorClass)}
                      payload={{ from: 'palette', tag: c.tag, isClose: c.isClose }}
                      onAdd={() => addBlock(c.tag, c.isClose)}
                    />
                  ))
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="kid-scroll flex-1 overflow-y-auto rounded-4xl border-4 border-dashed border-card bg-card/40 p-3">
          <h2 className="font-display text-xl">
            🛠️ Your canvas {openCount > 0 && <span className="text-sm text-muted-foreground">({openCount} open tag{openCount > 1 ? 's' : ''})</span>}
          </h2>
          <div
            className="kid-scroll mt-2 min-h-[30vh] overflow-y-auto rounded-3xl border-4 border-dashed border-muted bg-white/60 p-2 lg:min-h-0"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const p = readPayload(e)
              if (p?.from === 'palette') addBlock(p.tag, p.isClose)
            }}
          >
            {rows.length === 0 && (
              <p className="p-4 text-center font-display text-lg font-extrabold text-muted-foreground">
                Drop any blocks here to start building! 👇
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
                      value={texts[r.id] ?? ''}
                      onChange={(e) => setTexts((t) => ({ ...t, [r.id]: e.target.value }))}
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
                          value={attrs[r.id]?.[name] ?? ''}
                          onChange={(e) =>
                            setAttrs((a) => ({ ...a, [r.id]: { ...(a[r.id] ?? {}), [name]: e.target.value } }))
                          }
                        />
                      </label>
                    ))}
                  <button
                    type="button"
                    onClick={() => removeBlock(r.id)}
                    className="chunky-press rounded-full bg-red-400 px-2 text-xs font-extrabold text-white"
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
          {workspace.length > 0 && (
            <div className="kid-scroll mt-2 max-h-40 overflow-y-auto rounded-3xl bg-secondary/70 p-3 font-mono text-xs font-bold leading-relaxed">
              <pre className="whitespace-pre-wrap">{html}</pre>
            </div>
          )}
        </section>

        <section className="kid-scroll flex-1 overflow-y-auto rounded-4xl border-4 border-dashed border-card bg-card/40 p-3 lg:w-[38%] lg:flex-none">
          <h2 className="font-display text-xl">👀 Live preview</h2>
          <div className="mt-2 overflow-hidden rounded-3xl border-4 border-muted bg-white">
            <div className="flex items-center gap-2 border-b-2 border-muted bg-secondary/70 px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-sunny" />
              <span className="h-3 w-3 rounded-full bg-jungle" />
              <span className="ml-2 font-mono text-xs font-bold text-muted-foreground">
                {title.trim() ? `${title}.html` : 'my-page.html'}
              </span>
            </div>
            {srcDoc ? (
              <iframe
                title="Live preview"
                srcDoc={srcDoc}
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                className="min-h-[40vh] w-full bg-white md:min-h-[50vh]"
              />
            ) : (
              <p className="grid min-h-[40vh] place-items-center p-4 text-center font-display text-base font-extrabold text-muted-foreground md:min-h-[50vh]">
                👀 Your page will appear here!
              </p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-4">
        <h2 className="font-display text-2xl">🖼️ My gallery {gallery.length > 0 && `(${gallery.length})`}</h2>
        {gallery.length === 0 ? (
          <p className="mt-2 rounded-4xl bg-card p-4 text-center font-display text-lg font-extrabold text-muted-foreground">
            Nothing saved yet — build something and press 💾!
          </p>
        ) : (
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((g) => (
              <div key={g.id} className="rounded-4xl border-4 border-card bg-card/60 p-3">
                <div className="overflow-hidden rounded-2xl border-2 border-muted bg-white">
                  <iframe title={g.title} srcDoc={g.html || ''} sandbox="allow-popups" className="h-36 w-full bg-white" />
                </div>
                <p className="mt-2 truncate font-display text-lg font-extrabold">{g.title}</p>
                <div className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => load(g)}
                    className="chunky chunky-press flex-1 rounded-full bg-ocean px-3 py-1.5 text-sm font-extrabold text-white"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(g.id)}
                    className="chunky-press rounded-full bg-red-400 px-3 py-1.5 text-sm font-extrabold text-white"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="mt-4 text-center">
        <Link to="/learn" className="font-display text-lg font-extrabold text-primary no-underline">
          🗺️ Back to the learning map
        </Link>
      </p>
    </main>
  )
}