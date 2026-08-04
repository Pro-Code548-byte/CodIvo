export const languages = [
  {
    id: 'html',
    name: 'HTML',
    fullName: 'HyperText Markup Language',
    tagline: 'The skeleton of every webpage',
    description:
      'HTML gives structure to everything on the web. Learn to mark up text, media, and forms with semantic tags that browsers and assistive technology understand.',
    outline: [
      {
        title: 'Getting Started',
        topics: [
          'How the web works (browser, server, request/response)',
          'What HTML is and why it matters',
          'Creating your first .html file',
          'Doctype, html, head, and body structure',
          'Viewing pages and source code in the browser',
        ],
      },
      {
        title: 'Text & Structure',
        topics: [
          'Headings (h1 - h6) and paragraphs',
          'Bold, italics, and emphasis',
          'Unordered and ordered lists',
          'Links (a) and attributes',
          'Images (img), alt text, and figure',
          'Divs, spans, and comments',
        ],
      },
      {
        title: 'Semantic HTML',
        topics: [
          'header, nav, main, section, article, footer',
          'Why semantics matter for accessibility and SEO',
          'When to use a div vs a semantic element',
          'WAI-ARIA basics (roles, aria-label)',
        ],
      },
      {
        title: 'Forms & Input',
        topics: [
          'The form element, action, and method',
          'Input types (text, email, password, number, checkbox, radio)',
          'Labels and accessibility',
          'Selects, textareas, and buttons',
          'Basic validation and required fields',
        ],
      },
      {
        title: 'Tables & Media',
        topics: [
          'Tables (table, tr, td, th) and caption',
          'audio and video elements',
          'iframes and embedded content',
        ],
      },
      {
        title: 'Best Practices',
        topics: [
          'Valid nesting and closing tags',
          'Meaningful, lowercase names',
          'Alt text and accessible forms',
          'Page structure that is SEO friendly',
          'Validating your HTML',
        ],
      },
    ],
    essentials: [
      'Structure a page with the doctype, html, head, and body',
      'Write semantic tags instead of endless divs',
      'Know block vs inline elements and nesting rules',
      'Use attributes like id, class, href, and src correctly',
      'Build accessible forms with labels and correct input types',
      'Add media with proper fallback and alt text',
      'Validate your HTML so it has no errors',
    ],
  },
  {
    id: 'css',
    name: 'CSS',
    fullName: 'Cascading Style Sheets',
    tagline: 'The skin and layout of the web',
    description:
      'CSS controls color, spacing, and layout. Learn the box model, Flexbox, Grid, and responsive techniques that make pages beautiful on every screen.',
    outline: [
      {
        title: 'Getting Started',
        topics: [
          'What CSS is and how it works with HTML',
          'Inline, internal, and external styles',
          'Selectors, properties, and values',
          'Colors, backgrounds, and font basics',
          'Using the browser DevTools to inspect styles',
        ],
      },
      {
        title: 'The Box Model',
        topics: [
          'Content, padding, border, and margin',
          'Width, height, and box-sizing',
          'Units: px, rem, em, %, vw, vh',
          'Overflow and how boxes interact',
        ],
      },
      {
        title: 'Layout',
        topics: [
          'display: block, inline, inline-block, none',
          'Positioning (static, relative, absolute, fixed, sticky)',
          'Flexbox: direction, alignment, wrapping, gaps',
          'Grid: tracks, areas, and alignment',
          'Centering things vertically and horizontally',
        ],
      },
      {
        title: 'Typography & Effects',
        topics: [
          'Fonts, weights, and line-height',
          'Text alignment and decoration',
          'Borders, border-radius, and shadows',
          'Transitions and simple animations',
          'Pseudo-classes and pseudo-elements',
        ],
      },
      {
        title: 'Responsive Design',
        topics: [
          'Media queries and breakpoints',
          'Mobile-first vs desktop-first',
          'Fluid units and max-width',
          'Responsive images and typography',
          'Common responsive patterns (nav, cards, grids)',
        ],
      },
      {
        title: 'Best Practices',
        topics: [
          'The cascade and specificity',
          'Inheritance and the universal selector',
          'CSS custom properties (variables)',
          'Naming conventions like BEM',
          'Organizing your stylesheets',
        ],
      },
    ],
    essentials: [
      'Explain the cascade, inheritance, and specificity',
      'Master the box model and box-sizing',
      'Style with Flexbox and CSS Grid confidently',
      'Understand all four position values',
      'Use rem and em units consistently',
      'Write media queries for mobile, tablet, and desktop',
      'Use CSS variables for themes and maintainable code',
      'Debug styles using the browser DevTools',
    ],
  },
  {
    id: 'js',
    name: 'JavaScript',
    fullName: 'The language of the web',
    tagline: 'Makes pages interactive',
    description:
      'JavaScript turns static pages into apps. Start with the language core, then move to the DOM, events, and asynchronous programming.',
    outline: [
      {
        title: 'Getting Started',
        topics: [
          'What JavaScript does and where it runs',
          'Adding scripts to a page',
          'The console and debugging with console.log',
          'Variables: let, const, and var',
          'Naming conventions',
        ],
      },
      {
        title: 'Types & Operators',
        topics: [
          'Primitives: string, number, boolean, null, undefined',
          'typeof and type conversion',
          'Template literals',
          'Arithmetic, comparison, and logical operators',
          'Truthy and falsy values',
        ],
      },
      {
        title: 'Control Flow',
        topics: [
          'if, else if, and else',
          'Switch statements',
          'while and do-while loops',
          'for loops and iterating with for...of',
          'The ternary operator',
        ],
      },
      {
        title: 'Functions',
        topics: [
          'Function declarations and expressions',
          'Arrow functions',
          'Parameters, arguments, and return values',
          'Scope and closures',
          'Callbacks and higher-order functions',
        ],
      },
      {
        title: 'Arrays & Objects',
        topics: [
          'Creating and accessing arrays',
          'Array methods: map, filter, reduce, forEach, find',
          'Object literals and properties',
          'Destructuring and spread',
          'JSON.stringify and JSON.parse',
        ],
      },
      {
        title: 'DOM & Events',
        topics: [
          'Selecting elements (querySelector, getElementById)',
          'Creating, changing, and removing elements',
          'addEventListener and event objects',
          'Forms, inputs, and reading values',
          'Classes and attributes manipulation',
        ],
      },
      {
        title: 'Asynchronous JavaScript',
        topics: [
          'Callbacks and callback hell',
          'Promises and chaining',
          'async/await and error handling',
          'fetch and working with APIs',
          'setTimeout and setInterval',
        ],
      },
      {
        title: 'Modern JavaScript',
        topics: [
          'ES modules (import/export)',
          'Classes and inheritance',
          'Optional chaining and nullish coalescing',
          'Error handling with try/catch',
          'Working with npm and bundlers (overview)',
        ],
      },
    ],
    essentials: [
      'Declare variables with let and const appropriately',
      'Know the difference between primitives and objects',
      'Write functions and understand scope',
      'Use array methods like map, filter, and reduce',
      'Select and manipulate DOM elements',
      'Handle events on buttons, forms, and inputs',
      'Fetch data from an API with async/await',
      'Debug with the console and DevTools breakpoints',
      'Read and write clean, error-handled code',
    ],
  },
  {
    id: 'python',
    name: 'Python',
    fullName: 'A general-purpose programming language',
    tagline: 'Readable, powerful, everywhere',
    description:
      'Python is famous for its clean syntax and huge ecosystem. Learn the core language, data structures, and the tools used in web, data, and automation projects.',
    outline: [
      {
        title: 'Getting Started',
        topics: [
          'What Python is used for (web, data, scripting, AI)',
          'Installing Python and running scripts',
          'The interactive REPL',
          'Variables and dynamic typing',
          'print() and comments',
        ],
      },
      {
        title: 'Types & Operators',
        topics: [
          'Integers, floats, strings, and booleans',
          'None and type()',
          'String methods and formatting (f-strings)',
          'Arithmetic, comparison, and logical operators',
          'Converting between types',
        ],
      },
      {
        title: 'Control Flow',
        topics: [
          'if, elif, and else',
          'while loops',
          'for loops and range()',
          'break, continue, and pass',
          'Comprehensions (list and dict)',
        ],
      },
      {
        title: 'Data Structures',
        topics: [
          'Lists and common methods',
          'Tuples and when to use them',
          'Dictionaries and their methods',
          'Sets and set operations',
          'Indexing, slicing, and unpacking',
        ],
      },
      {
        title: 'Functions',
        topics: [
          'def, parameters, and return',
          'Default and keyword arguments',
          '*args and **kwargs',
          'Scope: local, enclosing, global',
          'Lambdas and built-in functions (map, filter, sorted)',
        ],
      },
      {
        title: 'Object-Oriented Programming',
        topics: [
          'Classes and objects',
          'Instance attributes and methods',
          '__init__ and dunder methods',
          'Inheritance and super()',
          'Properties and encapsulation basics',
        ],
      },
      {
        title: 'Files & Errors',
        topics: [
          'Opening and reading files',
          'Writing and appending to files',
          'with statements and context managers',
          'try/except and raising exceptions',
          'Common exception types',
        ],
      },
      {
        title: 'Modules & Ecosystem',
        topics: [
          'import and from...import',
          'Creating your own modules',
          'pip and installing packages',
          'Virtual environments',
          'Overview of popular libraries (requests, pandas, Django, Flask)',
        ],
      },
    ],
    essentials: [
      'Write Python with correct indentation',
      'Use lists, dicts, and tuples appropriately',
      'Read and write files safely with with',
      'Handle errors with try/except',
      'Define and call your own functions',
      'Import modules and install packages with pip',
      'Build a small class and use inheritance',
      'Understand f-strings and string formatting',
    ],
  },
]
