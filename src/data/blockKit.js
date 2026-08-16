import { getBlockDef } from './blocks.js'

export const nextId = () => `b${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export function codeFor(tag, isClose, def) {
  if (isClose) return `</${tag}>`
  if (def?.voidElement) return def.syntax
  return `<${tag}>`
}

export function buildRows(blocks) {
  const rows = []
  const stack = []
  for (const b of blocks) {
    const def = getBlockDef(b.tag)
    if (b.isClose) {
      const top = stack[stack.length - 1]
      if (top && top.tag === b.tag) {
        rows.push({ ...b, depth: top.depth, kind: 'close', code: codeFor(b.tag, true, def) })
        stack.pop()
      } else {
        rows.push({ ...b, depth: 0, kind: 'close', mismatch: true, code: codeFor(b.tag, true, def) })
      }
      continue
    }
    if (def?.voidElement) {
      rows.push({ ...b, depth: stack.length, kind: 'void', code: def.syntax })
      continue
    }
    rows.push({ ...b, depth: stack.length, kind: 'open', code: codeFor(b.tag, false, def) })
    stack.push({ tag: b.tag, depth: stack.length, color: def?.colorClass ?? 'bg-foreground/20' })
  }
  return { rows, openCount: stack.length }
}

export function buildHtml(rows, texts = {}, attrs = {}) {
  const attrStr = (id) => {
    const a = attrs[id]
    if (!a) return ''
    return Object.entries(a)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => `${k}="${v.replace(/"/g, '&quot;')}"`)
      .join(' ')
  }
  const openCode = (r) => {
    const s = attrStr(r.id)
    return s ? `<${r.tag} ${s}>` : r.code
  }
  const lines = []
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    const indent = '  '.repeat(r.depth)
    if (r.kind === 'void') {
      lines.push(indent + openCode(r))
    } else if (r.kind === 'open') {
      const next = rows[i + 1]
      if (next && next.kind === 'close' && !next.mismatch && next.tag === r.tag) {
        const content = (texts[r.id] ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        lines.push(indent + openCode(r) + content + next.code)
        i++
      } else {
        lines.push(indent + openCode(r))
      }
    } else {
      lines.push(indent + r.code)
    }
  }
  return lines.join('\n')
}

export const readPayload = (e) => {
  try {
    return JSON.parse(e.dataTransfer.getData('application/x-codivo'))
  } catch {
    return null
  }
}

export const PREVIEW_STYLE = `<style>body{font-family:system-ui,sans-serif;margin:0;padding:16px;color:#222}img{min-width:48px;min-height:48px;max-width:100%;border-radius:8px;background:#eef2ff;object-fit:cover}a{color:#2563eb;text-decoration:underline;cursor:pointer}textarea,input,button,select,option{font:inherit;padding:4px 8px;border:2px solid #cbd5e1;border-radius:8px}</style>`

export const PREVIEW_SCRIPT = `<script>document.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;var h=a.getAttribute('href')||'';if(h.indexOf('#')===0)return;e.preventDefault();window.open(h,'_blank','noopener');});</script>`

export function wrapDoc(fragment) {
  if (!fragment.trim()) return ''
  return `<!DOCTYPE html><html><head>${PREVIEW_STYLE}</head><body>${fragment}${PREVIEW_SCRIPT}</body></html>`
}