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
      mission: 'Build the skeleton of your first web page.',
      steps: [
        { text: 'Add the <!DOCTYPE html> block — it always comes first!', block: 'doctype', praise: 'The magic starter line! ✨' },
        { text: 'Add the <html> open tag.', block: 'html', part: 'open' },
        { text: 'Add the <head> open tag.', block: 'head', part: 'open' },
        { text: 'Add the <title> open tag and type "My First Page" inside it.', block: 'title', part: 'open', requiredText: 'My First Page', praise: 'Your tab has a name! 📑' },
        { text: 'Add the <body> open tag.', block: 'body', part: 'open' },
        { text: 'Add the <textarea> open tag and type your name inside it.', block: 'textarea', part: 'open', needsText: true, praise: 'Your page is born! 🏠' },
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
      mission: 'Put the skeleton together with tag pairs.',
      steps: [
        { text: 'Add the <!DOCTYPE html> block — it always comes first!', block: 'doctype', praise: 'The magic starter line! ✨' },
        { text: 'Add the <html> open tag.', block: 'html', part: 'open' },
        { text: 'Add the <head> open tag.', block: 'head', part: 'open' },
        { text: 'Add the <title> open tag.', block: 'title', part: 'open' },
        { text: 'Type "My First Page" inside the <title>.', block: 'title', part: 'open', requiredText: 'My First Page', praise: 'Your tab has a name! 📑' },
        { text: 'Close the <title> with </title>.', block: 'title', part: 'close' },
        { text: 'Close the <head> with </head>.', block: 'head', part: 'close' },
        { text: 'Add the <body> open tag.', block: 'body', part: 'open' },
        { text: 'Close the <body> with </body>.', block: 'body', part: 'close' },
        { text: 'Close the <html> with </html>.', block: 'html', part: 'close', praise: 'Perfect pairs — you are a builder! 🧱' },
      ],
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
      mission: 'Create one complete element: a big title with words inside.',
      steps: [
        { text: 'Add the <h1> open tag.', block: 'h1', part: 'open' },
        { text: 'Type "Welcome, Coder!" inside the <h1>.', block: 'h1', part: 'open', requiredText: 'Welcome, Coder!', praise: 'Great words! 🎉' },
        { text: 'Close the <h1> with </h1>.', block: 'h1', part: 'close', praise: 'One complete element! 🧩' },
      ],
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
      mission: 'Create a page with all four famous parts: header, nav, main and footer.',
      steps: [
        { text: 'Add the <body> open tag.', block: 'body', part: 'open' },
        { text: 'Add the <header> open tag.', block: 'header', part: 'open', praise: 'The welcome sign is up! 🎪' },
        { text: 'Add the <nav> open tag.', block: 'nav', part: 'open', praise: 'Your menu has a home! 🧭' },
        { text: 'Add the <main> open tag.', block: 'main', part: 'open', praise: 'The important stuff goes here! 📚' },
        { text: 'Add the <footer> open tag.', block: 'footer', part: 'open', praise: 'A tidy bottom! 🦶' },
      ],
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
      mission: 'Create a title and two smaller headings with words inside.',
      steps: [
        { text: 'Add the <h1> open tag.', block: 'h1', part: 'open' },
        { text: 'Type "My Pet Dinosaur" inside the <h1>.', block: 'h1', part: 'open', requiredText: 'My Pet Dinosaur', praise: 'A giant title! 📰' },
        { text: 'Add the <h2> open tag.', block: 'h2', part: 'open' },
        { text: 'Type "About Rex" inside the <h2>.', block: 'h2', part: 'open', requiredText: 'About Rex', praise: 'Nice section name! ⭐' },
        { text: 'Add the <h3> open tag.', block: 'h3', part: 'open' },
        { text: 'Type "Rex\'s Favorite Snacks" inside the <h3>.', block: 'h3', part: 'open', requiredText: "Rex's Favorite Snacks", praise: 'Headings all in order! 🏆' },
      ],
      guide: [
        'h1 is the biggest, h6 the smallest.',
        'Only use one h1 per page.',
        'Use h2 and h3 to organize sections.',
      ], },
      { id: 'html-6', title: 'Paragraphs', emoji: '📝', text: 'Plain text blocks that carry your words — the most used element ever!', lessonId: 'words', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p'],
      note: [
        'Paragraphs are where your words live. <p> is the most used element on the internet — every story, every description.',
      ],
      mission: 'Create two paragraphs with sentences inside.',
      steps: [
        { text: 'Add the <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "Rex is a friendly T-Rex who loves pancakes." inside it.', block: 'p', part: 'open', requiredText: 'pancakes', praise: 'Your words have a home! 📝' },
        { text: 'Add another <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "He sleeps in my sock drawer." inside it.', block: 'p', part: 'open', requiredText: 'sock drawer', praise: 'Two cozy paragraphs! ✨' },
      ],
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
      mission: 'Create bold and italic words.',
      steps: [
        { text: 'Add the <strong> open tag.', block: 'strong', part: 'open' },
        { text: 'Type "BOLD words shout!" inside it.', block: 'strong', part: 'open', requiredText: 'shout', praise: 'Shouty words! ✍️' },
        { text: 'Add the <em> open tag.', block: 'em', part: 'open' },
        { text: 'Type "These words lean like the wind." inside it.', block: 'em', part: 'open', requiredText: 'wind', praise: 'Smooth and slanted! 🌬️' },
      ],
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
      mission: 'Rebuild a page that is ready to be painted.',
      steps: [
        { text: 'Add the <!DOCTYPE html> block.', block: 'doctype', praise: 'The magic starter line! ✨' },
        { text: 'Add the <html> open tag.', block: 'html', part: 'open' },
        { text: 'Add the <body> open tag.', block: 'body', part: 'open' },
        { text: 'Add the <h1> open tag.', block: 'h1', part: 'open' },
        { text: 'Type "Rainbow Dino" inside it.', block: 'h1', part: 'open', requiredText: 'Rainbow Dino', praise: 'Ready to be painted! 🖌️' },
        { text: 'Add a <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "Soon this page will get painted!" inside it.', block: 'p', part: 'open', requiredText: 'painted', praise: 'A clean canvas! 🎨' },
      ],
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
      mission: 'Create a link that jumps to a website.',
      steps: [
        { text: 'Add the <a> open tag.', block: 'a', part: 'open' },
        { text: 'Type "Visit the Dino Museum" inside it.', block: 'a', part: 'open', requiredText: 'Dino Museum', praise: 'Clickable words! 👆' },
        { text: 'Open the a= pill next to href and type a website address starting with https://', block: 'a', attr: 'href', value: 'https://', praise: 'Your link goes somewhere! 🔗' },
      ],
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
      mission: 'Create a picture with an address and a description.',
      steps: [
        { text: 'Add the <img> block.', block: 'img', praise: 'Your picture has a spot! 🖼️' },
        { text: 'Type a photo address in the src= pill, like https://picsum.photos/300/200', block: 'img', attr: 'src', value: 'picsum.photos', praise: 'The picture knows where to come from! 📸' },
        { text: 'Type a description in the alt= pill, like "A friendly T-Rex".', block: 'img', attrNotEmpty: 'alt', praise: 'Now everyone knows what it shows! 💬' },
      ],
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
      mission: 'Create a bullet list with two favorite things.',
      steps: [
        { text: 'Add the <ul> open tag.', block: 'ul', part: 'open', praise: 'Your list has a box! 📋' },
        { text: 'Add an <li> open tag.', block: 'li', part: 'open' },
        { text: 'Type "Pizza" inside it.', block: 'li', part: 'open', requiredText: 'Pizza', praise: 'Yummy choice! 🍕' },
        { text: 'Add another <li> open tag.', block: 'li', part: 'open' },
        { text: 'Type "Ice cream" inside it.', block: 'li', part: 'open', requiredText: 'Ice cream', praise: 'A sweet list! 🍨' },
      ],
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
      mission: 'Create a table with a header and a cell.',
      steps: [
        { text: 'Add the <table> open tag.', block: 'table', part: 'open', praise: 'Your table is up! 📊' },
        { text: 'Add a <tr> open tag (one row).', block: 'tr', part: 'open' },
        { text: 'Add a <th> open tag and type "Pet" inside it.', block: 'th', part: 'open', requiredText: 'Pet', praise: 'A bold column name! 👑' },
        { text: 'Add a <td> open tag and type "Rex" inside it.', block: 'td', part: 'open', requiredText: 'Rex', praise: 'Data in the box! 📦' },
      ],
      guide: [
        '<table> wraps the whole table.',
        '<tr> = one row, <td> = one cell.',
        '<th> = bold column name.',
      ], },
      { id: 'html-13', title: 'Buttons', emoji: '🔘', text: 'Clickable buttons that make things happen on your page.', lessonId: 'forms', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button'],
      note: [
        '<button> makes a clickable button.',
        'Right now it is just a button — soon your page will make it do things!',
      ],
      mission: 'Create a button with words on it.',
      steps: [
        { text: 'Add the <button> open tag.', block: 'button', part: 'open' },
        { text: 'Type "Click Me!" inside it.', block: 'button', part: 'open', requiredText: 'Click Me!', praise: 'Something fun to tap! 🔘' },
      ],
      guide: [
        '<button> creates something to click.',
        'Type the words that show on the button.',
        'Big buttons are the most fun!',
      ], },
      { id: 'html-14', title: 'Forms', emoji: '📨', text: 'Forms collect information — names, messages and more.', lessonId: 'forms', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button', 'form', 'label', 'input'],
      note: [
        'Forms collect information from people — names, messages and more.',
        '<form> wraps everything, <label> names each box, and <input> is where people type.',
      ],
      mission: 'Create a tiny form with a label and an input.',
      steps: [
        { text: 'Add the <form> open tag.', block: 'form', part: 'open', praise: 'Your form is open! 📨' },
        { text: 'Add a <label> open tag and type "Your name" inside it.', block: 'label', part: 'open', requiredText: 'Your name', praise: 'A clear label! 🏷️' },
        { text: 'Add the <input> block.', block: 'input', praise: 'Somewhere to type! ⌨️' },
      ],
      guide: [
        '<form> wraps the whole form.',
        '<label> says what a box is for.',
        '<input> is where people type.',
      ], },
      { id: 'html-15', title: 'Input Fields', emoji: '⌨️', text: 'Text boxes and fields where people type their answers.', lessonId: 'forms', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button', 'form', 'label', 'input', 'select', 'option'],
      note: [
        'Input fields come in many shapes: <input> text boxes, <textarea> big text areas, and <select> dropdowns with <option> choices.',
      ],
      mission: 'Create a dropdown with two choices and a big text area.',
      steps: [
        { text: 'Add the <select> open tag.', block: 'select', part: 'open', praise: 'A dropdown is born! 🪧' },
        { text: 'Add an <option> open tag and type "Red" inside it.', block: 'option', part: 'open', requiredText: 'Red', praise: 'Choice one! 🔴' },
        { text: 'Add another <option> open tag and type "Blue" inside it.', block: 'option', part: 'open', requiredText: 'Blue', praise: 'Choice two! 🔵' },
        { text: 'Add a <textarea> open tag and type "Tell me a story!" inside it.', block: 'textarea', part: 'open', requiredText: 'story', praise: 'A big typing area! 📜' },
      ],
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
      mission: 'Create a box that groups content inside.',
      steps: [
        { text: 'Add the <div> open tag.', block: 'div', part: 'open', praise: 'Your box is open! 📦' },
        { text: 'Add the <section> open tag inside it.', block: 'section', part: 'open', praise: 'A labeled box! 🏷️' },
        { text: 'Add an <h2> open tag and type "Inside the box" inside it.', block: 'h2', part: 'open', requiredText: 'Inside the box', praise: 'Content snuggled in! 🧸' },
      ],
      guide: [
        '<div> groups anything together.',
        '<section> groups related content.',
        '<article> = one complete piece, <aside> = side notes.',
      ], },
      { id: 'html-17', title: 'Classes & IDs', emoji: '🪪', text: 'Name your elements so you can style them and find them later.', tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'header', 'nav', 'main', 'footer', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button', 'form', 'label', 'input', 'select', 'option', 'div', 'section', 'article', 'aside'],
      note: [
        'Classes and IDs name your elements so CSS can style them.',
        'You will use them a lot in the next lessons!',
      ],
      mission: 'Create a page with a named paragraph and a named title.',
      steps: [
        { text: 'Add the <!DOCTYPE html> block.', block: 'doctype', praise: 'The magic starter line! ✨' },
        { text: 'Add the <html> open tag and the <body> open tag.', block: 'html', part: 'open' },
        { text: 'Add a <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "Classy words!" inside it.', block: 'p', part: 'open', requiredText: 'Classy words!', praise: 'Words with style! 🎽' },
        { text: 'Open the class= pill on that <p> and type note.', block: 'p', attr: 'class', value: 'note', praise: 'Your paragraph has a team name! 🏷️' },
        { text: 'Add an <h1> open tag and type "My Title" inside it.', block: 'h1', part: 'open', requiredText: 'My Title', praise: 'A grand title! 👑' },
        { text: 'Open the id= pill on that <h1> and type title.', block: 'h1', attr: 'id', value: 'title', praise: 'A one-of-a-kind name tag! 🪪' },
      ],
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
      {
        id: 'css-1', title: 'What is CSS?', emoji: '🎨',
        text: 'The styling language that colors, arranges and beautifies HTML pages.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1'],
        note: [
          'HTML builds the page — CSS paints it! CSS is the styling language that colors, arranges and beautifies everything.',
          'Think of HTML as the skeleton and CSS as the clothes: same bones, endless outfits!',
        ],
        mission: 'Build the skeleton of a page that is ready for paint.',
      steps: [
        { text: 'Add the <!DOCTYPE html> block.', block: 'doctype', praise: 'The magic starter line! ✨' },
        { text: 'Add the <html> open tag.', block: 'html', part: 'open' },
        { text: 'Add the <head> open tag.', block: 'head', part: 'open' },
        { text: 'Add the <title> open tag and type "My Painted Page" inside it.', block: 'title', part: 'open', requiredText: 'My Painted Page', praise: 'Your tab has a name! 📑' },
        { text: 'Add the <body> open tag.', block: 'body', part: 'open' },
        { text: 'Add the <h1> open tag and type "Ready for paint!" inside it.', block: 'h1', part: 'open', requiredText: 'Ready for paint!', praise: 'A clean canvas for CSS! 🎨' },
      ],
        guide: [
          'HTML = bones of the page.',
          'CSS = paint, sizes and layout.',
          'Every styled page starts with a tidy HTML structure.',
        ],
      },
      {
        id: 'css-2', title: 'CSS Syntax', emoji: '✍️',
        text: 'Rules made of a selector and declarations — property: value.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div'],
        note: [
          'A CSS declaration is a tiny paint order: property: value — like color: red.',
          'In Codivo you type declarations straight into the style pill of any block: style="color: red" — no style sheet needed!',
        ],
        mission: 'Create a paragraph with red words.',
      steps: [
        { text: 'Add the <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "Hello CSS!" inside it.', block: 'p', part: 'open', requiredText: 'Hello CSS!', praise: 'Words ready for paint! ✍️' },
        { text: 'Open the style= pill on that <p> and type color: red', block: 'p', attr: 'style', value: 'color:', praise: 'Your very first CSS paint! 🎨' },
      ],
        guide: [
          'Declarations = property: value.',
          'style="color: red" = the paint order.',
          'The preview shows your paint instantly!',
        ],
      },
      {
        id: 'css-3', title: 'Inline, Internal & External CSS', emoji: '📄',
        text: 'Three ways to add styles — inside tags, in a style tag, or in a separate file.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section'],
        note: [
          'Styles live in three homes: inline (right on the element), internal (in a style tag in the head), or external (a separate .css file).',
          'Codivo lessons use inline styles — they paint the element right away, perfect for experiments!',
        ],
        mission: 'Create a title that sits in the center.',
      steps: [
        { text: 'Add the <h1> open tag.', block: 'h1', part: 'open' },
        { text: 'Type "My Center" inside it.', block: 'h1', part: 'open', requiredText: 'My Center', praise: 'A title worth centering! 🎯' },
        { text: 'Open the style= pill on that <h1> and type text-align: center', block: 'h1', attr: 'style', value: 'text-align:', praise: 'Perfectly centered — inline style! 📄' },
      ],
        guide: [
          'Inline = style written straight on the element.',
          'Internal = style tag in the head.',
          'External = a separate .css file.',
        ],
      },
      {
        id: 'css-4', title: 'CSS Selectors', emoji: '🎯',
        text: 'Point at which elements to style — by tag, class or id.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p'],
        note: [
          'Selectors point at elements: tag names like h1, classes like .box, or ids like #special.',
          'Class = a team name (many can wear it), id = a name tag (only one!). Inline styles skip straight to the element.',
        ],
        mission: 'Create two paragraphs — one with a class name.',
      steps: [
        { text: 'Add the <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "Named paragraph" inside it.', block: 'p', part: 'open', requiredText: 'Named paragraph', praise: 'Words with a name! 🏷️' },
        { text: 'Open the class= pill on that <p> and type note.', block: 'p', attr: 'class', value: 'note', praise: 'CSS can find it now! 🎯' },
        { text: 'Add another <p> open tag and type "Plain paragraph" inside it.', block: 'p', part: 'open', requiredText: 'Plain paragraph', praise: 'Two different paragraphs! ✨' },
      ],
        guide: [
          'h1 = tag selector.',
          '.box = class selector (many).',
          '#special = id selector (only one).',
        ],
      },
      {
        id: 'css-5', title: 'Colors', emoji: '🖌️',
        text: 'Paint text and boxes with names, hex codes or rgb values.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong'],
        note: [
          'color paints the text, background-color paints the box behind it.',
          'Colors come as friendly names (red), hex codes (#ff6b9d) or rgb values — hex is a superhero secret code!',
        ],
        mission: 'Create pink text and a yellow box.',
      steps: [
        { text: 'Add the <h1> open tag.', block: 'h1', part: 'open' },
        { text: 'Type "Pink Power" inside it.', block: 'h1', part: 'open', requiredText: 'Pink Power', praise: 'A hero title! 🦸' },
        { text: 'Open the style= pill on that <h1> and type color: #ff6b9d', block: 'h1', attr: 'style', value: 'ff6b9d', praise: 'Hex code magic! 🔮' },
        { text: 'Add a <p> open tag and type "Yellow sunshine!" inside it.', block: 'p', part: 'open', requiredText: 'Yellow sunshine!', praise: 'Bright words! ☀️' },
        { text: 'Open the style= pill on that <p> and type background-color: yellow', block: 'p', attr: 'style', value: 'yellow', praise: 'A sunny box behind the words! 🖌️' },
      ],
        guide: [
          'color = text paint.',
          'background-color = box paint.',
          '#ff6b9d = hex code — 6 magic digits.',
        ],
      },
      {
        id: 'css-6', title: 'Backgrounds', emoji: '🖼️',
        text: 'Fill elements with colors, gradients and images.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav'],
        note: [
          'background-color fills a box with one color, background-image fills it with a picture.',
          'Gradients are backgrounds that melt two colors together — sky into sunset!',
        ],
        mission: 'Create a sky-blue section with words inside.',
      steps: [
        { text: 'Add the <section> open tag.', block: 'section', part: 'open' },
        { text: 'Open the style= pill on it and type background-color: lightskyblue', block: 'section', attr: 'style', value: 'lightskyblue', praise: 'Your sky panel is up! ☁️' },
        { text: 'Add a <p> open tag inside it and type "I live in the sky panel!" inside.', block: 'p', part: 'open', requiredText: 'sky panel', praise: 'A cozy place to live! 🏠' },
      ],
        guide: [
          'background-color = one color fill.',
          'background-image = picture fill.',
          'Gradient = two colors melting together.',
        ],
      },
      {
        id: 'css-7', title: 'Text Styling', emoji: '✒️',
        text: 'Bold, italic, underline and line-height — shape how words look.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em'],
        note: [
          'CSS sculpts words: font-weight makes them bold, font-style leans them, text-decoration underlines them.',
          'line-height gives words room to breathe — it is the space between lines.',
        ],
        mission: 'Create bold words and leaning words.',
      steps: [
        { text: 'Add the <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "Shouty words!" inside it.', block: 'p', part: 'open', requiredText: 'Shouty words!', praise: 'Loud and proud! 📢' },
        { text: 'Open the style= pill on that <p> and type font-weight: bold', block: 'p', attr: 'style', value: 'font-weight:', praise: 'Super bold! 💪' },
        { text: 'Add the <em> open tag and type "Leaning words!" inside it.', block: 'em', part: 'open', requiredText: 'Leaning words!', praise: 'Words that lean! 🌬️' },
        { text: 'Open the style= pill on that <em> and type font-style: italic', block: 'em', attr: 'style', value: 'font-style:', praise: 'Smooth and slanted! ✒️' },
      ],
        guide: [
          'font-weight: bold — shouty words.',
          'font-style: italic — leaning words.',
          'line-height — breathing room between lines.',
        ],
      },
      {
        id: 'css-8', title: 'Fonts', emoji: '🔤',
        text: 'Choose the style of letters and even load custom fonts.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main'],
        note: [
          'font-family chooses the letter style — like picking a voice for your page.',
          'Codivo uses Baloo for titles and Nunito for words — friendly fonts made for kids!',
        ],
        mission: 'Create words with a new font voice and size.',
      steps: [
        { text: 'Add the <h1> open tag.', block: 'h1', part: 'open' },
        { text: 'Type "New Voice!" inside it.', block: 'h1', part: 'open', requiredText: 'New Voice!', praise: 'A fresh voice! 🎤' },
        { text: 'Open the style= pill on that <h1> and type font-family: cursive', block: 'h1', attr: 'style', value: 'font-family:', praise: 'Fancy letters! 🔤' },
        { text: 'Add a <p> open tag and type "Bigger letters!" inside it.', block: 'p', part: 'open', requiredText: 'Bigger letters!', praise: 'Loud and clear! 📣' },
        { text: 'Open the style= pill on that <p> and type font-size: 20px', block: 'p', attr: 'style', value: 'font-size:', praise: 'Just the right size! 📏' },
      ],
        guide: [
          'font-family = the voice of your text.',
          'font-size = how big the letters are.',
          'Great pages pick 1–2 friendly fonts.',
        ],
      },
      {
        id: 'css-9', title: 'Borders', emoji: '🧱',
        text: 'Draw lines around boxes with width, style and color.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a'],
        note: [
          'A border is a line drawn around a box: border-width (thickness), border-style (solid, dashed, dotted) and border-color.',
          'The Codivo buttons you tap every day are just borders with round corners!',
        ],
        mission: 'Create a paragraph with a dashed border.',
      steps: [
        { text: 'Add the <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "Behind this dashed fence!" inside it.', block: 'p', part: 'open', requiredText: 'dashed fence', praise: 'Words with a fence! 🧱' },
        { text: 'Open the style= pill on that <p> and type border: 3px dashed orange', block: 'p', attr: 'style', value: 'dashed', praise: 'A dashed fence is up! 🚧' },
      ],
        guide: [
          'border-width = thickness.',
          'border-style = solid, dashed, dotted.',
          'border-color = the line paint.',
        ],
      },
      {
        id: 'css-10', title: 'Width & Height', emoji: '📏',
        text: 'Control exactly how big an element is.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img'],
        note: [
          'width and height set how big a box is — 300px is about the size of a chocolate bar!',
          'The img block you add is a picture box — CSS sizes it exactly how you want.',
        ],
        mission: 'Create a picture that is 200px wide.',
      steps: [
        { text: 'Add the <img> block.', block: 'img', praise: 'Your picture has a spot! 🖼️' },
        { text: 'Open the style= pill on it and type width: 200px', block: 'img', attr: 'style', value: 'width:', praise: 'A perfectly sized stamp! 📏' },
      ],
        guide: [
          'width = how wide.',
          'height = how tall.',
          'px = pixels — tiny squares of the screen.',
        ],
      },
      {
        id: 'css-11', title: 'Margins', emoji: '↔️',
        text: 'Space outside the border that pushes elements apart.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header'],
        note: [
          'The margin is invisible space OUTSIDE the border — it pushes boxes apart so they do not hug.',
          'margin: auto centers a box like magic!',
        ],
        mission: 'Create a paragraph with space around it.',
      steps: [
        { text: 'Add a <p> open tag and type "Give me space!" inside it.', block: 'p', part: 'open', requiredText: 'Give me space!', praise: 'A lonely word wants room! 🌌' },
        { text: 'Open the style= pill on that <p> and type margin: 30px', block: 'p', attr: 'style', value: 'margin:', praise: 'Space to breathe! ↔️' },
        { text: 'Add another <p> open tag and type "I like my personal space." inside it.', block: 'p', part: 'open', requiredText: 'personal space', praise: 'Two paragraphs, no hugging! 🤝' },
      ],
        guide: [
          'Margin = outside space.',
          'Big margins = boxes far apart.',
          'margin: auto = centered magic.',
        ],
      },
      {
        id: 'css-12', title: 'Padding', emoji: '🧦',
        text: 'Space inside the border that gives content breathing room.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer'],
        note: [
          'Padding is invisible space INSIDE the border, around the content — like a comfy cushion so text never touches the walls.',
          'Margin pushes others away; padding makes the box cozy inside.',
        ],
        mission: 'Create a paragraph with a cozy yellow cushion.',
      steps: [
        { text: 'Add the <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "Cozy words!" inside it.', block: 'p', part: 'open', requiredText: 'Cozy words!', praise: 'Snugly words! 🧸' },
        { text: 'Open the style= pill on that <p> and type padding: 20px', block: 'p', attr: 'style', value: 'padding:', praise: 'A comfy cushion! 🧦' },
        { text: 'Add background-color: yellow to the same style pill — separate them with a ;', block: 'p', attr: 'style', value: 'yellow', praise: 'Yellow fluff everywhere! 🟡' },
      ],
        guide: [
          'Padding = inside cushion.',
          'Margin = outside space.',
          'Cozy boxes have both!',
        ],
      },
      {
        id: 'css-13', title: 'The Box Model', emoji: '📦',
        text: 'Every element is a box: content, padding, border and margin.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button'],
        note: [
          'Every element is a secret box: content in the middle, then padding (cushion), then border (wall), then margin (yard).',
          'Understanding the box model is the superpower of every CSS wizard!',
        ],
        mission: 'Create a paragraph with the full box model.',
      steps: [
        { text: 'Add the <p> open tag.', block: 'p', part: 'open' },
        { text: 'Type "The whole box on me!" inside it.', block: 'p', part: 'open', requiredText: 'whole box', praise: 'A brave little box! 📦' },
        { text: 'Open the style= pill and type border: 3px solid black', block: 'p', attr: 'style', value: 'border:', praise: 'The wall is up! 🧱' },
        { text: 'Add padding: 15px to the same style pill.', block: 'p', attr: 'style', value: 'padding:', praise: 'The cushion is in! 🧦' },
        { text: 'Add margin: 20px to the same style pill.', block: 'p', attr: 'style', value: 'margin:', praise: 'And a yard outside! 🌳' },
        { text: 'Add background-color: lightyellow to finish the box.', block: 'p', attr: 'style', value: 'lightyellow', praise: 'The whole box model, done! 🏆' },
      ],
        guide: [
          'Content → Padding → Border → Margin.',
          'Padding = cushion inside.',
          'Margin = yard outside.',
        ],
      },
      {
        id: 'css-14', title: 'display', emoji: '🧭',
        text: 'Switch elements between block, inline and more.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form'],
        note: [
          'display decides how an element behaves: block boxes stack on their own line, inline elements sit side by side in a sentence.',
          'display: none hides things like a magic trick!',
        ],
        mission: 'Create two links — one that takes its own line.',
      steps: [
        { text: 'Add an <a> open tag and type "Link one" inside it.', block: 'a', part: 'open', requiredText: 'Link one', praise: 'First link! 🔗' },
        { text: 'Open the style= pill on it and type display: block', block: 'a', attr: 'style', value: 'display:', praise: 'It took its own line! 🧭' },
        { text: 'Add another <a> open tag and type "Link two" inside it.', block: 'a', part: 'open', requiredText: 'Link two', praise: 'Staying in the row! ↩️' },
      ],
        guide: [
          'block = takes its own line.',
          'inline = sits in the sentence.',
          'none = gone! (a magic trick)',
        ],
      },
      {
        id: 'css-15', title: 'Flexbox', emoji: '🧲',
        text: 'Magically line things up in rows and columns with flex.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul'],
        note: [
          'Flexbox is the layout wizard: display: flex lines up children in a row or column, and justify-content spreads them out.',
          'Nav bars, card rows and menus are all flexbox at work!',
        ],
        mission: 'Create a flex row with two pictures side by side.',
      steps: [
        { text: 'Add the <div> open tag.', block: 'div', part: 'open', praise: 'The wizard box is open! 🪄' },
        { text: 'Open the style= pill on it and type display: flex', block: 'div', attr: 'style', value: 'flex', praise: 'The flex wizard is awake! 🧲' },
        { text: 'Add the <img> block inside the div.', block: 'img', praise: 'Picture one is in! 🖼️' },
        { text: 'Add another <img> block inside the div.', block: 'img', praise: 'Side by side — look at that row! ✨' },
      ],
        guide: [
          'display: flex = activate the wizard.',
          'flex-direction = row or column.',
          'justify-content = spread the children.',
        ],
      },
      {
        id: 'css-16', title: 'Positioning', emoji: '🎯',
        text: 'Place elements exactly where you want with relative, absolute and more.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul', 'ol', 'li'],
        note: [
          'position: relative nudges a box from where it would normally sit; position: absolute places it exactly inside its parent.',
          'position: fixed makes an element stick to the screen — like a nav that follows you!',
        ],
        mission: 'Create a heading that gets nudged from its spot.',
      steps: [
        { text: 'Add the <h2> open tag.', block: 'h2', part: 'open' },
        { text: 'Type "Nudge me!" inside it.', block: 'h2', part: 'open', requiredText: 'Nudge me!', praise: 'A wiggly title! 🐛' },
        { text: 'Open the style= pill on that <h2> and type position: relative', block: 'h2', attr: 'style', value: 'position:', praise: 'Ready to move! 🎯' },
      ],
        guide: [
          'relative = nudge from home.',
          'absolute = exact spot in the parent.',
          'fixed = stuck to the screen.',
        ],
      },
      {
        id: 'css-17', title: 'Shadows', emoji: '🌑',
        text: 'Add depth with box-shadow and text-shadow.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul', 'ol', 'li', 'h2'],
        note: [
          'box-shadow draws a soft shadow behind a box — instant 3D pop!',
          'text-shadow puts a glow behind letters so they lift off the page.',
        ],
        mission: 'Create a glowing title and a floating box.',
      steps: [
        { text: 'Add the <h2> open tag.', block: 'h2', part: 'open' },
        { text: 'Type "Glowy title!" inside it.', block: 'h2', part: 'open', requiredText: 'Glowy title!', praise: 'A sparkling name! ✨' },
        { text: 'Open the style= pill on it and type text-shadow: 2px 2px 3px pink', block: 'h2', attr: 'style', value: 'text-shadow:', praise: 'Letters lift off the page! 🌑' },
        { text: 'Add a <p> open tag and type "Floaty box!" inside it.', block: 'p', part: 'open', requiredText: 'Floaty box!', praise: 'Words that float! 🎈' },
        { text: 'Open the style= pill on that <p> and type box-shadow: 4px 4px 8px grey', block: 'p', attr: 'style', value: 'box-shadow:', praise: 'Instant 3D pop! 🕶️' },
      ],
        guide: [
          'box-shadow = shadow behind the box.',
          'text-shadow = glow behind letters.',
          'Shadows = depth without moving!',
        ],
      },
      {
        id: 'css-18', title: 'Border Radius', emoji: '⚪',
        text: 'Round the corners of boxes — or turn them into circles!',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul', 'ol', 'li', 'h2', 'table', 'tr', 'td', 'th'],
        note: [
          'border-radius rounds the corners of a box — 50% turns a square into a perfect circle!',
          'Every friendly button you tap is rounded with border-radius.',
        ],
        mission: 'Create a picture that is a perfect circle.',
      steps: [
        { text: 'Add the <img> block.', block: 'img', praise: 'Your picture has a spot! 🖼️' },
        { text: 'Open the style= pill on it and type border-radius: 50%', block: 'img', attr: 'style', value: 'border-radius:', praise: 'Look — a perfect circle! ⚪' },
      ],
        guide: [
          'Small radius = slightly soft corners.',
          'Big radius = pill or circle!',
          'border-radius: 50% = a circle.',
        ],
      },
      {
        id: 'css-19', title: 'Images in CSS', emoji: '🖼️',
        text: 'Size, round and style images on your page.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul', 'ol', 'li', 'h2', 'table', 'tr', 'td', 'th', 'input', 'label'],
        note: [
          'CSS controls images: max-width keeps them inside their box, border-radius rounds them, filters add effects.',
          'An image with a class becomes a photo frame you can style any way you like!',
        ],
        mission: 'Create a framed picture that never overflows.',
      steps: [
        { text: 'Add the <img> block.', block: 'img', praise: 'Your photo is in! 🖼️' },
        { text: 'Open the style= pill on it and type max-width: 100%', block: 'img', attr: 'style', value: 'max-width:', praise: 'It will never overflow! 🛡️' },
        { text: 'Add border-radius: 12px to the same style pill.', block: 'img', attr: 'style', value: 'border-radius:', praise: 'Soft corners! 😊' },
        { text: 'Add border: 3px solid rebeccapurple to finish the frame.', block: 'img', attr: 'style', value: 'rebeccapurple', praise: 'A royal purple frame! 👑' },
      ],
        guide: [
          'max-width = never overflow the box.',
          'border-radius = round the photo.',
          'Filters = little photo magic tricks.',
        ],
      },
      {
        id: 'css-20', title: 'Hover Effects', emoji: '🖱️',
        text: 'Change styles when the mouse points at an element.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul', 'ol', 'li', 'h2', 'table', 'tr', 'td', 'th', 'input', 'label', 'select', 'option'],
        note: [
          ':hover changes an element when the mouse points at it — buttons glow, cards lift, links turn colors!',
          ':hover lives in style sheets, so Codivo teaches it in the CSS projects — for now, style a button that begs to be hovered!',
        ],
        mission: 'Create a juicy button that begs to be tapped.',
      steps: [
        { text: 'Add the <button> open tag.', block: 'button', part: 'open' },
        { text: 'Type "Hover me!" inside it.', block: 'button', part: 'open', requiredText: 'Hover me!', praise: 'A button that begs to be tapped! 🖱️' },
        { text: 'Open the style= pill and type background-color: #ff8c42', block: 'button', attr: 'style', value: 'ff8c42', praise: 'Juicy orange! 🍊' },
        { text: 'Add color: white and border-radius: 12px to the same style pill.', block: 'button', attr: 'style', value: 'border-radius:', praise: 'Soft and tasty! 🍬' },
      ],
        guide: [
          ':hover = when the mouse points.',
          'Inline styles cannot hover — hover needs a style sheet!',
          'The CSS projects teach hover for real.',
        ],
      },
      {
        id: 'css-21', title: 'Simple Animations', emoji: '🎬',
        text: 'Make elements move, fade and wiggle with transitions and keyframes.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul', 'ol', 'li', 'h2', 'table', 'tr', 'td', 'th', 'input', 'label', 'select', 'option', 'article', 'aside'],
        note: [
          'transitions smoothly change a style — hover a button and it glides, not jumps!',
          'Animations live in style sheets — so Codivo teaches the moving stuff in the CSS projects. Get ready to wiggle!',
        ],
        mission: 'Create a squishy button that looks ready to bounce.',
      steps: [
        { text: 'Add the <button> open tag.', block: 'button', part: 'open' },
        { text: 'Type "Bouncy!" inside it.', block: 'button', part: 'open', requiredText: 'Bouncy!', praise: 'A springy button! 🏀' },
        { text: 'Open the style= pill and type background-color: #7c3aed', block: 'button', attr: 'style', value: '7c3aed', praise: 'Purple power! 💜' },
        { text: 'Add box-shadow: 0 6px 0 #4c1d95 to the same style pill.', block: 'button', attr: 'style', value: 'box-shadow:', praise: 'A squishy bottom edge! 🎬' },
      ],
        guide: [
          'transition = smooth glide.',
          'keyframes = storyboard of styles.',
          'Codivo projects teach the moving versions!',
        ],
      },
      {
        id: 'css-22', title: 'Responsive Design', emoji: '📱',
        text: 'Make your page look great on phones, tablets and big screens.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul', 'ol', 'li', 'h2', 'table', 'tr', 'td', 'th', 'input', 'label', 'select', 'option', 'article', 'aside', 'h3'],
        note: [
          'A responsive page changes shape for the screen: one column on a phone, many columns on a big screen.',
          'media queries ask "how wide is the screen?" and switch styles to match — they live in style sheets, so the CSS projects teach them!',
        ],
        mission: 'Create a picture that is safe on phones.',
      steps: [
        { text: 'Add the <img> block.', block: 'img', praise: 'Your picture is in! 🖼️' },
        { text: 'Open the style= pill on it and type max-width: 100%', block: 'img', attr: 'style', value: 'max-width:', praise: 'Phone-safe picture! 📱' },
      ],
        guide: [
          'Phone = one column.',
          'Big screen = many columns.',
          'max-width: 100% = never overflow!',
        ],
      },
      {
        id: 'css-23', title: 'CSS with HTML', emoji: '🔗',
        text: 'Put your HTML and CSS together to build complete styled pages.',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul', 'ol', 'li', 'h2', 'table', 'tr', 'td', 'th', 'input', 'label', 'select', 'option', 'article', 'aside', 'h3'],
        note: [
          'HTML + CSS = the whole recipe. HTML serves the ingredients, CSS plates them beautifully.',
          'Every real website on the internet is made of these two — you know them both now!',
        ],
        mission: 'Create a whole painted page with all the parts.',
      steps: [
        { text: 'Add the <header> open tag.', block: 'header', part: 'open', praise: 'Top of the page! 🎪' },
        { text: 'Add an <h1> inside it, type "My Big Page", and give it style= color: #ff6b9d', block: 'h1', part: 'open', requiredText: 'My Big Page', praise: 'A pink superstar title! 🌟' },
        { text: 'Add the <nav> open tag.', block: 'nav', part: 'open', praise: 'Menu time! 🧭' },
        { text: 'Add an <a> inside it and type "Home" with style= color: blue', block: 'a', part: 'open', requiredText: 'Home', praise: 'A blue home link! 🏠' },
        { text: 'Add the <main> open tag.', block: 'main', part: 'open', praise: 'The heart of the page! 💖' },
        { text: 'Add a <p> inside it, type "Styled with inline CSS!", and give it style= font-size: 20px', block: 'p', part: 'open', requiredText: 'inline CSS', praise: 'Big proud words! 📢' },
        { text: 'Add the <footer> open tag and give it style= background-color: lightyellow', block: 'footer', attr: 'style', value: 'lightyellow', praise: 'A sunny footer — page complete! 🏆' },
      ],
        guide: [
          'HTML builds, CSS paints.',
          'style pills paint each element.',
          'Structure first, style second!',
        ],
      },
      {
        id: 'css-24', title: 'CSS challenge', emoji: '🎯',
        text: 'Beat the Color It In game and earn your Color Brush sticker!',
        tags: ['doctype', 'html', 'head', 'title', 'textarea', 'body', 'h1', 'div', 'section', 'p', 'strong', 'nav', 'em', 'main', 'a', 'img', 'header', 'footer', 'button', 'form', 'ul', 'ol', 'li', 'h2', 'table', 'tr', 'td', 'th', 'input', 'label', 'select', 'option', 'article', 'aside', 'h3'],
        note: [
          'Time to prove your CSS powers in the Color It In game!',
          'Finish it to earn the Color Brush sticker and unlock the next adventure.',
        ],
        mission: 'Create your masterpiece with everything you know.',
      steps: [
        { text: 'Add an <h1>, type "Color It In!", and give it style= color: #ff6b9d', block: 'h1', part: 'open', requiredText: 'Color It In!', praise: 'A champion title! 🏆' },
        { text: 'Add a <p>, type "My painted masterpiece!", and give it style= background-color: lightyellow', block: 'p', part: 'open', requiredText: 'masterpiece', praise: 'A painted paragraph! 🎨' },
        { text: 'Add an <img> and give it style= border-radius: 50%', block: 'img', attr: 'style', value: 'border-radius:', praise: 'A perfect circle picture! ⚪' },
        { text: 'Add a <button> and give it style= background-color: #7c3aed; color: white', block: 'button', attr: 'style', value: '7c3aed', praise: 'A bouncy purple button! 💜' },
      ],
        guide: [
          'You know HTML and CSS!',
          'Win the challenge to earn a sticker.',
          'Keep building — the web is yours!',
        ],
      },
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