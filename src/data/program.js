import { getBlockDef } from './blocks.js'

let seq = 0
function newId() {
  seq += 1
  return `n${Date.now()}-${seq}`
}

export function makeNode(type) {
  const def = getBlockDef(type)
  const node = { id: newId(), type, fields: {} }
  if (def.canContain) node.children = []
  return node
}

function tagOf(def) {
  return def.syntax.slice(1, -1)
}

export function generateHtml(nodes, indent = '') {
  return nodes
    .map((n) => {
      const def = getBlockDef(n.type)
      if (n.type === 'doctype') return `${indent}<!DOCTYPE html>`
      const tag = tagOf(def)
      const fields = n.fields ?? {}
      const attrs = {}
      if (n.type === 'img') {
        if (fields.src?.trim()) attrs.src = fields.src.trim()
        if (fields.alt?.trim()) attrs.alt = fields.alt.trim()
      }
      if (n.type === 'a' && fields.href?.trim()) attrs.href = fields.href.trim()
      if (n.type === 'input' && fields.content?.trim()) attrs.placeholder = fields.content.trim()
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => ` ${k}="${v}"`)
        .join('')
      if (def.voidElement) return `${indent}<${tag}${attrStr}>`
      if (def.acceptsText) return `${indent}<${tag}${attrStr}>${fields.content ?? ''}</${tag}>`
      const inner = n.children?.length
        ? `\n${generateHtml(n.children, `${indent}  `)}\n${indent}`
        : ''
      return `${indent}<${tag}${attrStr}>${inner}</${tag}>`
    })
    .join('\n')
}