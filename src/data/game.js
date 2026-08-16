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
]

export const curriculum = [
  {
    id: 'html',
    title: 'HTML',
    emoji: '🏗️',
    blurb: 'Build the bones of a web page.',
    themeClass: 'bg-ocean text-ocean-foreground',
    topics: [
      { id: 'html-1', title: 'What is HTML?', emoji: '🕸️', text: 'The language that builds every web page — think of it as the skeleton of the internet!', lessonId: 'page-bones', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body'],
      note: [
        'HTML is the skeleton of every website. You build it with tags — special words in brackets, like <html>.',
        'Most tags come in pairs: <html> opens and </html> closes. The head holds secret info, the body holds what you see.',
      ],
      activity: 'Drag the blocks from column 1 into your workspace (column 2) in this order: <!DOCTYPE html> first, then <html>, <head> with <title>, then <body>. Drop a <textarea> inside the body and type your name inside it — watch it appear in the preview!',
      steps: [
        { text: 'Add the <!DOCTYPE html> block — it always comes first!', block: 'doctype' },
        { text: 'Now add the <html> open tag.', block: 'html', part: 'open' },
        { text: 'Now close it with the </html> closing tag.', block: 'html', part: 'close' },
        { text: 'Add the <head> open tag.', block: 'head', part: 'open' },
        { text: 'Close it with the </head> closing tag.', block: 'head', part: 'close' },
        { text: 'Add the <title> open tag.', block: 'title', part: 'open' },
        { text: 'Close it with the </title> closing tag.', block: 'title', part: 'close' },
        { text: 'Add the <body> open tag.', block: 'body', part: 'open' },
        { text: 'Close it with the </body> closing tag.', block: 'body', part: 'close' },
        { text: 'Add the <textarea> open tag.', block: 'textarea', part: 'open' },
        { text: 'Close it with the </textarea> closing tag.', block: 'textarea', part: 'close' },
        { text: 'Type your name inside the textarea!', needsText: true },
      ],
      guide: [
        'Open a tag and close it — most tags come in pairs!',
        '<!DOCTYPE html> is self-closing — it needs no pair.',
        'Head and body live inside html.',
        'Lowercase, no spaces in the brackets.',
      ], },
      { id: 'html-2', title: 'HTML Tags', emoji: '🏷️', text: 'Tags are the building blocks of HTML — like LEGO bricks that snap together.', lessonId: 'page-bones', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body'],
      note: [
        'Tags are how you talk to the browser. A tag is a word wrapped in angle brackets, like <html>.',
        'Most tags come in pairs — an opening one, and a closing one with a slash: <html> and </html>.',
      ],
      activity: 'Grab the <html> open tag and its </html> closing tag, and nest <head> and <body> inside. Watch the preview — your tags are building a real page!',
      guide: [
        'Tags wrap in pairs: <tag> opens, </tag> closes.',
        'Self-closing tags like <!DOCTYPE html> have no pair.',
        'Nested tags close in order — the last one opened is the first one closed.',
      ], },
      { id: 'html-3', title: 'HTML Elements', emoji: '🧩', text: 'An element is a tag with its content — opening tag, content, closing tag.', lessonId: 'page-parts', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1'],
      note: [
        'An element is one full piece of the page: opening tag + content + closing tag.',
        'Like <h1>My big title</h1> — the whole thing is one element.',
      ],
      activity: 'Build an h1 element: add the <h1> open tag, then the </h1> closing tag — and type a title between them!',
      guide: [
        'Every element = opening tag + content + closing tag.',
        'The content sits between the two tags.',
        'Elements nest inside other elements to build a page.',
      ], },
      { id: 'html-4', title: 'HTML Page Structure', emoji: '🏠', text: 'Every page has a head and a body — the top holds info, the body holds what you see.', lessonId: 'page-bones', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer'],
      note: [
        'Pages have famous parts: header at the top (welcome!), nav for menus, main for the important stuff, and footer at the bottom.',
        'The head holds secret info, the body holds everything you see.',
      ],
      activity: 'Add a <header>, <nav>, <main> and <footer> inside the body — the skeleton of a real website!',
      guide: [
        'Header = top of the page, like a welcome sign.',
        'Nav = the menu with links.',
        'Main = the most important content.',
        'Footer = the bottom — often "made by" messages.',
      ], },
      { id: 'html-5', title: 'Headings', emoji: '📰', text: 'Big titles from h1 to h6 that organize your page like a newspaper.', lessonId: 'words', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3'],
      note: [
        'Headings are the titles of your page. There are 6 of them — from h1 down to h6! h1 is the biggest boss, h2 for sections, h3 for smaller groups, and h4, h5, h6 keep getting smaller.',
        'Just like a newspaper — a big headline, then smaller headings under it.',
      ],
      activity: 'Add an <h1> for your page title and an <h2> for a section — type words inside each!',
      guide: [
        'h1 is the biggest, h6 the smallest.',
        'Only use one h1 per page.',
        'Use h2 and h3 to organize sections.',
      ], },
      { id: 'html-6', title: 'Paragraphs', emoji: '📝', text: 'Plain text blocks that carry your words — the most used element ever!', lessonId: 'words', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p'],
      note: [
        'Paragraphs are where your words live. <p> is the most used element on the internet — every story, every description.',
      ],
      activity: 'Add a <p> block inside the body and type a sentence about yourself!',
      guide: [
        'A <p> holds a paragraph of text.',
        'Type your words between the tags.',
        'Paragraphs stack neatly down the page.',
      ], },
      { id: 'html-7', title: 'Text Styling', emoji: '✍️', text: 'Make words bold, italic, underlined or crossed out.', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em'],
      note: [
        '<strong> makes words bold like a shout, <em> leans them over like a whisper.',
        'They wrap just the words you want to change — nothing more.',
      ],
      activity: 'Wrap some words: put <strong> and </strong> around one word in your paragraph, then <em> around another!',
      guide: [
        '<strong> = bold, <em> = italic.',
        'Style only the words you want — wrap them tightly.',
        'They work best inside a paragraph.',
      ], },
      { id: 'html-8', title: 'Colors', emoji: '🖌️', text: 'Paint your text and backgrounds any color you can dream of.', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em'],
      note: [
        'Colors come from CSS — HTML builds the page, CSS paints it.',
        'For now, keep practicing your tags so your page is ready for paint!',
      ],
      activity: 'Rebuild your page skeleton — the colors will come in the CSS lessons!',
      guide: [
        'HTML makes the structure, CSS adds the colors.',
        'Keep your tags tidy so styling is easy later.',
        'Practice your pairs — closing tags matter!',
      ], },
      { id: 'html-9', title: 'Links', emoji: '🔗', text: 'Click to jump to another page or website — the magic of the web!', lessonId: 'pictures-links', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a'],
      note: [
        'Links make the web clickable. <a> jumps to another page when you click it.',
        'A link has words to click on, and a place to go to.',
      ],
      activity: 'Add an <a> block inside your body — you can write the words you want to click!',
      guide: [
        '<a> = anchor, it creates a link.',
        'Links need words to click on.',
        'Links jump to another page or website.',
      ], },
      { id: 'html-10', title: 'Images', emoji: '🖼️', text: 'Add pictures and photos to make your page bright and exciting.', lessonId: 'pictures-links', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img'],
      note: [
        '<img> shows a picture on your page.',
        'It is special: it is self-closing — no closing tag needed!',
      ],
      activity: 'Drop the <img> block into your body — the preview will show a picture placeholder!',
      guide: [
        '<img> is self-closing — no </img>!',
        'Every image needs a description.',
        'Images make pages bright and fun.',
      ], },
      { id: 'html-11', title: 'Lists', emoji: '📋', text: 'Ordered, unordered and neat lists for your favorite things.', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li'],
      note: [
        '<ul> makes bullet lists for your favorite things, <ol> makes numbered lists for steps in order.',
        'Each <li> is one item inside the list.',
      ],
      activity: 'Add a <ul> with two <li> items inside — type your two favorite things!',
      guide: [
        '<ul> = bullets, <ol> = numbers.',
        'Each <li> is one item.',
        'Items live inside the list.',
      ], },
      { id: 'html-12', title: 'Tables', emoji: '📊', text: 'Line up information in rows and columns like a spreadsheet.', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th'],
      note: [
        'Tables line up information like a spreadsheet.',
        '<table> holds <tr> rows, each row holds <td> cells — and <th> names the columns in bold.',
      ],
      activity: 'Build a tiny table: <table> with one <tr> row and two <td> cells — type something in each cell!',
      guide: [
        '<table> wraps the whole table.',
        '<tr> = one row, <td> = one cell.',
        '<th> = bold column name.',
      ], },
      { id: 'html-13', title: 'Buttons', emoji: '🔘', text: 'Clickable buttons that make things happen on your page.', lessonId: 'forms', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button'],
      note: [
        '<button> makes a clickable button.',
        'Right now it is just a button — later, JavaScript will make it do things!',
      ],
      activity: 'Add a <button> block and type the words you want to see on it!',
      guide: [
        '<button> creates something to click.',
        'Type the words that show on the button.',
        'JavaScript will make buttons act later.',
      ], },
      { id: 'html-14', title: 'Forms', emoji: '📨', text: 'Forms collect information — names, messages and more.', lessonId: 'forms', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button', 'form', 'label', 'input'],
      note: [
        'Forms collect information from people — names, messages and more.',
        '<form> wraps everything, <label> names each box, and <input> is where people type.',
      ],
      activity: 'Build a tiny form: <form> with a <label> and an <input> inside — type a label like "Your name"!',
      guide: [
        '<form> wraps the whole form.',
        '<label> says what a box is for.',
        '<input> is where people type.',
      ], },
      { id: 'html-15', title: 'Input Fields', emoji: '⌨️', text: 'Text boxes and fields where people type their answers.', lessonId: 'forms', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button', 'form', 'label', 'input', 'select', 'option'],
      note: [
        'Input fields come in many shapes: <input> text boxes, <textarea> big text areas, and <select> dropdowns with <option> choices.',
      ],
      activity: 'Add a <select> dropdown with two <option> choices — type the choices inside!',
      guide: [
        '<input> = small text box.',
        '<textarea> = big text area.',
        '<select> + <option> = dropdown menu.',
      ], },
      { id: 'html-16', title: 'Divs', emoji: '📦', text: 'The box that holds other elements — group anything together.', lessonId: 'page-parts', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button', 'form', 'label', 'input', 'select', 'option', 'div', 'section', 'article', 'aside'],
      note: [
        'A <div> is a plain box that groups elements together.',
        '<section>, <article> and <aside> are special boxes that say what the group is about.',
      ],
      activity: 'Wrap some of your content in a <div> — group your words into one box!',
      guide: [
        '<div> groups anything together.',
        '<section> groups related content.',
        '<article> = one complete piece, <aside> = side notes.',
      ], },
      { id: 'html-17', title: 'Classes & IDs', emoji: '🪪', text: 'Name your elements so you can style them and find them later.', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button', 'form', 'label', 'input', 'select', 'option', 'div', 'section', 'article', 'aside'],
      note: [
        'Classes and IDs name your elements so CSS can style them and JavaScript can find them.',
        'You will use them a lot in the next lessons!',
      ],
      activity: 'Rebuild your best page so far — classes and ids will come with CSS!',
      guide: [
        'Names help style and find elements later.',
        'Keep building — you are ready for CSS!',
        'Every tag still needs its closing pair.',
      ], },
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