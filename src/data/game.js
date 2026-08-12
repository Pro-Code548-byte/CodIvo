export const AVATARS = ['🦊', '🐼', '🐢', '🦉', '🐬', '🐝', '🦕', '🐨']

export const companions = [
  { id: 'sprout', name: 'Sprout', emoji: '🌱', cheer: "You did it! Let's grow!" },
  { id: 'bolt', name: 'Bolt', emoji: '🤖', cheer: 'Beep boop — super job!' },
  { id: 'pixel', name: 'Pixel', emoji: '🐣', cheer: "Wow! You're so clever!" },
  { id: 'byte', name: 'Byte', emoji: '🐬', cheer: 'High five! That was great!' },
]

export const outfits = [
  { id: 'hat', name: 'Party Hat', emoji: '🎉', unlocksAtLevel: 2 },
  { id: 'cape', name: 'Hero Cape', emoji: '🦸', unlocksAtLevel: 3 },
  { id: 'crown', name: 'Gold Crown', emoji: '👑', unlocksAtLevel: 4 },
  { id: 'rocket', name: 'Rocket Boots', emoji: '🚀', unlocksAtLevel: 5 },
]

export const stickers = [
  { id: 's-tag', name: 'First Tag', emoji: '🏷️' },
  { id: 's-page', name: 'Page Builder', emoji: '📄' },
  { id: 's-link', name: 'Link Maker', emoji: '🔗' },
  { id: 's-brush', name: 'Color Brush', emoji: '🖌️' },
  { id: 's-box', name: 'Box Model', emoji: '🧱' },
  { id: 's-layout', name: 'Layout Pro', emoji: '🧭' },
  { id: 's-snake', name: 'Python Pal', emoji: '🐍' },
  { id: 's-loop', name: 'Loop Master', emoji: '🔁' },
  { id: 's-bulb', name: 'Bright Idea', emoji: '💡' },
  { id: 's-duel', name: 'Duel Badge', emoji: '🎖️' },
]

export const lands = [
  {
    id: 'html',
    name: 'HTML Harbor',
    emoji: '🏗️',
    blurb: 'Build the bones of a web page.',
    themeClass: 'bg-ocean text-ocean-foreground',
    order: 1,
    certificateName: 'HTML Builder',
  },
  {
    id: 'css',
    name: 'CSS Studio',
    emoji: '🎨',
    blurb: 'Paint and style your pages.',
    themeClass: 'bg-candy text-candy-foreground',
    order: 2,
    certificateName: 'CSS Stylist',
  },
  {
    id: 'python',
    name: 'Python Peak',
    emoji: '🐍',
    blurb: 'Teach the computer to think.',
    themeClass: 'bg-jungle text-jungle-foreground',
    order: 3,
    certificateName: 'Python Coder',
  },
]

const G = (width, height) => ({ width, height })

