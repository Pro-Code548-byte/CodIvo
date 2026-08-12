import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Companion, { CompanionAvatar } from '../components/Companion.jsx'
import { Confetti, KidButton, KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import { useGame } from '../context/gameContext.js'
import {
  blockTypes,
  challenges,
  getChallenge,
  getChallengesInLand,
  getCompanion,
  getLand,
  getSticker,
  lands,
} from '../data/game.js'

let seq = 0
function newBlockId() {
  seq += 1
  return `b${Date.now()}-${seq}`
}

function makeBlock(type) {
  const def = blockTypes[type]
  return {
    id: newBlockId(),
    type,
    ...(def.hasCount ? { count: 3 } : {}),
    ...(def.hasChildren ? { children: [] } : {}),
  }
}

const rotateClass = ['rotate-0', 'rotate-90', 'rotate-180', '-rotate-90']
const DX = [0, 1, 0, -1]
const DY = [-1, 0, 1, 0]

function simulate(challenge, program) {
  let { x, y, dir } = challenge.start
  const steps = [{ x, y, dir, action: 'start' }]
  let guard = 300
  const blocked = (tx, ty) =>
    tx < 0 || ty < 0 || tx >= challenge.grid.width || ty >= challenge.grid.height ||
    challenge.blocks.some((b) => b.x === tx && b.y === ty)

  const run = (blocks) => {
    for (const block of blocks) {
      if (guard-- <= 0) return
      switch (block.type) {
        case 'move': {
          const nx = x + DX[dir]
          const ny = y + DY[dir]
          if (blocked(nx, ny)) {
            steps.push({ x, y, dir, action: 'bump' })
          } else {
            x = nx
            y = ny
            steps.push({ x, y, dir, action: 'move' })
          }
          break
        }
        case 'turnLeft':
          dir = (dir + 3) % 4
          steps.push({ x, y, dir, action: 'turn' })
          break
        case 'turnRight':
          dir = (dir + 1) % 4
          steps.push({ x, y, dir, action: 'turn' })
          break
        case 'jump':
          steps.push({ x, y, dir, action: 'jump' })
          break
        case 'say':
          steps.push({ x, y, dir, action: 'say', say: 'Hello!' })
          break
        case 'repeat': {
          const count = Math.max(1, Math.min(10, block.count ?? 2))
          for (let i = 0; i < count; i += 1) run(block.children ?? [])
          break
        }
        default:
          break
      }
    }
  }

  run(program)
  return steps
}

function checkResult(challenge, program) {
  const steps = simulate(challenge, program)
  const last = steps[steps.length - 1]
  const atGoal = last.x === challenge.goal.x && last.y === challenge.goal.y
  const bumped = steps.some((s) => s.action === 'bump')
  const jumpedAtGoal = steps.some((s) => s.action === 'jump' && s.x === challenge.goal.x && s.y === challenge.goal.y)

  if (program.length === 0) {
    return { won: false, steps, hint: 'Add some blocks first, then press Play!' }
  }
  if (bumped && !atGoal) {
    return { won: false, steps, hint: 'Oops, we bumped into something! Try turning first.' }
  }
  if (atGoal) {
    if (challenge.needsJumpAtGoal && !jumpedAtGoal) {
      return { won: false, steps, hint: 'You made it! Now add a jump block at the end.' }
    }
    return { won: true, steps, hint: 'Hooray! You did it!' }
  }
  return { won: false, steps, hint: 'So close! Do we need more walk blocks, or a turn?' }
}

function codeGen(blocks, indent = '') {
  return blocks
    .map((block) => {
      if (block.type === 'repeat') {
        const inner = codeGen(block.children ?? [], `${indent}  `)
        return `${indent}repeat ${block.count ?? 2} times {\n${inner || `${indent}  `}\n${indent}}`
      }
      const calls = {
        move: 'walk()',
        turnLeft: 'turnLeft()',
        turnRight: 'turnRight()',
        jump: 'jump()',
        say: 'say("Hello!")',
      }
      return `${indent}${calls[block.type] ?? block.type}`
    })
    .join('\n')
}

function Board({ challenge, steps, playing, onFinished }) {
  const { profile } = useGame()
  const avatar = profile?.avatar ?? 'ðŸ¦Š'
  const [stepIndex, setStepIndex] = useState(0)

useEffect(() => {
    if (!playing || !steps) return undefined
    // eslint-disable-next-line react-hooks/set-state-in-effect -- legacy pattern: reset playback step on replay
    setStepIndex(0)
    let index = 0
    const id = window.setInterval(() => {
      index += 1
      if (index >= steps.length) {
        window.clearInterval(id)
        onFinished()
        return
      }
      setStepIndex(index)
    }, 520)
    return () => window.clearInterval(id)
  }, [playing, steps, onFinished])

  const current = steps?.[stepIndex] ?? { ...challenge.start, action: 'start' }
  const cells = []
  for (let y = 0; y < challenge.grid.height; y += 1) {
    for (let x = 0; x < challenge.grid.width; x += 1) {
      const isRock = challenge.blocks.some((b) => b.x === x && b.y === y)
      const isGoal = challenge.goal.x === x && challenge.goal.y === y
      const isPlayer = current.x === x && current.y === y
      cells.push(
        <div
          key={`${x}-${y}`}
          className={cn(
            'relative flex aspect-square items-center justify-center rounded-2xl text-3xl sm:text-4xl',
            isRock ? 'bg-muted-foreground/40' : 'bg-card/70',
          )}
        >
          {isRock && (
            <span aria-hidden>ðŸª¨</span>
          )}
          {isGoal && (
            <span aria-hidden className="animate-sparkle">
              {challenge.goal.emoji}
            </span>
          )}
          {isPlayer && (
            <span
              aria-label="you"
              className={cn(
                'absolute inline-block transition-transform duration-300',
                rotateClass[current.dir],
                current.action === 'jump' && '-translate-y-3 scale-125',
                current.action === 'bump' && 'animate-wiggle',
              )}
            >
              {avatar}
            </span>
          )}
          {isPlayer && current.action === 'say' && (
            <span className="pillow absolute -top-4 rounded-full bg-card px-3 py-1 text-sm font-bold">
              {current.say}
            </span>
          )}
        </div>,
      )
    }
  }

  return (
    <div className="pillow rounded-4xl border-4 border-card bg-secondary/50 p-3">
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${challenge.grid.width}, minmax(0, 1fr))` }}
      >
        {cells}
      </div>
    </div>
  )
}

function BlockRow({ block, index, onRemove, onCount, isTarget, onTarget }) {
  const def = blockTypes[block.type]
  return (
    <div className={cn('rounded-3xl p-3 font-display text-xl font-extrabold', def.colorClass, isTarget && 'ring-4 ring-ring')}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-card/60 text-base text-card-foreground">
          {index}
        </span>
        <span aria-hidden className="text-2xl">
          {def.emoji}
        </span>
        <span>{def.label}</span>
        {def.hasCount && (
          <span className="flex items-center gap-2">
            <button
              type="button"
              aria-label="fewer times"
              onClick={() => onCount(block.id, Math.max(1, (block.count ?? 2) - 1))}
              className="size-9 rounded-full bg-card text-card-foreground"
            >
              âˆ’
            </button>
            <span className="min-w-8 text-center">{block.count ?? 2}Ã—</span>
            <button
              type="button"
              aria-label="more times"
              onClick={() => onCount(block.id, Math.min(10, (block.count ?? 2) + 1))}
              className="size-9 rounded-full bg-card text-card-foreground"
            >
              +
            </button>
          </span>
        )}
        <span className="ml-auto flex gap-2">
          {def.hasChildren && (
            <button
              type="button"
              onClick={onTarget}
              className="rounded-full bg-card px-4 py-2 text-base text-card-foreground"
            >
              {isTarget ? 'âœ… Adding here' : 'âž• Add inside'}
            </button>
          )}
          <button
            type="button"
            aria-label="remove block"
            onClick={() => onRemove(block.id)}
            className="size-9 rounded-full bg-card text-base text-card-foreground"
          >
            âœ•
          </button>
        </span>
      </div>
      {def.hasChildren && (
        <ul className="mt-3 ml-6 flex list-none flex-col gap-2 border-l-4 border-card/70 pl-3">
          {(block.children ?? []).length === 0 ? (
            <li className="text-base font-bold opacity-80">Put blocks in here!</li>
          ) : (
            (block.children ?? []).map((child, i) => {
              const childDef = blockTypes[child.type]
              return (
                <li key={child.id} className={cn('flex items-center gap-3 rounded-2xl p-2 text-lg', childDef.colorClass)}>
                  <span aria-hidden>{childDef.emoji}</span>
                  <span>{childDef.label}</span>
                  <span className="ml-auto opacity-70">#{i + 1}</span>
                  <button
                    type="button"
                    aria-label="remove block"
                    onClick={() => onRemove(child.id)}
                    className="size-8 rounded-full bg-card text-base text-card-foreground"
                  >
                    âœ•
                  </button>
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}

function BlocksPanel({ palette, program, onChange, onRun, onReset, running, typedMode }) {
  const [target, setTarget] = useState(null)

  const add = (type) => {
    const block = makeBlock(type)
    if (target && type !== 'repeat') {
      onChange(program.map((b) => (b.id === target ? { ...b, children: [...(b.children ?? []), block] } : b)))
      return
    }
    onChange([...program, block])
    if (type === 'repeat') setTarget(block.id)
  }

  const remove = (id) => {
    setTarget((t) => (t === id ? null : t))
    onChange(
      program
        .filter((b) => b.id !== id)
        .map((b) => (b.children ? { ...b, children: b.children.filter((c) => c.id !== id) } : b)),
    )
  }

  const setCount = (id, count) => {
    onChange(program.map((b) => (b.id === id ? { ...b, count } : b)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="pillow rounded-4xl border-4 border-card bg-card p-4">
        <h3 className="mb-3 text-xl font-extrabold">Blocks 🧱 — tap to add</h3>
        <div className="flex flex-wrap gap-3">
          {palette.map((type) => {
            const def = blockTypes[type]
            return (
              <button
                key={type}
                type="button"
                onClick={() => add(type)}
                className={cn(
                  'chunky chunky-press rounded-3xl px-4 py-3 font-display text-lg font-extrabold',
                  def.colorClass,
                )}
              >
                <span aria-hidden className="mr-2 text-2xl">
                  {def.emoji}
                </span>
                {def.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="pillow min-h-40 rounded-4xl border-4 border-dashed border-card bg-card/70 p-4">
        <h3 className="mb-3 text-xl font-extrabold">
          My code{' '}
          {typedMode && <span className="text-base opacity-70">(you can read it below!)</span>}
        </h3>
        {program.length === 0 ? (
          <p className="text-lg text-muted-foreground">Tap a block above to start! ðŸ‘†</p>
        ) : (
          <ol className="flex list-none flex-col gap-2 p-0">
            {program.map((block, i) => (
              <li key={block.id}>
                <BlockRow
                  block={block}
                  index={i + 1}
                  onRemove={remove}
                  onCount={setCount}
                  isTarget={target === block.id}
                  onTarget={() => setTarget((t) => (t === block.id ? null : block.id))}
                />
              </li>
            ))}
          </ol>
        )}
        {typedMode && program.length > 0 && (
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-secondary/60 p-4 font-mono text-lg leading-relaxed">
            <code>{codeGen(program)}</code>
          </pre>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <KidButton tone="jungle" onClick={onRun} disabled={running}>
          â–¶ï¸ Play
        </KidButton>
        <KidButton tone="muted" onClick={onReset}>
          ðŸ”„ Start over
        </KidButton>
      </div>
    </div>
  )
}

export default function Challenge() {
  const { challengeId } = useParams()
  const navigate = useNavigate()
  const challenge = getChallenge(challengeId)
  const land = challenge ? getLand(challenge.landId) : null
  const { profile, completeChallenge } = useGame()
  const buddy = getCompanion(profile?.companionId)

  const [program, setProgram] = useState([])
  const [steps, setSteps] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [typedMode, setTypedMode] = useState(false)
  const [hint, setHint] = useState(null)
  const [won, setWon] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const [newLandComplete, setNewLandComplete] = useState(false)

  const nextChallenge = useMemo(() => {
    if (!challenge) return null
    const list = getChallengesInLand(challenge.landId)
    const index = list.findIndex((c) => c.id === challenge.id)
    if (list[index + 1]) return list[index + 1]
    const nextLand = lands.find((l) => l.order === land.order + 1)
    if (!nextLand) return null
    return challenges.find((c) => c.landId === nextLand.id && c.id.endsWith('1'))
  }, [challenge, land])

  const sticker = challenge ? getSticker(challenge.stickerId) : null
  const [collectedSticker, setCollectedSticker] = useState(false)

  if (!challenge || !land) return <Navigate to="/map" replace />

  const run = () => {
    const result = checkResult(challenge, program)
    setSteps(result.steps)
    setPlaying(true)
    setHint(null)
    setWon(result.won)
  }

  const finish = () => {
    setPlaying(false)
    if (won) {
      const result = completeChallenge(challenge.id)
      setNewLandComplete(result.newLandComplete)
      setCollectedSticker(!profile?.stickerIds.includes(challenge.stickerId))
      setCelebrate(true)
    } else {
      const result = checkResult(challenge, program)
      setHint(result.hint)
    }
  }

  const reset = () => {
    setProgram([])
    setSteps(null)
    setPlaying(false)
    setHint(null)
    setWon(false)
  }

  if (celebrate) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
        <Confetti active />
        <h1 className="animate-bounce-in font-display text-5xl font-extrabold">You did it! ðŸŽ‰</h1>
        <CompanionAvatar size="lg" />
        <p className="text-2xl">{buddy.cheer}</p>
        {sticker && collectedSticker && (
          <div className="pillow animate-pop rounded-4xl border-4 border-card bg-card p-6">
            <p className="text-lg font-bold">New sticker!</p>
            <p className="text-7xl">{sticker.emoji}</p>
            <p className="font-display text-2xl">{sticker.name}</p>
          </div>
        )}
        {newLandComplete && (
          <p className="rounded-3xl bg-sunny px-5 py-3 font-display text-2xl text-sunny-foreground">
            ðŸŽ“ You finished {land.name}! A new land is open!
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          {nextChallenge && (
            <KidButton
              tone="jungle"
              onClick={() => {
                setCelebrate(false)
                reset()
                navigate(`/challenge/${nextChallenge.id}`)
              }}
            >
              âž¡ï¸ Next game
            </KidButton>
          )}
          <Link to="/map">
            <KidButton tone="muted">ðŸ—ºï¸ Back to map</KidButton>
          </Link>
          <Link to="/trophies">
            <KidButton tone="sunny">ðŸ† My stickers</KidButton>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <KidNav />
<h1 className="font-display text-3xl sm:text-4xl">
          {land.emoji} {challenge.title} 🎯
        </h1>
        <button
          type="button"
          onClick={() => setTypedMode((t) => !t)}
          className="chunky chunky-press rounded-3xl bg-ocean px-5 py-3 font-display text-lg text-ocean-foreground"
        >
          {typedMode ? 'ðŸ”† Blocks only' : 'âŒ¨ï¸ Show typing mode'}
        </button>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Companion
            lines={hint ? [hint] : [challenge.kidPrompt, 'What do you think happens if we change this number?', 'Tap Play to see what your blocks do!']}
            tone={hint ? 'sunny' : 'card'}
          />
          <Board challenge={challenge} steps={steps} playing={playing} onFinished={finish} />
          <p className="text-center text-lg text-muted-foreground">
            {profile?.avatar ?? 'ðŸ¦Š'} is you. Get to {challenge.goal.emoji}!
          </p>
        </div>
        <BlocksPanel
          palette={challenge.palette}
          program={program}
          onChange={setProgram}
          onRun={run}
          onReset={reset}
          running={playing}
          typedMode={typedMode}
        />
      </div>
    </main>
  )
}
