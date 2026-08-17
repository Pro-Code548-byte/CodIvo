import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Companion from '../components/Companion.jsx'
import { Confetti, KidButton, KidNav } from '../components/kid.jsx'
import { cn } from '../components/cn.js'
import PagePreview from '../components/PagePreview.jsx'
import BlockPalette from '../components/BlockPalette.jsx'
import ProgramEditor from '../components/ProgramEditor.jsx'
import { generateHtml, makeNode } from '../data/program.js'
import { countNodes, lessonById, lessons, matchTree } from '../data/lessons.js'
import { getBlockDef } from '../data/blocks.js'
import { curriculum } from '../data/game.js'

export default function Lesson({ lessonId: propLessonId }) {
  const { lessonId: paramLessonId } = useParams()
  const lesson = lessonById(propLessonId ?? paramLessonId)
  if (!lesson) return <Navigate to="/learn" replace />
  return <LessonBody key={lesson.id} lesson={lesson} />
}

function LessonBody({ lesson }) {
  const [program, setProgram] = useState([])
  const [showCode, setShowCode] = useState(false)

  const claimed = useMemo(() => matchTree(lesson.target, program), [lesson, program])
  const total = useMemo(() => countNodes(lesson.target), [lesson])
  const complete = claimed.size >= total

  const targetById = useMemo(() => {
    const map = {}
    const walk = (nodes) => {
      for (const n of nodes) {
        map[n.id] = n
        if (n.children) walk(n.children)
      }
    }
    walk(lesson.target)
    return map
  }, [lesson])

  const stepIndex = useMemo(() => {
    const i = lesson.steps.findIndex((s) => !s.blocks.every((id) => claimed.has(id)))
    return i === -1 ? lesson.steps.length - 1 : i
  }, [lesson, claimed])
  const allDone = lesson.steps.every((s) => s.blocks.every((id) => claimed.has(id)))

  const nextLesson = lessons.find((l) => l.order === lesson.order + 1)

  const addToRoot = (type) => {
    setProgram((p) => {
      const node = makeNode(type)
      return type === 'doctype' ? [node, ...p] : [...p, node]
    })
  }

  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-6">
      <Confetti active={complete} />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-display text-base font-extrabold text-muted-foreground">
          📚 Curriculum:
        </span>
        {curriculum.map((subject) => (
          <Link
            key={subject.id}
            to={`/subject/${subject.id}`}
            className={cn(
              'chunky chunky-press rounded-full px-3.5 py-1.5 font-display text-sm font-extrabold no-underline sm:text-base',
              subject.themeClass,
            )}
          >
            {subject.emoji} {subject.title}
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <KidNav to="/learn" label="Lessons" />
        <h1 className="font-display text-2xl sm:text-3xl">
          <span className={cn('mr-2 inline-block rounded-3xl px-4 py-1.5', lesson.themeClass)}>
            {lesson.emoji} {lesson.category}
          </span>
          {lesson.title}
        </h1>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'chunky rounded-3xl px-4 py-2 font-display text-base font-extrabold',
              complete ? 'bg-jungle text-jungle-foreground' : 'bg-card text-card-foreground',
            )}
          >
            {complete
              ? '🎉 Page complete!'
              : `Step ${stepIndex + 1} of ${lesson.steps.length}`}
          </span>
          <button
            type="button"
            onClick={() => setShowCode((s) => !s)}
            className={cn(
              'chunky chunky-press rounded-3xl px-4 py-2 font-display text-base font-extrabold',
              showCode ? 'bg-space text-space-foreground' : 'bg-ocean text-ocean-foreground',
            )}
          >
            {showCode ? '🧱 Back to blocks' : '⌨️ See my code'}
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">👀 Live preview</h2>
              <p className="text-sm font-bold text-muted-foreground">
                grey = not built yet · bright = yours!
              </p>
            </div>
            <PagePreview target={lesson.target} program={program} />
            {complete && (
              <div className="pillow animate-pop-in rounded-4xl border-4 border-jungle bg-jungle p-5 text-center">
                <p className="font-display text-xl font-extrabold text-jungle-foreground sm:text-2xl">
                  🎉 You built it! Your page is alive!
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-3">
                  {nextLesson ? (
                    <Link to={`/lesson/${nextLesson.id}`}>
                      <KidButton tone="sunny">
                        Next: {nextLesson.emoji} {nextLesson.title} →
                      </KidButton>
                    </Link>
                  ) : (
                    <Link to="/learn">
                      <KidButton tone="sunny">Back to all lessons 📚</KidButton>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </section>

          <section className="pillow rounded-4xl border-4 border-card bg-card p-5">
            <Companion lines={[lesson.companionLine]} tone="sunny" />
            <h2 className="mt-5 font-display text-2xl sm:text-3xl">
              {lesson.emoji} {lesson.title}
            </h2>
            <ol className="mt-4 flex max-h-[520px] list-none flex-col gap-3 overflow-y-auto p-0 pr-1 sm:max-h-[620px]">
              {lesson.steps.map((step, i) => {
                const done = i < stepIndex || allDone
                const active = i === stepIndex
                return (
                  <li
                    key={step.id}
                    className={cn(
                      'rounded-3xl border-2 p-4 transition-all duration-300',
                      done
                        ? 'border-jungle bg-jungle/15'
                        : active
                          ? 'animate-pop-in border-ring bg-sunny/50'
                          : 'border-muted bg-secondary/30 opacity-60',
                    )}
                  >
<div className="flex flex-wrap items-center gap-3">
                      <span
                        className={cn(
                          'grid size-9 shrink-0 place-items-center rounded-full font-display text-lg font-extrabold',
                          done
                            ? 'bg-jungle text-jungle-foreground'
                            : active
                              ? 'bg-sunny text-sunny-foreground'
                              : 'bg-card text-card-foreground',
                        )}
                      >
                        {done ? '✓' : i + 1}
                      </span>
                      <span className="font-display text-lg font-extrabold sm:text-xl">
                        {step.title}
                      </span>
                      {done && (
                        <span className="ml-auto text-lg" aria-hidden>🎉</span>
                      )}
                    </div>

                    {active && (
                      <div className="mt-3">
                        {step.syntax && (
                          <code className="inline-block rounded-xl bg-card px-3 py-1.5 font-mono text-base font-extrabold">
                            {step.syntax}
                          </code>
                        )}
                        <p className="mt-2 text-lg font-bold leading-relaxed">{step.text}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {step.blocks.map((id) => {
                            const tn = targetById[id]
                            if (!tn) return null
                            const def = getBlockDef(tn.type)
                            const stepDone = claimed.has(id)
                            return (
                              <span
                                key={id}
                                className={cn(
                                  'inline-flex items-center gap-1.5 rounded-2xl px-3 py-1.5 font-display text-sm font-extrabold',
                                  stepDone ? 'bg-jungle text-jungle-foreground' : def.colorClass,
                                )}
                              >
                                <span aria-hidden>{stepDone ? '✓' : '◻'}</span>
                                {def.emoji} {def.name}
                                <code className="font-mono text-xs">{def.syntax}</code>
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {done && (
                      <p className="mt-2 text-sm font-extrabold text-jungle">
                        Step finished — great job!
                      </p>
                    )}
                  </li>
                )
              })}
            </ol>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <section className="pillow rounded-4xl border-4 border-card bg-card p-4">
            <h2 className="mb-1 font-display text-xl sm:text-2xl">🧰 My blocks</h2>
            <p className="mb-3 text-sm font-bold text-muted-foreground">
              Drag a block into the workspace — new blocks unlock in later lessons! 🌱
            </p>
            <BlockPalette unlocked={lesson.toolbox} onDragStart={() => {}} onAdd={addToRoot} />
          </section>

          <section className="flex min-w-0 flex-col gap-4">
            <ProgramEditor program={program} onChange={setProgram} />
            {showCode && (
              <div className="pillow overflow-hidden rounded-4xl border-4 border-card bg-card">
                <h3 className="border-b-4 border-card bg-secondary/60 px-4 py-2 font-display text-lg font-extrabold">
                  ⌨️ Your real code
                </h3>
                <pre className="max-h-72 overflow-auto p-4 font-mono text-sm leading-relaxed">
                  <code>{generateHtml(program) || '<!-- drag some blocks to write real code! -->'}</code>
                </pre>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}