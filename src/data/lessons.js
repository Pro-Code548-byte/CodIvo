const T = (id, type, extra = {}) => ({ id, type, ...extra })

const SKELETON = {
  id: 's-skeleton',
  title: 'The Skeleton',
  text: 'Start with the page skeleton you already know: DOCTYPE, HTML, HEAD with a TITLE, and BODY.',
  blocks: ['t-doctype', 't-html', 't-head', 't-title', 't-body'],
}

export const lessons = [
  {
    id: 'page-bones',
    order: 1,
    title: 'Page Bones',
    emoji: '🦴',
    category: 'Basic HTML',
    themeClass: 'bg-ocean text-ocean-foreground',
    companionLine: "Let's build the skeleton of a web page! Drag the blocks into the workspace. 🦴",
    toolbox: ['doctype', 'html', 'head', 'title', 'body'],
    steps: [
      {
        id: 's1',
        title: 'The First Line',
        syntax: '<!DOCTYPE html>',
        text: 'Every web page starts with the DOCTYPE line. It tells the browser: "This is an HTML page!" Drag it to the very top of the workspace.',
        blocks: ['t-doctype'],
      },
      {
        id: 's2',
        title: 'The Root',
        syntax: '<html>',
        text: 'The HTML tag is the root of the page — every other tag lives inside it, like a big tree trunk.',
        blocks: ['t-html'],
      },
      {
        id: 's3',
        title: 'Secret Info',
        syntax: '<head>',
        text: 'The HEAD holds secret page information, like the TITLE you see on the browser tab. Drop HEAD inside HTML, then drop TITLE inside HEAD and type a name for your page!',
        blocks: ['t-head', 't-title'],
      },
      {
        id: 's4',
        title: 'The Body',
        syntax: '<body>',
        text: 'The BODY holds everything you can SEE on the page. Drop it inside HTML — the next lessons will fill it with words!',
        blocks: ['t-body'],
      },
    ],
    target: [
      T('t-doctype', 'doctype'),
      T('t-html', 'html', {
        children: [
          T('t-head', 'head', {
            children: [T('t-title', 'title', { defaults: { content: 'My Cool Page' } })],
          }),
          T('t-body', 'body'),
        ],
      }),
    ],
  },
  {
    id: 'words',
    order: 2,
    title: 'Words',
    emoji: '✍️',
    category: 'Text',
    themeClass: 'bg-sunny text-sunny-foreground',
    companionLine: 'Words make pages interesting! Try the H1 and P blocks. ✍️',
    toolbox: ['doctype', 'html', 'head', 'title', 'body', 'h1', 'h2', 'p'],
    steps: [
      SKELETON,
      {
        id: 's-words',
        title: 'The Big Sign',
        syntax: '<h1>',
        text: 'An H1 is the biggest heading on the page — like the title of the whole website. Drop it inside BODY and type your own words!',
        blocks: ['t-h1'],
      },
      {
        id: 's-p',
        title: 'The Paragraph',
        syntax: '<p>',
        text: 'A P is a paragraph of normal-sized words — the story part of your page. Drop it inside BODY and type a sentence about yourself!',
        blocks: ['t-p'],
      },
    ],
    target: [
      T('t-doctype', 'doctype'),
      T('t-html', 'html', {
        children: [
          T('t-head', 'head', {
            children: [T('t-title', 'title', { defaults: { content: 'My Cool Page' } })],
          }),
          T('t-body', 'body', {
            children: [
              T('t-h1', 'h1', { defaults: { content: 'Welcome to my page!' } }),
              T('t-p', 'p', { defaults: { content: 'I am learning to build web pages with Codivo!' } }),
            ],
          }),
        ],
      }),
    ],
  },
  {
    id: 'page-parts',
    order: 3,
    title: 'Page Parts',
    emoji: '🧩',
    category: 'Semantic HTML',
    themeClass: 'bg-jungle text-jungle-foreground',
    companionLine: "Use the right tag for the right part — that's what real builders do! 🧩",
    toolbox: ['doctype', 'html', 'head', 'title', 'body', 'h1', 'h2', 'p', 'header', 'nav', 'main', 'section', 'article', 'footer', 'div'],
    steps: [
      SKELETON,
      {
        id: 's-header',
        title: 'The Welcome Sign',
        syntax: '<header>',
        text: 'A HEADER is the top part of a webpage — like a welcome sign. Drop it inside BODY and put an H1 inside it with the name of your site!',
        blocks: ['t-header', 't-h1'],
      },
      {
        id: 's-nav',
        title: 'The Menu',
        syntax: '<nav>',
        text: 'A NAV holds the menu with links to the other parts of a website. Drop it inside BODY, right after the header.',
        blocks: ['t-nav'],
      },
      {
        id: 's-main',
        title: 'The Heart of the Page',
        syntax: '<main>',
        text: 'MAIN holds the most important content. Put a SECTION inside it — sections group related ideas together. Add an H2 and a paragraph inside the section!',
        blocks: ['t-main', 't-section', 't-h2', 't-p'],
      },
      {
        id: 's-footer',
        title: 'The Footer',
        syntax: '<footer>',
        text: 'A FOOTER is the bottom of the page — often with a "Made by…" message. Drop it inside BODY, at the very end.',
        blocks: ['t-footer'],
      },
    ],
    target: [
      T('t-doctype', 'doctype'),
      T('t-html', 'html', {
        children: [
          T('t-head', 'head', {
            children: [T('t-title', 'title', { defaults: { content: 'My Cool Page' } })],
          }),
          T('t-body', 'body', {
            children: [
              T('t-header', 'header', {
                children: [T('t-h1', 'h1', { defaults: { content: 'My Cool Website' } })],
              }),
              T('t-nav', 'nav'),
              T('t-main', 'main', {
                children: [
                  T('t-section', 'section', {
                    children: [
                      T('t-h2', 'h2', { defaults: { content: 'About Me' } }),
                      T('t-p', 'p', { defaults: { content: 'I am learning to build web pages with Codivo!' } }),
                    ],
                  }),
                ],
              }),
              T('t-footer', 'footer'),
            ],
          }),
        ],
      }),
    ],
  },
  {
    id: 'pictures-links',
    order: 4,
    title: 'Pictures & Links',
    emoji: '🖼️',
    category: 'Images & Links',
    themeClass: 'bg-grape text-grape-foreground',
    companionLine: 'Pictures and links make a page come alive! 🖼️',
    toolbox: ['doctype', 'html', 'head', 'title', 'body', 'h1', 'h2', 'p', 'header', 'nav', 'main', 'section', 'article', 'footer', 'div', 'img', 'a'],
    steps: [
      SKELETON,
      {
        id: 's-parts',
        title: 'Page Parts',
        text: 'Build the page with the parts you know: a HEADER with an H1, a NAV, a MAIN with a SECTION (an H2 and a paragraph), and a FOOTER.',
        blocks: ['t-header', 't-h1', 't-nav', 't-main', 't-section', 't-h2', 't-p', 't-footer'],
      },
      {
        id: 's-img',
        title: 'A Picture!',
        syntax: '<img>',
        text: 'An IMG shows a picture. It needs a URL — the picture\u2019s address on the internet — and a short description called alt. Fill in the two boxes inside the block!',
        blocks: ['t-img'],
      },
      {
        id: 's-a',
        title: 'A Link',
        syntax: '<a>',
        text: 'An A block makes a clickable link. Type the words people click, and the href — the place it jumps to!',
        blocks: ['t-a'],
      },
    ],
    target: [
      T('t-doctype', 'doctype'),
      T('t-html', 'html', {
        children: [
          T('t-head', 'head', {
            children: [T('t-title', 'title', { defaults: { content: 'My Cool Page' } })],
          }),
          T('t-body', 'body', {
            children: [
              T('t-header', 'header', {
                children: [T('t-h1', 'h1', { defaults: { content: 'My Cool Website' } })],
              }),
              T('t-nav', 'nav'),
              T('t-main', 'main', {
                children: [
                  T('t-section', 'section', {
                    children: [
                      T('t-h2', 'h2', { defaults: { content: 'About Me' } }),
                      T('t-p', 'p', { defaults: { content: 'I am learning to build web pages with Codivo!' } }),
                      T('t-img', 'img'),
                      T('t-a', 'a', { defaults: { content: 'Visit my site!' } }),
                    ],
                  }),
                ],
              }),
              T('t-footer', 'footer'),
            ],
          }),
        ],
      }),
    ],
  },
  {
    id: 'forms',
    order: 5,
    title: 'Forms',
    emoji: '📨',
    category: 'Forms',
    themeClass: 'bg-space text-space-foreground',
    companionLine: "Let's make a form that asks people questions! 📨",
    toolbox: ['doctype', 'html', 'head', 'title', 'body', 'h1', 'h2', 'p', 'header', 'nav', 'main', 'section', 'article', 'footer', 'div', 'img', 'a', 'form', 'label', 'input', 'button'],
    steps: [
      SKELETON,
      {
        id: 's-parts',
        title: 'Page Parts',
        text: 'Build the page parts you know: a HEADER with an H1, a NAV, a MAIN with a SECTION (an H2), and a FOOTER.',
        blocks: ['t-header', 't-h1', 't-nav', 't-main', 't-section', 't-h2', 't-footer'],
      },
      {
        id: 's-form',
        title: 'The Form',
        syntax: '<form>',
        text: 'A FORM collects information from people who visit the page — like names or messages. Drop it inside the section.',
        blocks: ['t-form'],
      },
      {
        id: 's-label',
        title: 'The Name Tag',
        syntax: '<label>',
        text: 'A LABEL is a little name tag that says what an input box is for. Put it inside the form and type the question you want to ask!',
        blocks: ['t-label'],
      },
      {
        id: 's-input',
        title: 'The Answer Box',
        syntax: '<input>',
        text: 'An INPUT is the box where people type their answers. Drop it inside the form.',
        blocks: ['t-input'],
      },
      {
        id: 's-button',
        title: 'The Send Button',
        syntax: '<button>',
        text: 'A BUTTON sends the form! Drop it inside the form and give it a name, like "Send!"',
        blocks: ['t-button'],
      },
    ],
    target: [
      T('t-doctype', 'doctype'),
      T('t-html', 'html', {
        children: [
          T('t-head', 'head', {
            children: [T('t-title', 'title', { defaults: { content: 'My Cool Page' } })],
          }),
          T('t-body', 'body', {
            children: [
              T('t-header', 'header', {
                children: [T('t-h1', 'h1', { defaults: { content: 'My Cool Website' } })],
              }),
              T('t-nav', 'nav'),
              T('t-main', 'main', {
                children: [
                  T('t-section', 'section', {
                    children: [
                      T('t-h2', 'h2', { defaults: { content: 'Say hello!' } }),
                      T('t-form', 'form', {
                        children: [
                          T('t-label', 'label', { defaults: { content: 'Your name' } }),
                          T('t-input', 'input'),
                          T('t-button', 'button', { defaults: { content: 'Send!' } }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              T('t-footer', 'footer'),
            ],
          }),
        ],
      }),
    ],
  },
]

export function lessonById(id) {
  return lessons.find((lesson) => lesson.id === id)
}

export function matchTree(targets, program) {
  const out = new Map()
  const walk = (tNodes, pNodes) => {
    const remaining = [...tNodes]
    for (const pn of pNodes) {
      const i = remaining.findIndex((t) => t.type === pn.type)
      if (i !== -1) {
        const [t] = remaining.splice(i, 1)
        out.set(t.id, pn)
        walk(t.children ?? [], pn.children ?? [])
      }
    }
  }
  walk(targets, program)
  return out
}

export function countNodes(target) {
  return target.reduce((n, node) => n + 1 + (node.children ? countNodes(node.children) : 0), 0)
}

export function unlockInfo(id) {
  for (const lesson of lessons) {
    if (lesson.toolbox.includes(id)) return lesson
  }
  return null
}