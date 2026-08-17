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

const PARTS = {
  header: {
    id: 'header',
    name: 'Header',
    emoji: '🎪',
    about: 'The welcome sign at the very top of the page. It tells visitors the name of the site and says hello!',
  },
  nav: {
    id: 'nav',
    name: 'Nav',
    emoji: '🧭',
    about: 'The menu bar. It holds the links (href) that jump to other pages — the road map of the site!',
  },
  main: {
    id: 'main',
    name: 'Main',
    emoji: '📚',
    about: 'The biggest part of the page — the story, the pictures and everything fun lives here.',
  },
  footer: {
    id: 'footer',
    name: 'Footer',
    emoji: '🦶',
    about: 'The goodbye strip at the bottom. It says who made the page and how to say hi!',
  },
}

export const duelProjects = {
  html: [
    {
      id: 'dino-zoo',
      title: 'Dino Zoo',
      emoji: '🦕',
      text: 'A homepage for the coolest zoo in town!',
      parts: [
        { ...PARTS.header, hint: 'A big title and a hello message.', tags: ['h1', 'textarea'] },
        { ...PARTS.nav, hint: 'Links to visit.', tags: ['a'] },
        { ...PARTS.main, hint: 'A heading, a story and a picture!', tags: ['h2', 'p', 'img'] },
        { ...PARTS.footer, hint: 'Who made this zoo? A little message.', tags: ['p'] },
      ],
    },
    {
      id: 'space-club',
      title: 'Space Club',
      emoji: '🚀',
      text: 'A fan club for future astronauts!',
      parts: [
        { ...PARTS.header, hint: 'A big welcome to the club.', tags: ['h1', 'textarea'] },
        { ...PARTS.nav, hint: 'Menu of space links.', tags: ['a'] },
        { ...PARTS.main, hint: 'News about rockets and stars!', tags: ['h2', 'p', 'img'] },
        { ...PARTS.footer, hint: 'Sign off with a message.', tags: ['p'] },
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
        { ...PARTS.header, hint: 'A candy title and a hello — painted pink!', tags: ['h1', 'p', 'img'] },
        { ...PARTS.nav, hint: 'Links to candy sections, painted sunny.', tags: ['a'] },
        { ...PARTS.main, hint: 'A heading, a story and a picture — paint it all!', tags: ['h2', 'p', 'img', 'ul', 'li'] },
        { ...PARTS.footer, hint: 'A sweet goodbye, painted candy.', tags: ['p'] },
      ],
    },
    {
      id: 'deep-sea',
      title: 'Deep Sea',
      emoji: '🐠',
      text: 'Style an underwater world!',
      parts: [
        { ...PARTS.header, hint: 'A splashy title — painted ocean blue!', tags: ['h1', 'p'] },
        { ...PARTS.nav, hint: 'Diving menu links, painted spacey.', tags: ['a'] },
        { ...PARTS.main, hint: 'Coral content: heading, story and fish picture!', tags: ['h2', 'p', 'img', 'ul', 'li'] },
        { ...PARTS.footer, hint: 'A sandy goodbye strip, painted sunny.', tags: ['p'] },
      ],
    },
  ],
}

export function mergeDoc(project, partHtmls) {
  return `<!DOCTYPE html><html><head><title>${project.title}</title><meta charset="utf-8"></head><body>${partHtmls.join('\n')}</body></html>`
}