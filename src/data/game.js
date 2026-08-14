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

export const curriculum = [
  {
    id: 'html',
    title: 'HTML',
    emoji: '🏗️',
    blurb: 'Build the bones of a web page.',
    themeClass: 'bg-ocean text-ocean-foreground',
    topics: [
      { id: 'html-1', title: 'What is HTML?', emoji: '🕸️', text: 'The language that builds every web page — think of it as the skeleton of the internet!' },
      { id: 'html-2', title: 'HTML Tags', emoji: '🏷️', text: 'Tags are the building blocks of HTML — like LEGO bricks that snap together.' },
      { id: 'html-3', title: 'HTML Elements', emoji: '🧩', text: 'An element is a tag with its content — opening tag, content, closing tag.' },
      { id: 'html-4', title: 'HTML Page Structure', emoji: '🏠', text: 'Every page has a head and a body — the top holds info, the body holds what you see.' },
      { id: 'html-5', title: 'Headings', emoji: '📰', text: 'Big titles from h1 to h6 that organize your page like a newspaper.' },
      { id: 'html-6', title: 'Paragraphs', emoji: '📝', text: 'Plain text blocks that carry your words — the most used element ever!' },
      { id: 'html-7', title: 'Text Styling', emoji: '✍️', text: 'Make words bold, italic, underlined or crossed out.' },
      { id: 'html-8', title: 'Colors', emoji: '🖌️', text: 'Paint your text and backgrounds any color you can dream of.' },
      { id: 'html-9', title: 'Links', emoji: '🔗', text: 'Click to jump to another page or website — the magic of the web!' },
      { id: 'html-10', title: 'Images', emoji: '🖼️', text: 'Add pictures and photos to make your page bright and exciting.' },
      { id: 'html-11', title: 'Lists', emoji: '📋', text: 'Ordered, unordered and neat lists for your favorite things.' },
      { id: 'html-12', title: 'Tables', emoji: '📊', text: 'Line up information in rows and columns like a spreadsheet.' },
      { id: 'html-13', title: 'Buttons', emoji: '🔘', text: 'Clickable buttons that make things happen on your page.' },
      { id: 'html-14', title: 'Forms', emoji: '📨', text: 'Forms collect information — names, messages and more.' },
      { id: 'html-15', title: 'Input Fields', emoji: '⌨️', text: 'Text boxes and fields where people type their answers.' },
      { id: 'html-16', title: 'Divs', emoji: '📦', text: 'The box that holds other elements — group anything together.' },
      { id: 'html-17', title: 'Classes & IDs', emoji: '🪪', text: 'Name your elements so you can style them and find them later.' },
    ],
    projects: [
      { id: 'html-p1', title: 'My First Web Page', emoji: '🏠', text: 'Build a page with a title, a heading, a paragraph and a picture.' },
      { id: 'html-p2', title: 'All About Me', emoji: '🙋', text: 'A page that introduces you — your favorites, your family and your friends.' },
      { id: 'html-p3', title: 'My Favorite Things', emoji: '⭐', text: 'A list page with your top 10 favorite things, each one clickable.' },
    ],
  },
  {
    id: 'css',
    title: 'CSS',
    emoji: '🎨',
    blurb: 'Paint and style your pages.',
    themeClass: 'bg-candy text-candy-foreground',
    topics: [
      { id: 'css-1', title: 'What is CSS?', emoji: '🎨', text: 'The styling language that colors, arranges and beautifies HTML pages.' },
      { id: 'css-2', title: 'CSS Syntax', emoji: '✍️', text: 'Rules made of a selector and declarations — property: value.' },
      { id: 'css-3', title: 'Inline, Internal & External CSS', emoji: '📄', text: 'Three ways to add styles — inside tags, in a style tag, or in a separate file.' },
      { id: 'css-4', title: 'CSS Selectors', emoji: '🎯', text: 'Point at which elements to style — by tag, class or id.' },
      { id: 'css-5', title: 'Colors', emoji: '🖌️', text: 'Paint text and boxes with names, hex codes or rgb values.' },
      { id: 'css-6', title: 'Backgrounds', emoji: '🖼️', text: 'Fill elements with colors, gradients and images.' },
      { id: 'css-7', title: 'Text Styling', emoji: '✒️', text: 'Bold, italic, underline and line-height — shape how words look.' },
      { id: 'css-8', title: 'Fonts', emoji: '🔤', text: 'Choose the style of letters and even load custom fonts.' },
      { id: 'css-9', title: 'Borders', emoji: '🧱', text: 'Draw lines around boxes with width, style and color.' },
      { id: 'css-10', title: 'Width & Height', emoji: '📏', text: 'Control exactly how big an element is.' },
      { id: 'css-11', title: 'Margins', emoji: '↔️', text: 'Space outside the border that pushes elements apart.' },
      { id: 'css-12', title: 'Padding', emoji: '🧦', text: 'Space inside the border that gives content breathing room.' },
      { id: 'css-13', title: 'The Box Model', emoji: '📦', text: 'Every element is a box: content, padding, border and margin.' },
      { id: 'css-14', title: 'display', emoji: '🧭', text: 'Switch elements between block, inline and more.' },
      { id: 'css-15', title: 'Flexbox', emoji: '🧲', text: 'Magically line things up in rows and columns with flex.' },
      { id: 'css-16', title: 'Positioning', emoji: '🎯', text: 'Place elements exactly where you want with relative, absolute and more.' },
      { id: 'css-17', title: 'Shadows', emoji: '🌑', text: 'Add depth with box-shadow and text-shadow.' },
      { id: 'css-18', title: 'Border Radius', emoji: '⚪', text: 'Round the corners of boxes — or turn them into circles!' },
      { id: 'css-19', title: 'Images in CSS', emoji: '🖼️', text: 'Size, round and style images on your page.' },
      { id: 'css-20', title: 'Hover Effects', emoji: '🖱️', text: 'Change styles when the mouse points at an element.' },
      { id: 'css-21', title: 'Simple Animations', emoji: '🎬', text: 'Make elements move, fade and wiggle with transitions and keyframes.' },
      { id: 'css-22', title: 'Responsive Design', emoji: '📱', text: 'Make your page look great on phones, tablets and big screens.' },
      { id: 'css-23', title: 'CSS with HTML', emoji: '🔗', text: 'Put your HTML and CSS together to build complete styled pages.' },
      { id: 'css-24', title: 'CSS challenge', emoji: '🎯', text: 'Beat the Color It In game and earn your Color Brush sticker!' },
    ],
    projects: [
      { id: 'css-p1', title: 'Rainbow Poster', emoji: '🌈', text: 'A colorful poster with gradients, shadows and rounded corners.' },
      { id: 'css-p2', title: 'Cool Card Collection', emoji: '🃏', text: 'A row of fancy cards with hover effects that lift and glow.' },
      { id: 'css-p3', title: 'Animated Hero', emoji: '🦸', text: 'A big landing header with bouncing text and a moving background.' },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    emoji: '⚡',
    blurb: 'Make pages come alive.',
    themeClass: 'bg-space text-space-foreground',
    topics: [
      { id: 'js-1', title: 'What is JavaScript?', emoji: '⚡', text: 'The language that makes web pages come alive — it can think, react and move things!' },
      { id: 'js-2', title: 'JavaScript Syntax', emoji: '✍️', text: 'Rules for writing code the computer understands — statements, lines and curly braces {}.' },
      { id: 'js-3', title: 'Comments', emoji: '💬', text: 'Notes for humans that the computer skips — great for leaving yourself clues!' },
      { id: 'js-4', title: 'Variables (let, const)', emoji: '📦', text: 'Name a box with let or const and store anything inside it.' },
      { id: 'js-5', title: 'Data Types', emoji: '🗂️', text: 'The kinds of values JavaScript knows — text, numbers, true/false and more.' },
      { id: 'js-6', title: 'Strings', emoji: '🧵', text: 'Text wrapped in quotes — words you can join, count and search.' },
      { id: 'js-7', title: 'Numbers', emoji: '🔢', text: 'Math values — add, subtract, multiply and divide with the computer.' },
      { id: 'js-8', title: 'Booleans', emoji: '✅', text: 'True or False — JavaScript\u2019s yes or no answers.' },
      { id: 'js-9', title: 'Operators', emoji: '➕', text: 'Symbols like +, -, * and / that make JavaScript do math.' },
      { id: 'js-10', title: 'User Input', emoji: '⌨️', text: 'Ask questions with prompt() and let people type their answers.' },
      { id: 'js-11', title: 'Output', emoji: '📢', text: 'Show messages on the page with console.log() and alert().' },
      { id: 'js-12', title: 'Conditional Statements', emoji: '🧠', text: 'Make choices with if, else if and else.' },
      { id: 'js-13', title: 'Comparison Operators', emoji: '⚖️', text: 'Compare values with ==, ===, > and < to decide what is true.' },
      { id: 'js-14', title: 'Logical Operators', emoji: '🧩', text: 'Combine conditions with &&, || and !.' },
      { id: 'js-15', title: 'Loops', emoji: '🔁', text: 'Repeat code with for and while — no more copy-pasting!' },
      { id: 'js-16', title: 'Patterns', emoji: '🎨', text: 'Print stars and shapes with loops and clever math.' },
      { id: 'js-17', title: 'Arrays', emoji: '📋', text: 'A list of items — add, remove and grab any of them by number.' },
      { id: 'js-18', title: 'Objects', emoji: '🗃️', text: 'Store info with names and values — like a person with a name and age.' },
      { id: 'js-19', title: 'Functions', emoji: '🛠️', text: 'Name a chunk of code and run it anytime with one call.' },
      { id: 'js-20', title: 'Parameters & Arguments', emoji: '🎭', text: 'Send info into a function so it can work with your values.' },
      { id: 'js-21', title: 'Return Values', emoji: '📤', text: 'Functions can hand results back to you to use.' },
      { id: 'js-22', title: 'Events', emoji: '🎉', text: 'React when someone clicks, hovers or types — that is how pages feel alive!' },
      { id: 'js-23', title: 'DOM Manipulation', emoji: '✨', text: 'Grab, change and create page elements with JavaScript magic.' },
      { id: 'js-24', title: 'Forms & Form Validation', emoji: '📨', text: 'Check what people type in forms and show friendly messages.' },
      { id: 'js-25', title: 'Timers', emoji: '⏰', text: 'Run code later with setTimeout and setInterval.' },
      { id: 'js-26', title: 'Math & Random Numbers', emoji: '🎲', text: 'Roll dice and do fancy math with the Math object.' },
      { id: 'js-27', title: 'Error Handling', emoji: '🛡️', text: 'Catch mistakes with try and catch so your code never crashes.' },
      { id: 'js-28', title: 'Fetch API', emoji: '🌐', text: 'Get information from other websites and show it on your page.' },
      { id: 'js-29', title: 'Promises & Async/Await', emoji: '⏳', text: 'Wait for slow things politely — like downloading a picture.' },
      { id: 'js-30', title: 'JavaScript challenge', emoji: '🎯', text: 'Coming soon to the map — solve the JavaScript games and earn a sticker!' },
    ],
    projects: [
      { id: 'js-p1', title: 'Magic Name Generator', emoji: '🪄', text: 'A button that mixes silly words into cool names for pets and heroes.' },
      { id: 'js-p2', title: 'Emoji Reaction Game', emoji: '⚡', text: 'Click the right emoji fast — it gets faster every round!' },
      { id: 'js-p3', title: 'Treasure Hunt Quiz', emoji: '🗺️', text: 'A quiz that checks answers, keeps score and cheers when you win.' },
    ],
  },
  {
    id: 'python',
    title: 'Python',
    emoji: '🐍',
    blurb: 'Teach the computer to think.',
    themeClass: 'bg-jungle text-jungle-foreground',
    topics: [
      { id: 'python-1', title: 'What is Python?', emoji: '🐍', text: 'A super friendly programming language that is easy to read — like writing instructions in English!' },
      { id: 'python-2', title: 'Installing & Running Python', emoji: '⚙️', text: 'Get Python on your computer and run your first script with one click.' },
      { id: 'python-3', title: 'Python Syntax', emoji: '✍️', text: 'The grammar of Python — indentation and rules that make your code work.' },
      { id: 'python-4', title: 'Comments', emoji: '💬', text: 'Notes for humans that Python ignores — perfect for reminders!' },
      { id: 'python-5', title: 'Variables', emoji: '📦', text: 'Boxes with names that store numbers, words and more.' },
      { id: 'python-6', title: 'Data Types', emoji: '🗂️', text: 'The kinds of values Python knows — numbers, text, true/false and more.' },
      { id: 'python-7', title: 'Numbers', emoji: '🔢', text: 'Whole numbers, decimals and math that Python loves to compute.' },
      { id: 'python-8', title: 'Strings', emoji: '🧵', text: 'Text wrapped in quotes — words you can join, count and search.' },
      { id: 'python-9', title: 'Boolean Values', emoji: '✅', text: 'True or False — Python\u2019s yes or no answers for making decisions.' },
      { id: 'python-10', title: 'Operators', emoji: '➕', text: 'Symbols like +, -, * and / that make Python do math.' },
      { id: 'python-11', title: 'Getting User Input', emoji: '⌨️', text: 'Ask questions and let the user type answers back.' },
      { id: 'python-12', title: 'Printing Output', emoji: '🖨️', text: 'Show messages and results on the screen with print().' },
      { id: 'python-13', title: 'Conditional Statements (if, elif, else)', emoji: '🧠', text: 'Make choices: if this is true, do that; otherwise do something else.' },
      { id: 'python-14', title: 'Comparison Operators', emoji: '⚖️', text: 'Compare values with ==, >, < and more to decide what is true.' },
      { id: 'python-15', title: 'Logical Operators', emoji: '🧩', text: 'Combine conditions with and, or and not.' },
      { id: 'python-16', title: 'Loops (for, while)', emoji: '🔁', text: 'Repeat code automatically — for a fixed number of times or while a condition is true.' },
      { id: 'python-17', title: 'Lists', emoji: '📋', text: 'A row of items in order — add, remove and pick any of them.' },
      { id: 'python-18', title: 'Tuples', emoji: '🎀', text: 'Lists that cannot change — a fixed bundle of values.' },
      { id: 'python-19', title: 'Dictionaries', emoji: '📖', text: 'Store info as key-value pairs, like a word with its meaning.' },
      { id: 'python-20', title: 'Sets', emoji: '🎒', text: 'A bag of unique items — no duplicates allowed!' },
      { id: 'python-21', title: 'Functions', emoji: '🧩', text: 'Name a chunk of code and run it anytime with one call.' },
      { id: 'python-22', title: 'Parameters & Arguments', emoji: '🎭', text: 'Send information into a function so it can work with your values.' },
      { id: 'python-23', title: 'Return Values', emoji: '📤', text: 'Functions can send results back to you to store or use.' },
      { id: 'python-24', title: 'Error Handling', emoji: '🛡️', text: 'Catch mistakes with try and except so your code never crashes.' },
      { id: 'python-25', title: 'Modules', emoji: '📚', text: 'Ready-made code libraries you can import and use.' },
      { id: 'python-26', title: 'Simple File Handling', emoji: '📂', text: 'Save and read text files so your program can remember things.' },
      { id: 'python-27', title: 'Patterns', emoji: '🎨', text: 'Print stars, shapes and designs using loops and clever math.' },
      { id: 'python-28', title: 'Python challenge', emoji: '🎯', text: 'Beat the Hello, Python game and earn your Python Pal sticker!' },
    ],
    projects: [
      { id: 'python-p1', title: 'Number Guessing Game', emoji: '🎯', text: 'The computer picks a secret number and you try to guess it.' },
      { id: 'python-p2', title: 'Magic 8 Ball', emoji: '🔮', text: 'Ask a question and get a silly random answer back.' },
      { id: 'python-p3', title: 'Secret Code Maker', emoji: '🤫', text: 'A program that scrambles your messages so only friends can read them.' },
    ],
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