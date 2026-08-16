import { Fragment, useMemo } from 'react'
import { cn } from './cn.js'
import { matchTree } from '../data/lessons.js'

const FALLBACK = {
  title: 'My Cool Page',
  h1: 'My Awesome Website',
  h2: 'About Me',
  h3: 'Fun Facts',
  p: 'I am learning to build web pages with Codivo!',
  a: 'Click me!',
  button: 'Go!',
  label: 'Your name',
  input: 'Type here…',
  strong: 'shout',
  em: 'whisper',
}

function fill(node, key, fallback) {
  return node?.fields?.[key]?.trim() || fallback || ''
}

const ghost = 'border-2 border-dashed border-muted/80'
const glow = 'transition-all duration-500'

function Shell({ claimed, pop, className, ghostLabel, children }) {
  return (
    <div
      className={cn(
        glow,
        className,
        pop && 'animate-pop-in',
        claimed ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale',
      )}
    >
      {!claimed && ghostLabel && (
        <p className="mb-1 text-center text-[11px] font-bold opacity-80">{ghostLabel}</p>
      )}
      {children}
    </div>
  )
}

export default function PagePreview({ target, program }) {
  const match = useMemo(() => matchTree(target, program), [target, program])

  const renderNode = (t, parent) => {
    const node = match.get(t.id)
    const claimed = !!node
    const pop = claimed
    const kids = (t.children ?? []).map((c) => (
      <Fragment key={c.id}>{renderNode(c, t.type)}</Fragment>
    ))

    switch (t.type) {
      case 'doctype':
        return claimed ? (
          <p className="animate-pop-in text-center font-mono text-xs font-extrabold text-jungle">
            ✓ &lt;!DOCTYPE html&gt; — ready!
          </p>
        ) : (
          <p className="text-center font-mono text-xs font-extrabold opacity-40">
            🧾 &lt;!DOCTYPE html&gt; — drag it in first!
          </p>
        )
      case 'html':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="🌐 html — every tag lives inside here"
            className={cn(
              'rounded-2xl',
              claimed ? 'border-2 border-muted bg-background' : ghost,
            )}
          >
            {kids}
          </Shell>
        )
      case 'head':
        if (claimed) return null
        return (
          <p className="rounded-xl border-2 border-dashed border-muted/80 p-2 text-center text-[11px] font-bold opacity-40">
            🧠 head — secret page info (invisible)
          </p>
        )
      case 'title':
        return null
      case 'body':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="👀 body — everything you see lives here"
            className={cn('space-y-4', !claimed && cn(ghost, 'p-3'))}
          >
            {claimed && kids.length === 0 && (
              <p className="text-center text-sm font-bold text-muted-foreground">
                ✨ your content will appear here
              </p>
            )}
            {kids}
          </Shell>
        )
      case 'header':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="🎪 header — the top welcome part"
            className={cn('rounded-2xl', claimed ? 'bg-ocean/25 p-3 sm:p-4' : ghost)}
          >
            {kids}
          </Shell>
        )
      case 'nav':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="🧭 nav — the menu of links"
            className={cn('rounded-2xl', claimed ? 'flex flex-wrap items-center gap-2 bg-secondary/50 p-3' : ghost)}
          >
            {claimed && kids.length === 0 && (
              <p className="text-xs font-bold text-muted-foreground">menu — links go here later</p>
            )}
            {kids}
          </Shell>
        )
      case 'main':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="📚 main — the most important content"
            className={cn('space-y-4', !claimed && cn(ghost, 'p-3'))}
          >
            {kids}
          </Shell>
        )
      case 'section':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="📦 section — a box for related ideas"
            className={cn('rounded-2xl space-y-3', claimed ? 'border-2 border-muted bg-card p-3 shadow-sm sm:p-4' : ghost)}
          >
            {kids}
          </Shell>
        )
      case 'article':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="📰 article — one complete story"
            className={cn('rounded-2xl space-y-3', claimed ? 'border-2 border-dashed border-muted bg-card p-3 sm:p-4' : ghost)}
          >
            {kids}
          </Shell>
        )
      case 'footer':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="🦶 footer — the bottom of the page"
            className={cn('rounded-2xl', claimed ? 'bg-foreground p-3 text-card sm:p-4' : ghost)}
          >
            {kids}
          </Shell>
        )
      case 'div':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="🧱 div — a plain grouping box"
            className={cn('rounded-2xl space-y-3', claimed ? 'border-2 border-muted p-3' : ghost)}
          >
            {kids}
          </Shell>
        )
      case 'form':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="📨 form — collects people's answers"
            className={cn('rounded-2xl space-y-3', claimed ? 'border-2 border-muted bg-card p-3 sm:p-4' : ghost)}
          >
            {kids}
          </Shell>
        )
      case 'h1':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            className={cn('rounded-lg font-display text-2xl font-extrabold sm:text-3xl', !claimed && cn(ghost, 'px-2 py-1'))}
          >
            {fill(node, 'content', t.defaults?.content ?? FALLBACK.h1)}
          </Shell>
        )
      case 'h2':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            className={cn('rounded-lg font-display text-xl font-extrabold sm:text-2xl', !claimed && cn(ghost, 'px-2 py-1'))}
          >
            {fill(node, 'content', t.defaults?.content ?? FALLBACK.h2)}
          </Shell>
        )
      case 'p':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            className={cn('rounded-lg text-sm leading-relaxed sm:text-base', !claimed && cn(ghost, 'px-2 py-1'))}
          >
            {fill(node, 'content', t.defaults?.content ?? FALLBACK.p)}
          </Shell>
        )
      case 'a':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="🔗 link — jumps to another page"
            className={cn(
              'inline-block rounded-xl',
              claimed
                ? cn(
                    'px-3 py-1 font-semibold no-underline',
                    parent === 'nav'
                      ? 'rounded-full border border-muted bg-card text-ocean'
                      : 'text-ocean underline',
                  )
                : cn(ghost, 'px-3 py-1'),
            )}
          >
            {fill(node, 'text', t.defaults?.content ?? FALLBACK.a)}
          </Shell>
        )
      case 'img': {
        const hasSrc = claimed && !!node?.fields?.src?.trim()
        return hasSrc ? (
          <img
            src={node.fields.src}
            alt={node.fields.alt || 'picture'}
            className={cn(glow, 'max-h-40 rounded-2xl object-cover', pop && 'animate-pop-in')}
          />
        ) : (
          <Shell
            claimed={claimed}
            pop={pop}
            className={cn('grid place-items-center rounded-2xl', claimed ? 'bg-sunny/40 p-4 sm:p-6' : ghost)}
          >
            <span className="text-4xl sm:text-5xl">🖼️</span>
            {claimed && (
              <span className="mt-1 text-center text-[11px] font-extrabold opacity-80">
                {fill(node, 'src', 'add an image URL!')}
              </span>
            )}
          </Shell>
        )
      }
      case 'button':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            className={cn(
              'inline-block rounded-full px-5 py-2 font-display text-base font-extrabold',
              claimed ? 'bg-primary text-primary-foreground shadow-chunky' : ghost,
            )}
          >
            {fill(node, 'content', FALLBACK.button)}
          </Shell>
        )
      case 'label':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            className={cn('font-display text-sm font-extrabold', !claimed && cn(ghost, 'inline-block rounded-lg px-2 py-0.5'))}
          >
            {fill(node, 'content', FALLBACK.label)}
          </Shell>
        )
      case 'input':
        return (
          <Shell
            claimed={claimed}
            pop={pop}
            ghostLabel="⌨️ input — the box where people type"
            className={cn('rounded-2xl px-4 py-2 text-sm font-bold', claimed ? 'border-2 border-input bg-background' : ghost)}
          >
            {claimed ? fill(node, 'content', 'Type here…') : ''}
          </Shell>
        )
      case 'strong':
        return <strong className={cn(glow, pop && 'animate-pop-in')}>{fill(node, 'content', FALLBACK.strong)}</strong>
      case 'em':
        return <em className={cn(glow, pop && 'animate-pop-in')}>{fill(node, 'content', FALLBACK.em)}</em>
      default:
        return null
    }
  }

  const titleNode = match.get('t-title')
  const pageTitle = titleNode
    ? titleNode.fields?.content?.trim() || FALLBACK.title
    : 'my-page.html'

  return (
    <div className="pillow overflow-hidden rounded-3xl border-4 border-card bg-card">
      <div className="flex items-center gap-2 border-b-4 border-card bg-secondary/60 px-4 py-2.5">
        <span className="size-3 rounded-full bg-destructive" aria-hidden />
        <span className="size-3 rounded-full bg-sunny" aria-hidden />
        <span className="size-3 rounded-full bg-jungle" aria-hidden />
        <span className="ml-2 flex-1 truncate rounded-full bg-card px-4 py-1 font-mono text-xs font-bold text-muted-foreground sm:text-sm">
          🔒 {pageTitle}
        </span>
      </div>
      <div className="max-h-[540px] overflow-auto bg-white p-4 sm:p-6">
        {target.map((t) => (
          <Fragment key={t.id}>{renderNode(t, null)}</Fragment>
        ))}
      </div>
    </div>
  )
}