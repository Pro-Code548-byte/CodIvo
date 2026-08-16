export const SWATCHES = [
  { id: 'ocean', name: 'Ocean', css: '#38bdf8', fg: '#082f49' },
  { id: 'sunny', name: 'Sunny', css: '#facc15', fg: '#422006' },
  { id: 'jungle', name: 'Jungle', css: '#4ade80', fg: '#052e16' },
  { id: 'candy', name: 'Candy', css: '#f472b6', fg: '#4a044e' },
  { id: 'grape', name: 'Grape', css: '#a78bfa', fg: '#1e1b4b' },
  { id: 'space', name: 'Space', css: '#6366f1', fg: '#eef2ff' },
  { id: 'night', name: 'Night', css: '#334155', fg: '#f8fafc' },
  { id: 'cream', name: 'Cream', css: '#fff3d6', fg: '#422006' },
]

export const duelProjects = {
  html: [
    {
      id: 'dino-zoo',
      title: 'Dino Zoo',
      emoji: '🦕',
      text: 'A homepage for the coolest zoo in town!',
      parts: [
        { id: 'header', name: 'Header', emoji: '🎪', hint: 'The welcome sign — a big title and a hello message.', tags: ['h1', 'textarea'] },
        { id: 'nav', name: 'Nav', emoji: '🧭', hint: 'The menu — links to visit.', tags: ['a'] },
        { id: 'main', name: 'Main', emoji: '📚', hint: 'The star — a heading, a story and a picture!', tags: ['h2', 'p', 'img'] },
        { id: 'footer', name: 'Footer', emoji: '🦶', hint: 'Who made this zoo? A little message.', tags: ['p'] },
      ],
    },
    {
      id: 'space-club',
      title: 'Space Club',
      emoji: '🚀',
      text: 'A fan club for future astronauts!',
      parts: [
        { id: 'header', name: 'Header', emoji: '🛸', hint: 'A big welcome to the club.', tags: ['h1', 'textarea'] },
        { id: 'nav', name: 'Nav', emoji: '🧭', hint: 'Menu of space links.', tags: ['a'] },
        { id: 'main', name: 'Main', emoji: '🌌', hint: 'News about rockets and stars!', tags: ['h2', 'p', 'img'] },
        { id: 'footer', name: 'Footer', emoji: '👨‍🚀', hint: 'Sign off with a message.', tags: ['p'] },
      ],
    },
  ],
  css: [
    {
      id: 'candy-shop',
      title: 'Candy Shop',
      emoji: '🍭',
      text: 'Paint the sweetest shop on the web!',
      parts: [
        { id: 'header', name: 'Header', emoji: '🍬', hint: 'Paint the welcome banner.' },
        { id: 'nav', name: 'Nav', emoji: '🧭', hint: 'Paint the menu bar.' },
        { id: 'main', name: 'Main', emoji: '🍫', hint: 'Paint the big content area.' },
        { id: 'footer', name: 'Footer', emoji: '🎀', hint: 'Paint the goodbye strip.' },
      ],
    },
    {
      id: 'deep-sea',
      title: 'Deep Sea',
      emoji: '🐠',
      text: 'Style an underwater world!',
      parts: [
        { id: 'header', name: 'Header', emoji: '🌊', hint: 'Paint the splashy banner.' },
        { id: 'nav', name: 'Nav', emoji: '🧭', hint: 'Paint the diving menu.' },
        { id: 'main', name: 'Main', emoji: '🐙', hint: 'Paint the coral content area.' },
        { id: 'footer', name: 'Footer', emoji: '🦀', hint: 'Paint the sandy strip.' },
      ],
    },
  ],
}

export function cssPartHtml(part, build) {
  const sw = SWATCHES.find((s) => s.id === build?.color) ?? SWATCHES[0]
  const text = build?.text?.trim() || `${part.name} by your team!`
  return `<section style="background:${sw.css};color:${sw.fg};border-radius:16px;padding:16px 20px;margin:10px 0;font-family:system-ui,sans-serif"><h2 style="margin:0 0 6px;font-size:22px">${part.emoji} ${part.name}</h2><p style="margin:0">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p></section>`
}

export function mergeDoc(project, subject, partHtmls) {
  const head = subject === 'css' ? '<meta charset="utf-8">' : ''
  return `<!DOCTYPE html><html><head><title>${project.title}</title>${head}</head><body>${partHtmls.join('\n')}</body></html>`
}