export const challenges = [
  {
    id: 'h1',
    landId: 'html',
    title: 'First Tag',
    kidPrompt: 'Walk to the first HTML tag!',
    concept: 'sequencing',
    minutes: 2,
    palette: ['move', 'turnRight', 'turnLeft'],
    grid: G(5, 4),
    start: { x: 0, y: 3, dir: 1 },
    goal: { x: 3, y: 3, emoji: '🏷️' },
    blocks: [],
    stickerId: 's-tag',
  },
  {
    id: 'h2',
    landId: 'html',
    title: 'Build a Page',
    kidPrompt: 'Turn, then walk to the page!',
    concept: 'sequencing',
    minutes: 3,
    palette: ['move', 'turnRight', 'turnLeft'],
    grid: G(5, 4),
    start: { x: 0, y: 3, dir: 1 },
    goal: { x: 2, y: 1, emoji: '📄' },
    blocks: [{ x: 3, y: 3 }],
    stickerId: 's-page',
  },
  {
    id: 'h3',
    landId: 'html',
    title: 'Make a Link',
    kidPrompt: 'Reach the link, then jump!',
    concept: 'events',
    minutes: 3,
    palette: ['move', 'turnRight', 'turnLeft', 'jump'],
    grid: G(5, 4),
    start: { x: 0, y: 0, dir: 2 },
    goal: { x: 0, y: 3, emoji: '🔗' },
    blocks: [],
    needsJumpAtGoal: true,
    stickerId: 's-link',
  },
  {
    id: 'c1',
    landId: 'css',
    title: 'Color It In',
    kidPrompt: 'Use the repeat block to reach the brush!',
    concept: 'loops',
    minutes: 4,
    palette: ['move', 'turnRight', 'turnLeft', 'repeat'],
    grid: G(6, 4),
    start: { x: 0, y: 2, dir: 1 },
    goal: { x: 5, y: 2, emoji: '🖌️' },
    blocks: [],
    stickerId: 's-brush',
  },
  {
    id: 'c2',
    landId: 'css',
    title: 'Boxes Everywhere',
    kidPrompt: 'Go around the corner to the box!',
    concept: 'loops',
    minutes: 4,
    palette: ['move', 'turnRight', 'turnLeft', 'repeat'],
    grid: G(6, 5),
    start: { x: 0, y: 4, dir: 1 },
    goal: { x: 4, y: 1, emoji: '🧱' },
    blocks: [
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ],
    stickerId: 's-box',
  },
  {
    id: 'c3',
    landId: 'css',
    title: 'Neat Layout',
    kidPrompt: 'Reach the layout, then say hello!',
    concept: 'events',
    minutes: 4,
    palette: ['move', 'turnRight', 'turnLeft', 'repeat', 'say', 'jump'],
    grid: G(6, 5),
    start: { x: 5, y: 0, dir: 2 },
    goal: { x: 5, y: 4, emoji: '🧭' },
    blocks: [],
    stickerId: 's-layout',
  },
  {
    id: 'p1',
    landId: 'python',
    title: 'Hello, Python',
    kidPrompt: 'Walk up to meet the Python!',
    concept: 'sequencing',
    minutes: 3,
    palette: ['move', 'turnRight', 'turnLeft', 'repeat', 'jump'],
    grid: G(5, 5),
    start: { x: 2, y: 4, dir: 0 },
    goal: { x: 2, y: 0, emoji: '🐍' },
    blocks: [],
    stickerId: 's-snake',
  },
  {
    id: 'p2',
    landId: 'python',
    title: 'Loop the Code',
    kidPrompt: 'Steer around the bug to the loop!',
    concept: 'conditionals',
    minutes: 5,
    palette: ['move', 'turnRight', 'turnLeft', 'repeat', 'jump', 'say'],
    grid: G(6, 5),
    start: { x: 0, y: 0, dir: 2 },
    goal: { x: 5, y: 4, emoji: '🔁' },
    blocks: [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    stickerId: 's-loop',
  },
  {
    id: 'p3',
    landId: 'python',
    title: 'Big Idea',
    kidPrompt: 'Loop your way to the bright idea!',
    concept: 'loops',
    minutes: 5,
    palette: ['move', 'turnRight', 'turnLeft', 'repeat', 'jump', 'say'],
    grid: G(6, 6),
    start: { x: 0, y: 5, dir: 0 },
    goal: { x: 5, y: 0, emoji: '💡' },
    blocks: [{ x: 0, y: 2 }],
    needsJumpAtGoal: true,
    stickerId: 's-bulb',
  },
]

export const conceptLabels = {
  sequencing: 'Putting steps in order',
  loops: 'Repeating steps (loops)',
  conditionals: 'Choosing a path',
  events: 'Making things happen',
}

export const blockTypes = {
  move: { type: 'move', label: 'Walk 1 step', emoji: '👟', colorClass: 'bg-jungle text-jungle-foreground' },
  turnLeft: { type: 'turnLeft', label: 'Turn left', emoji: '↩️', colorClass: 'bg-ocean text-ocean-foreground' },
  turnRight: { type: 'turnRight', label: 'Turn right', emoji: '↪️', colorClass: 'bg-ocean text-ocean-foreground' },
  jump: { type: 'jump', label: 'Jump!', emoji: '⭐', colorClass: 'bg-sunny text-sunny-foreground' },
  say: { type: 'say', label: 'Say hello', emoji: '💬', colorClass: 'bg-candy text-candy-foreground' },
  repeat: {
    type: 'repeat',
    label: 'Do it again',
    emoji: '🔁',
    colorClass: 'bg-grape text-grape-foreground',
    hasCount: true,
    hasChildren: true,
  },
}

export function getLand(id) {
  return lands.find((l) => l.id === id)
}

export function getChallenge(id) {
  return challenges.find((c) => c.id === id)
}

export function getChallengesInLand(landId) {
  return challenges.filter((c) => c.landId === landId)
}

export function getSticker(id) {
  return stickers.find((s) => s.id === id)
}

export function isLandUnlocked(land, completedIds) {
  if (!land || land.order === 1) return true
  const prev = lands.find((l) => l.order === land.order - 1)
  if (!prev) return true
  return getChallengesInLand(prev.id).every((c) => completedIds.includes(c.id))
}

export function isChallengeUnlocked(challenge, completedIds) {
  const list = getChallengesInLand(challenge.landId)
  const index = list.findIndex((c) => c.id === challenge.id)
  if (index > 0) return completedIds.includes(list[index - 1].id)
  return isLandUnlocked(getLand(challenge.landId), completedIds)
}

export function getCompanion(id) {
  return companions.find((c) => c.id === id) ?? companions[0]
}

export function getOutfit(id) {
  return outfits.find((o) => o.id === id)
}