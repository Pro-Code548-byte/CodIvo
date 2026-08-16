import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { PaintPart, PartBuilder, RoomChips, Wireframe } from '../components/DuelBuild.jsx'
import { Confetti, KidButton, KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'
import { buildHtml, buildRows, nextId } from '../data/blockKit.js'
import { cssPartHtml, duelProjects, mergeDoc } from '../data/duelProjects.js'

const makeCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let c = ''
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)]
  return c
}

export default function Duel() {
  const { profile } = useGame()
  const [myId] = useState(() => `p${Math.random().toString(36).slice(2, 9)}`)
  const [role, setRole] = useState(null)
  const [code, setCode] = useState('')
  const [state, setState] = useState(null)
  const [joinCode, setJoinCode] = useState('')
  const [joinError, setJoinError] = useState('')
  const [myBuilds, setMyBuilds] = useState({})
  const [myCss, setMyCss] = useState({})
  const [mergedHtml, setMergedHtml] = useState('')
  const channelRef = useRef(null)
  const stateRef = useRef(null)
  const roleRef = useRef(null)
  const myBuildsRef = useRef({})
  const myCssRef = useRef({})

  useEffect(() => {
    stateRef.current = state
  }, [state])
  useEffect(() => {
    roleRef.current = role
  }, [role])
  useEffect(() => {
    myBuildsRef.current = myBuilds
  }, [myBuilds])
  useEffect(() => {
    myCssRef.current = myCss
  }, [myCss])

  const playerInfo = useMemo(
    () => ({ id: myId, name: profile?.name || 'You', avatar: profile?.avatar || '🦊' }),
    [myId, profile],
  )

  const hostSet = useCallback((updater) => setState((s) => (typeof updater === 'function' ? updater(s) : updater)), [])

  const htmlForPart = useCallback((partId) => {
    const cur = myBuildsRef.current[partId]
    if (!cur?.blocks?.length) return ''
    const { rows } = buildRows(cur.blocks)
    return buildHtml(rows, cur.texts, cur.attrs)
  }, [])

  const doMerge = useCallback(() => {
    const s = stateRef.current
    if (!s?.subject || !s?.project) return
    const project = duelProjects[s.subject].find((p) => p.id === s.project)
    if (!project) return
    const partHtmls = project.parts.map((part) => {
      let owner = null
      for (const [pid, ids] of Object.entries(s.parts)) {
        if (ids.includes(part.id)) {
          owner = pid
          break
        }
      }
      if (!owner) return ''
      const build =
        owner === myId
          ? s.subject === 'html'
            ? { html: htmlForPart(part.id) }
            : myCssRef.current[part.id]
          : s.builds[owner]?.[part.id]
      if (!build) return ''
      return s.subject === 'html' ? (build.html ?? '') : cssPartHtml(part, build)
    })
    const doc = mergeDoc(project, s.subject, partHtmls)
    setMergedHtml(doc)
    if (roleRef.current === 'host') {
      hostSet((st) => ({ ...st, status: 'merged', mergedHtml: doc }))
    } else {
      channelRef.current?.postMessage({ type: 'merge' })
    }
  }, [myId, hostSet, htmlForPart])

  const doMergeRef = useRef(null)
  useEffect(() => {
    doMergeRef.current = doMerge
  }, [doMerge])

  const handleAction = useCallback(
    (m) => {
      if (m.type === 'join') {
        hostSet((s) => (s.players.some((p) => p.id === m.player.id) ? s : { ...s, players: [...s.players, m.player] }))
      } else if (m.type === 'claim') {
        hostSet((s) => ({ ...s, parts: { ...s.parts, [m.playerId]: m.partIds } }))
      } else if (m.type === 'ready') {
        hostSet((s) => {
          const ready = { ...s.ready, [m.playerId]: true }
          return { ...s, ready, status: s.players.every((p) => ready[p.id]) ? 'building' : s.status }
        })
      } else if (m.type === 'build') {
        hostSet((s) => ({ ...s, builds: { ...s.builds, [m.playerId]: m.builds } }))
      } else if (m.type === 'again') {
        hostSet((s) => ({ ...s, status: 'picking', ready: {}, parts: {}, builds: {}, mergedHtml: '' }))
      } else if (m.type === 'merge') {
        doMergeRef.current?.()
      }
    },
    [hostSet],
  )

  useEffect(() => {
    const ch = channelRef.current
    if (!ch) return undefined
    const onMsg = (e) => {
      const m = e.data
      if (!m || typeof m !== 'object') return
      if (m.type === 'sync') {
        setState(m.state)
        if (m.state.status === 'merged') setMergedHtml(m.state.mergedHtml)
      } else if (m.type === 'close') {
        setState(null)
      } else if (roleRef.current === 'host') {
        handleAction(m)
      }
    }
    ch.addEventListener('message', onMsg)
    return () => ch.removeEventListener('message', onMsg)
     
  }, [code, handleAction])

  useEffect(() => {
    if (role !== 'host' || !channelRef.current || !state) return undefined
    const id = window.setTimeout(() => {
      channelRef.current?.postMessage({ type: 'sync', state })
    }, 150)
    return () => window.clearTimeout(id)
     
  }, [state, role])

  useEffect(() => {
    if (role !== 'guest' || !channelRef.current || state?.status !== 'building') return undefined
    const payload = state.subject === 'html' ? myBuilds : myCss
    const id = window.setTimeout(() => {
      channelRef.current?.postMessage({ type: 'build', playerId: myId, builds: payload })
    }, 400)
    return () => window.clearTimeout(id)
     
  }, [myBuilds, myCss, role, myId, state?.status, state?.subject])

  const create = () => {
    const c = makeCode()
    setCode(c)
    setRole('host')
    channelRef.current?.close()
    const ch = new BroadcastChannel(`codivo-duel-${c}`)
    channelRef.current = ch
    setState({
      status: 'waiting',
      code: c,
      subject: null,
      project: null,
      players: [{ ...playerInfo, role: 'host' }],
      parts: {},
      ready: {},
      builds: {},
      mergedHtml: '',
    })
  }

  const join = () => {
    const c = joinCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (c.length !== 4) {
      setJoinError('Enter the 4-letter code from your friend!')
      return
    }
    setJoinError('')
    setCode(c)
    setRole('guest')
    channelRef.current?.close()
    const ch = new BroadcastChannel(`codivo-duel-${c}`)
    channelRef.current = ch
    setState({
      status: 'waiting',
      code: c,
      subject: null,
      project: null,
      players: [{ ...playerInfo, role: 'guest' }],
      parts: {},
      ready: {},
      builds: {},
      mergedHtml: '',
    })
    ch.postMessage({ type: 'join', player: { ...playerInfo, role: 'guest' } })
  }

  const leave = () => {
    if (role === 'host') channelRef.current?.postMessage({ type: 'close' })
    channelRef.current?.close()
    channelRef.current = null
    setRole(null)
    setCode('')
    setState(null)
    setMergedHtml('')
    setMyBuilds({})
    setMyCss({})
  }

  const copyCode = () => {
    navigator.clipboard?.writeText(state?.code ?? '')
  }

  const pickSubject = (id) => hostSet((s) => ({ ...s, subject: id, project: null }))

  const pickProject = (id) =>
    hostSet((s) => ({ ...s, project: id, status: 'picking', ready: {}, parts: {}, builds: {} }))

  const togglePart = (partId) => {
    if (!state) return
    const mine = state.parts[myId] ?? []
    const next = mine.includes(partId) ? mine.filter((x) => x !== partId) : [...mine, partId]
    if (role === 'host') hostSet((s) => ({ ...s, parts: { ...s.parts, [myId]: next } }))
    else channelRef.current?.postMessage({ type: 'claim', playerId: myId, partIds: next })
  }

  const markReady = () => {
    if (role === 'host') {
      hostSet((s) => {
        const ready = { ...s.ready, [myId]: true }
        return { ...s, ready, status: s.players.every((p) => ready[p.id]) ? 'building' : s.status }
      })
    } else {
      channelRef.current?.postMessage({ type: 'ready', playerId: myId })
    }
  }

  const playAgain = () => {
    setMyBuilds({})
    setMyCss({})
    setMergedHtml('')
    if (role === 'host') hostSet((s) => ({ ...s, status: 'picking', ready: {}, parts: {}, builds: {}, mergedHtml: '' }))
    else channelRef.current?.postMessage({ type: 'again' })
  }

  const addBlock = (partId, tag, isClose) =>
    setMyBuilds((b) => {
      const cur = b[partId] ?? { blocks: [], texts: {}, attrs: {} }
      return { ...b, [partId]: { ...cur, blocks: [...cur.blocks, { id: nextId(), tag, isClose }] } }
    })

  const removeBlock = (partId, id) =>
    setMyBuilds((b) => {
      const cur = b[partId] ?? { blocks: [], texts: {}, attrs: {} }
      const blocks = cur.blocks.filter((x) => x.id !== id)
      const texts = {}
      for (const [k, v] of Object.entries(cur.texts)) if (k !== id) texts[k] = v
      const attrs = {}
      for (const [k, v] of Object.entries(cur.attrs)) if (k !== id) attrs[k] = v
      return { ...b, [partId]: { blocks, texts, attrs } }
    })

  const setText = (partId, id, v) =>
    setMyBuilds((b) => {
      const cur = b[partId] ?? { blocks: [], texts: {}, attrs: {} }
      return { ...b, [partId]: { ...cur, texts: { ...cur.texts, [id]: v } } }
    })

  const setAttr = (partId, id, name, v) =>
    setMyBuilds((b) => {
      const cur = b[partId] ?? { blocks: [], texts: {}, attrs: {} }
      return {
        ...b,
        [partId]: { ...cur, attrs: { ...cur.attrs, [id]: { ...(cur.attrs[id] ?? {}), [name]: v } } },
      }
    })

  const clearPart = (partId) => setMyBuilds((b) => ({ ...b, [partId]: { blocks: [], texts: {}, attrs: {} } }))

  const setCss = (partId, patch) => setMyCss((c) => ({ ...c, [partId]: { ...(c[partId] ?? {}), ...patch } }))

  const project =
    state?.subject && state?.project ? duelProjects[state.subject].find((p) => p.id === state.project) : null
  const myParts = state?.parts[myId] ?? []
  const covered = project
    ? project.parts.every((p) => Object.values(state.parts).some((ids) => ids.includes(p.id)))
    : false
  const everyoneHas = state ? state.players.every((p) => (state.parts[p.id] ?? []).length > 0) : false
  const allReady = state ? state.players.every((p) => state.ready[p.id]) : false

  const companionLines = !state
    ? ['Build a webpage with a friend! One of you creates the room, the other joins with the secret code.']
    : state.status === 'merged'
      ? ['You did it! Your two pages became one. Look at your masterpiece! 🎉']
      : state.status === 'building'
        ? ['Build your parts with blocks. When you are done, press Merge!']
        : state.status === 'picking'
          ? ['Look at the picture — then choose which parts YOU will build!']
          : ['Make a room, share the code, then pick the subject!']

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <Confetti active={state?.status === 'merged'} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav />
        <h1 className="font-display text-3xl sm:text-4xl">Duel ⚔️</h1>
      </div>

      <div className="mt-6">
        <Companion lines={companionLines} tone={state?.status === 'merged' ? 'sunny' : 'card'} />
      </div>

      {!state && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={create}
            className="chunky chunky-press rounded-4xl bg-jungle p-6 text-left text-jungle-foreground"
          >
            <span className="text-4xl">🛠️</span>
            <span className="mt-2 block font-display text-2xl">Create a game</span>
            <span className="mt-1 block text-sm font-bold opacity-80">
              You get a secret code — your friend joins with it.
            </span>
          </button>
          <div className="rounded-4xl bg-card p-6">
            <span className="text-4xl">🔑</span>
            <span className="mt-2 block font-display text-2xl">Join with a code</span>
            <div className="mt-3 flex gap-2">
              <input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="CODE"
                maxLength={4}
                className="w-28 rounded-2xl border-4 border-muted bg-white px-3 py-2 text-center font-mono text-xl font-extrabold tracking-[0.3em]"
              />
              <KidButton tone="candy" onClick={join}>
                Join
              </KidButton>
            </div>
            {joinError && <p className="mt-2 text-sm font-bold text-red-500">{joinError}</p>}
          </div>
        </div>
      )}

      {state && (
        <div className="mt-6 rounded-4xl bg-card p-4 text-center">
          <p className="font-display text-lg text-muted-foreground">
            {role === 'host' ? 'Share this code with your friend!' : 'You are in the room!'}
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="rounded-3xl border-4 border-dashed border-ocean bg-white px-6 py-3 font-mono text-4xl font-extrabold tracking-[0.4em]">
              {state.code}
            </span>
            <KidButton tone="sunny" onClick={copyCode}>
              📋 Copy
            </KidButton>
          </div>
          <div className="mt-3">
            <RoomChips players={state.players} ready={state.ready} myId={myId} />
          </div>
          {role === 'host' && state.players.length < 2 && (
            <p className="mt-3 text-sm font-bold text-muted-foreground">⏳ Waiting for a friend… (you can play solo!)</p>
          )}
        </div>
      )}

      {state && state.status !== 'merged' && !state.subject && (
        <div className="mt-6">
          {role === 'host' ? (
            <>
              <h2 className="font-display text-2xl">1. Pick a subject 👇</h2>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {[
                  ['html', '🧱', 'HTML', 'Build the page with blocks!'],
                  ['css', '🎨', 'CSS', 'Paint the page with colors!'],
                ].map(([id, e, name, desc]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => pickSubject(id)}
                    className="chunky chunky-press rounded-4xl bg-card p-5 text-left"
                  >
                    <span className="text-3xl">{e}</span>
                    <span className="mt-1 block font-display text-xl">{name}</span>
                    <span className="block text-sm font-bold text-muted-foreground">{desc}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-4xl bg-card p-6 text-center">
              <p className="font-display text-xl">⏳ Waiting for the host to pick a subject…</p>
            </div>
          )}
        </div>
      )}

      {state && state.status !== 'merged' && state.subject && !state.project && (
        <div className="mt-6">
          {role === 'host' ? (
            <>
              <h2 className="font-display text-2xl">2. Pick a project 🖼️</h2>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {duelProjects[state.subject].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => pickProject(p.id)}
                    className="chunky chunky-press rounded-4xl bg-card p-5 text-left"
                  >
                    <span className="text-3xl">{p.emoji}</span>
                    <span className="mt-1 block font-display text-xl">{p.title}</span>
                    <span className="block text-sm font-bold text-muted-foreground">{p.text}</span>
                    <span className="mt-2 flex flex-wrap gap-1">
                      {p.parts.map((part) => (
                        <span key={part.id} className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold">
                          {part.emoji} {part.name}
                        </span>
                      ))}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-4xl bg-card p-6 text-center">
              <p className="font-display text-xl">⏳ Waiting for the host to pick a project…</p>
            </div>
          )}
        </div>
      )}

      {state && project && (state.status === 'picking' || !everyoneHas) && (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">🎯 The picture to build</h2>
            <p className="text-sm font-bold text-muted-foreground">
              {project.emoji} {project.text}
            </p>
            <div className="mt-2">
              <Wireframe project={project} parts={state.parts} myId={myId} players={state.players} />
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl">3. Choose your parts 🙋</h2>
            <p className="text-sm font-bold text-muted-foreground">Tap the parts you want to build. Everyone needs at least one!</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {project.parts.map((part) => {
                const mine = myParts.includes(part.id)
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => togglePart(part.id)}
                    className={cn(
                      'chunky chunky-press rounded-3xl bg-card p-3 text-left',
                      mine && 'bg-ocean text-ocean-foreground ring-4 ring-ring',
                    )}
                  >
                    <span className="font-display text-lg">
                      {part.emoji} {part.name}
                    </span>
                    <span className="block text-xs font-bold text-muted-foreground">
                      {mine ? '👉 You build this!' : 'Tap to build'}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="mt-3 rounded-3xl bg-secondary/70 p-3 text-sm font-bold">
              {covered && everyoneHas
                ? '🎉 Every part has a builder — ready to build!'
                : `Pick parts so every section has a builder (${new Set(Object.values(state.parts).flat()).size}/${project.parts.length}).`}
            </div>
            <KidButton tone="jungle" className="mt-3 w-full" disabled={!covered || !everyoneHas} onClick={markReady}>
              {allReady ? '⏳ Waiting for the others…' : "✅ I'm ready to build!"}
            </KidButton>
          </div>
        </div>
      )}

      {state && state.status === 'building' && project && (
        <div className="mt-6">
          <RoomChips players={state.players} ready={state.ready} myId={myId} />
          <p className="mt-3 text-center font-display text-xl">
            {project.emoji} {project.title} — you build {myParts.map((id) => project.parts.find((p) => p.id === id)?.emoji).join(' ')}
          </p>
          {state.subject === 'html' &&
            myParts.map((partId) => {
              const part = project.parts.find((p) => p.id === partId)
              if (!part) return null
              const value = myBuilds[partId] ?? { blocks: [], texts: {}, attrs: {} }
              return (
                <div key={partId} className="mt-3">
                  <PartBuilder
                    part={part}
                    value={value}
                    onAdd={(tag, isClose) => addBlock(partId, tag, isClose)}
                    onRemove={(id) => removeBlock(partId, id)}
                    onText={(id, v) => setText(partId, id, v)}
                    onAttr={(id, name, v) => setAttr(partId, id, name, v)}
                    onClear={() => clearPart(partId)}
                  />
                </div>
              )
            })}
          {state.subject === 'css' &&
            myParts.map((partId) => {
              const part = project.parts.find((p) => p.id === partId)
              if (!part) return null
              return (
                <div key={partId} className="mt-3">
                  <PaintPart part={part} build={myCss[partId]} onChange={(patch) => setCss(partId, patch)} />
                </div>
              )
            })}
          <div className="mt-4 rounded-4xl bg-card p-4 text-center">
            <p className="font-display text-xl">Done building? Press merge — together you make the page! 🧩</p>
            <KidButton tone="candy" className="mt-2" onClick={doMerge}>
              🧩 Merge & see our page!
            </KidButton>
          </div>
        </div>
      )}

      {state && state.status === 'merged' && (
        <div className="mt-6 rounded-4xl bg-card p-4">
          <h2 className="text-center font-display text-3xl">🎉 Your page is merged!</h2>
          <iframe
            title="Merged page"
            srcDoc={mergedHtml}
            sandbox="allow-popups"
            className="mt-3 min-h-[50vh] w-full rounded-3xl bg-white"
          />
        </div>
      )}

      {state && state.status === 'merged' && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <KidButton tone="jungle" onClick={playAgain}>
            🔄 Build another page
          </KidButton>
          <KidButton tone="muted" onClick={leave}>
            🚪 Leave the room
          </KidButton>
          <Link to="/learn">
            <KidButton tone="muted">🗺️ Back to map</KidButton>
          </Link>
        </div>
      )}
    </main>
  )
}