import { Fragment, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { getBlockDef } from '../data/blocks.js'
import { curriculum } from '../data/game.js'
import { buildHtml, buildRows, nextId, readPayload, PREVIEW_SCRIPT, PREVIEW_STYLE } from '../data/blockKit.js'

function PaletteBlock({ code, className, payload, onAdd }) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(
          'application/x-codivo',
          JSON.stringify({ from: 'palette', ...payload }),
        )
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

function buildSteps(tags) {
  const steps = []
  for (const tag of tags) {
    const def = getBlockDef(tag)
    if (def?.voidElement) {
      steps.push({ text: `Add the ${def.syntax} block.`, block: tag })
    } else {
      steps.push({ text: `Add the <${tag}> open tag.`, block: tag, part: 'open' })
      steps.push({ text: `Close it with the </${tag}> closing tag.`, block: tag, part: 'close' })
    }
  }
  const textTag = tags.find((t) => getBlockDef(t)?.acceptsText)
  if (textTag) steps.push({ text: `Type something inside your <${textTag}>!`, needsText: true })
  return steps
}

export default function Topic() {
  const { subjectId, topicId } = useParams()
  const [workspace, setWorkspace] = useState([])
  const [texts, setTexts] = useState({})
  const [attrs, setAttrs] = useState({})
  const [celebrated, setCelebrated] = useState(0)
  const [finishedDismissed, setFinishedDismissed] = useState(false)
  const [hoverId, setHoverId] = useState(null)
  const { rows, openCount } = useMemo(() => buildRows(workspace), [workspace])
  const html = useMemo(() => buildHtml(rows, texts, attrs), [rows, texts, attrs])
  const srcDoc = useMemo(() => {
    let doc = html
    if (!doc.trim()) return ''
    if (doc.includes('</head>')) doc = doc.replace('</head>', PREVIEW_STYLE + '</head>')
    if (doc.includes('</body>')) doc = doc.replace('</body>', PREVIEW_SCRIPT + '</body>')
    return doc
  }, [html])

  const subject = curriculum.find((s) => s.id === subjectId)
  const topic = subject?.topics.find((t) => t.id === topicId)
  if (!subject || !topic) return <Navigate to="/learn" replace />

  const tags = topic.tags ?? []
  const steps = topic.steps ?? buildSteps(tags)
  const missionTags = [...new Set(steps.map((s) => s.block).filter(Boolean))]

  const tagSet = new Set(workspace.map((b) => b.tag))
  const anyText = Object.values(texts).some((v) => v.trim().length > 0)
  const isStepDone = (s) => {
    if (s.needsText) return anyText
    if (s.requiredText) {
      return Object.values(texts).some((v) =>
        v.trim().toLowerCase().includes(s.requiredText.toLowerCase()),
      )
    }
    if (s.attr && s.value) {
      return workspace.some((b) => {
        if (b.tag !== s.block) return false
        const v = attrs[b.id]?.[s.attr] ?? ''
        return v.trim().toLowerCase().includes(s.value.toLowerCase())
      })
    }
    if (s.attrNotEmpty) {
      return workspace.some(
        (b) => b.tag === s.block && (attrs[b.id]?.[s.attrNotEmpty] ?? '').trim().length > 0,
      )
    }
    const def = getBlockDef(s.block)
    const wantClose = s.part === 'close'
    if (def?.voidElement) return tagSet.has(s.block)
    return workspace.some((b) => b.tag === s.block && b.isClose === wantClose)
  }

  const stepIndex = steps.findIndex((s) => !isStepDone(s))
  const allDone = steps.length > 0 && stepIndex === -1
  const showCompletion = allDone && celebrated >= steps.length && !finishedDismissed
  const pendingSteps = allDone ? [] : steps.slice(celebrated, stepIndex)
  const popupStep = showCompletion ? null : (pendingSteps[0] ?? null)
  const popupIndex = popupStep ? steps.indexOf(popupStep) + 1 : null

  const dismissPopup = () => {
    if (showCompletion) setFinishedDismissed(true)
    else setCelebrated((c) => c + 1)
  }

  const addBlock = (tag, isClose) => setWorkspace((w) => [...w, { id: nextId(), tag, isClose }])
  const insertAfter = (id, block) =>
    setWorkspace((w) => {
      const idx = w.findIndex((b) => b.id === id)
      if (idx === -1) return [...w, block]
      return [...w.slice(0, idx + 1), block, ...w.slice(idx + 1)]
    })
  const moveAfter = (fromId, toId) =>
    setWorkspace((w) => {
      const from = w.find((b) => b.id === fromId)
      if (!from) return w
      const filtered = w.filter((b) => b.id !== fromId)
      const idx = filtered.findIndex((b) => b.id === toId)
      if (idx === -1) return [...filtered, from]
      return [...filtered.slice(0, idx + 1), from, ...filtered.slice(idx + 1)]
    })
  const removeBlock = (id) => {
    setWorkspace((w) => w.filter((b) => b.id !== id))
    setTexts((t) => {
      const copy = { ...t }
      delete copy[id]
      return copy
    })
    setAttrs((a) => {
      const copy = { ...a }
      delete copy[id]
      return copy
    })
  }
  const clearWorkspace = () => {
    setWorkspace([])
    setTexts({})
    setAttrs({})
  }
  const setAttr = (id, name, value) =>
    setAttrs((a) => ({ ...a, [id]: { ...(a[id] ?? {}), [name]: value } }))

  return (
    <main className="mx-auto w-full max-w-[1700px] px-2 py-4 sm:px-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav to={`/subject/${subject.id}`} label="Back" />
      </div>

      <div className="kid-scroll mt-3 flex items-center gap-2 overflow-x-auto pb-2">
        <span className="shrink-0 font-display text-base font-extrabold text-muted-foreground">
          📚 Topics:
        </span>
        {subject.topics.map((t, i) => (
          <Link
            key={t.id}
            to={`/topic/${subject.id}/${t.id}`}
            className={cn(
              'chunky chunky-press shrink-0 rounded-full px-3.5 py-1.5 font-display text-sm font-extrabold no-underline',
              t.id === topic.id
                ? 'bg-foreground text-background'
                : 'bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {t.emoji} {i + 1}
          </Link>
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2 lg:flex lg:max-h-[80vh] lg:flex-row lg:gap-3">
        {[1, 2, 3, 4].map((n) => (
          <section
            key={n}
            className={cn(
              'kid-scroll flex-1 overflow-y-auto rounded-4xl border-4 border-dashed border-card bg-card/40 p-3',
              { 1: 'order-2', 2: 'order-3', 3: 'order-4', 4: 'order-1' }[n],
              'lg:order-none',
            )}
          >
            <span className="font-display text-base font-extrabold text-muted-foreground lg:hidden">
              {{ 1: 2, 2: 3, 3: 4, 4: 1 }[n]}
            </span>
            <span className="hidden font-display text-base font-extrabold text-muted-foreground lg:inline">
              {n}
            </span>

            {n === 1 && tags.length > 0 && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const payload = readPayload(e)
                  if (payload?.from === 'workspace') removeBlock(payload.id)
                }}
                className="mt-2 flex flex-col gap-3"
              >
                {tags.map((tag) => {
                  const def = getBlockDef(tag)
                  if (!def) return null
                  if (def.voidElement) {
                    return (
                      <PaletteBlock
                        key={tag}
                        code={def.syntax}
                        payload={{ tag: def.id, isClose: false }}
                        className="bg-grape text-grape-foreground"
                        onAdd={() => addBlock(def.id, false)}
                      />
                    )
                  }
                  return (
                    <Fragment key={tag}>
                      <PaletteBlock
                        code={`<${tag}>`}
                        payload={{ tag, isClose: false }}
                        className="bg-ocean text-ocean-foreground"
                        onAdd={() => addBlock(tag, false)}
                      />
                      <PaletteBlock
                        code={`</${tag}>`}
                        payload={{ tag, isClose: true }}
                        className="bg-space text-space-foreground"
                        onAdd={() => addBlock(tag, true)}
                      />
                    </Fragment>
                  )
                })}
              </div>
            )}

            {n === 2 && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const payload = readPayload(e)
                  if (!payload) return
                  if (payload.from === 'palette') addBlock(payload.tag, payload.isClose)
                  else if (payload.from === 'workspace') {
                    setWorkspace((w) => {
                      const b = w.find((x) => x.id === payload.id)
                      if (!b) return w
                      return [...w.filter((x) => x.id !== payload.id), b]
                    })
                  }
                }}
                className={cn(
                  'mt-2 flex min-h-[40vh] flex-col gap-2 rounded-3xl border-4 border-dashed border-primary/60 bg-card/60 p-3 md:min-h-[50vh] lg:min-h-[60vh]',
                )}
              >
                {workspace.length === 0 ? (
                  <div className="m-auto flex flex-col items-center gap-3 p-4 text-center">
                    <p className="font-display text-base font-extrabold text-muted-foreground">
                      Drop your blocks here 👇
                    </p>
                    <p className="rounded-2xl bg-sunny/50 p-3 text-sm font-extrabold leading-snug text-sunny-foreground">
                      🤔 Not sure what to do? Read the instructions in column 4 first — they tell you
                      exactly what to build and in what order!
                    </p>
                  </div>
                ) : (
                  <>
                    {rows.map((r) => {
                      const def = getBlockDef(r.tag)
                      const editable = r.kind === 'open' && def?.acceptsText
                      return (
                        <div
                          key={r.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              'application/x-codivo',
                              JSON.stringify({ from: 'workspace', id: r.id }),
                            )
                            e.dataTransfer.effectAllowed = 'move'
                          }}
                          onDragOver={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setHoverId(r.id)
                          }}
                          onDragLeave={() => setHoverId((h) => (h === r.id ? null : h))}
                          onDrop={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const payload = readPayload(e)
                            if (payload?.from === 'palette') {
                              insertAfter(r.id, { id: nextId(), tag: payload.tag, isClose: payload.isClose })
                            } else if (payload?.from === 'workspace' && payload.id !== r.id) {
                              moveAfter(payload.id, r.id)
                            }
                            setHoverId(null)
                          }}
                          style={{ marginLeft: r.depth * 22 }}
                          className={cn(
                            'chunky blockly flex cursor-grab items-center justify-between gap-2 px-3 py-2 font-mono text-sm font-extrabold active:cursor-grabbing',
                            hoverId === r.id && 'ring-4 ring-primary',
                            r.mismatch
                              ? 'border-2 border-destructive bg-destructive/25 text-destructive'
                              : r.kind === 'open'
                                ? 'bg-ocean text-ocean-foreground'
                                : r.kind === 'close'
                                  ? 'bg-space text-space-foreground'
                                  : 'bg-grape text-grape-foreground',
                          )}
                        >
                          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                            <span className="flex items-center gap-2">
                              {r.mismatch && <span aria-hidden>⚠️</span>}
                              <span className="min-w-0 truncate">{r.code}</span>
                            </span>
                            {editable && (
                              <input
                                value={texts[r.id] ?? ''}
                                onChange={(e) =>
                                  setTexts((t) => ({ ...t, [r.id]: e.target.value }))
                                }
                                placeholder="Type anything here…"
                                className="w-full rounded-xl border-2 border-muted bg-white px-2 py-1 font-mono text-xs font-bold text-foreground outline-none focus:border-primary"
                              />
                            )}
                            {def?.attrs && !r.mismatch && (
                              <span className="flex flex-wrap gap-1.5">
                                {def.attrs.map((name) => (
                                  <label
                                    key={name}
                                    className="flex items-center gap-1 rounded-lg bg-white/90 px-1.5 py-0.5 font-mono text-[11px] font-bold text-foreground"
                                  >
                                    <span className="text-muted-foreground">{name}=</span>
                                    <input
                                      value={attrs[r.id]?.[name] ?? ''}
                                      onChange={(e) => setAttr(r.id, name, e.target.value)}
                                      placeholder="…"
                                      className="w-16 bg-transparent outline-none"
                                    />
                                  </label>
                                ))}
                              </span>
                            )}
                          </span>
                          <button
                            type="button"
                            aria-label="Remove block"
                            onClick={() => removeBlock(r.id)}
                            className="grid size-6 shrink-0 place-items-center rounded-full bg-card/80 text-sm font-black text-foreground"
                          >
                            ✕
                          </button>
                        </div>
                      )
                    })}
                    <p className="rounded-2xl bg-card p-2 text-center text-xs font-extrabold">
                      {openCount > 0
                        ? `🔓 ${openCount} tag${openCount > 1 ? 's' : ''} still open — add their closing blocks!`
                        : '✅ All tags closed — great nesting!'}
                    </p>
                    <button
                      type="button"
                      onClick={clearWorkspace}
                      className="mt-auto rounded-2xl bg-candy px-3 py-2 font-display text-sm font-extrabold text-candy-foreground"
                    >
                      🧹 Clear all
                    </button>
                  </>
                )}
              </div>
            )}

            {n === 3 && (
              <div className="mt-2 overflow-hidden rounded-3xl border-4 border-card bg-white shadow-pillow">
                <div className="flex items-center gap-1.5 bg-muted px-3 py-2">
                  <span className="size-3 rounded-full bg-destructive" />
                  <span className="size-3 rounded-full bg-sunny" />
                  <span className="size-3 rounded-full bg-jungle" />
                  <span className="ml-2 font-mono text-xs font-bold text-muted-foreground">
                    my-first-page.html
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
            )}

            {n === 4 && (
              <div className="mt-2 flex flex-col gap-3">
                {topic.note ? (
                  <>
                    <div className="rounded-3xl border-4 border-card bg-card p-3">
                      <p className="font-display text-sm font-extrabold">📖 What is this?</p>
                      <div className="mt-1 flex flex-col gap-2">
                        {topic.note.map((line, i) => (
                          <p key={i} className="text-sm leading-snug text-muted-foreground">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-3xl border-4 border-card bg-card p-3">
                      <p className="font-display text-sm font-extrabold">🛠️ Tags for this mission</p>
                      <div className="mt-1 flex flex-col gap-2.5">
                        {missionTags.map((tag) => {
                          const def = getBlockDef(tag)
                          if (!def) return null
                          return (
                            <div key={tag} className="text-sm leading-snug">
                              <span className="flex flex-wrap items-center gap-1.5">
                                {def.voidElement ? (
                                  <code className="rounded-lg bg-grape/20 px-1.5 py-0.5 font-mono text-xs font-bold text-grape">
                                    {def.syntax}
                                  </code>
                                ) : (
                                  <>
                                    <code className="rounded-lg bg-ocean/20 px-1.5 py-0.5 font-mono text-xs font-bold text-ocean">
                                      {`<${tag}>`}
                                    </code>
                                    <code className="rounded-lg bg-space/20 px-1.5 py-0.5 font-mono text-xs font-bold text-space">
                                      {`</${tag}>`}
                                    </code>
                                  </>
                                )}
                              </span>
                              <p className="mt-1 text-muted-foreground">{def.description}</p>
                              <p className="text-muted-foreground">
                                {def.voidElement
                                  ? 'Self-closing — it needs no closing pair.'
                                  : `</${tag}> closes the ${tag} block.`}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="rounded-3xl border-4 border-sunny bg-sunny/40 p-3">
                      <p className="font-display text-sm font-extrabold">🎯 Your mission</p>
                      <p className="mt-1 font-display text-lg font-extrabold leading-snug text-foreground">
                        {topic.mission}
                      </p>
                      {steps.length > 0 && (
                        <>
                          <p className="mt-2 text-xs font-extrabold text-muted-foreground">
                            Build it step by step:
                          </p>
                          <ul className="mt-1 flex list-none flex-col gap-1.5 p-0">
                            {steps.map((s, i) => {
                              const done = isStepDone(s)
                              const current = i === stepIndex && !allDone
                              return (
                                <li
                                  key={i}
                                  className={cn(
                                    'flex items-start gap-1.5 text-sm leading-snug',
                                    done
                                      ? 'text-muted-foreground line-through opacity-70'
                                      : current
                                        ? 'font-extrabold text-foreground'
                                        : 'text-muted-foreground',
                                  )}
                                >
                                  <span aria-hidden>{done ? '✅' : current ? '⏳' : '⬜'}</span>
                                  <span className="flex flex-col gap-0.5">
                                    <span>{s.text}</span>
                                    {done && s.praise && (
                                      <span className="text-xs font-extrabold text-jungle">{s.praise}</span>
                                    )}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        </>
                      )}
                    </div>
                    <div className="rounded-3xl border-4 border-card bg-card p-3">
                      <p className="font-display text-sm font-extrabold">💡 Pro tips</p>
                      <ul className="mt-1 flex list-none flex-col gap-1.5 p-0">
                        {topic.guide.map((tip, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-sm leading-snug text-muted-foreground">
                            <span aria-hidden>✅</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="rounded-3xl border-4 border-dashed border-card bg-card/60 p-3 text-center">
                    <p className="text-sm font-extrabold">✏️ Notes coming soon!</p>
                  </div>
                )}
              </div>
            )}
          </section>
        ))}
      </div>

      {popupStep && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
          <div className="chunky animate-pop-in w-full max-w-md rounded-4xl border-4 border-card bg-card p-6 text-center shadow-pillow">
            <span className="text-6xl">👉</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold">Next step!</h3>
            <span className="mt-2 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-extrabold">
              Step {popupIndex} of {steps.length}
            </span>
            <p className="mt-3 text-lg leading-snug">{popupStep.text}</p>
            <button
              type="button"
              onClick={dismissPopup}
              className="chunky chunky-press mt-5 rounded-2xl bg-jungle px-6 py-2.5 font-display text-lg font-extrabold text-jungle-foreground"
            >
              Got it, let&apos;s go!
            </button>
          </div>
        </div>
      )}

      {showCompletion && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
          <div className="chunky animate-pop-in w-full max-w-md rounded-4xl border-4 border-card bg-card p-6 text-center shadow-pillow">
            <span className="text-6xl">🎉</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold">You built it!</h3>
            <p className="mt-3 text-lg leading-snug">
              All {steps.length} steps done — your first web page skeleton is complete. Amazing
              work, coder! 🚀
            </p>
            <button
              type="button"
              onClick={dismissPopup}
              className="chunky chunky-press mt-5 rounded-2xl bg-jungle px-6 py-2.5 font-display text-lg font-extrabold text-jungle-foreground"
            >
              Awesome! 🚀
            </button>
          </div>
        </div>
      )}
    </main>
  )
}