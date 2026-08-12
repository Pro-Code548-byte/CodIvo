import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home 🏠' },
  { to: '/map', label: 'Learn 🚀' },
  { to: '/race', label: 'Duel ⚔️' },
  { to: '/race-bot', label: 'Race Bot 🤖' },
  { to: '/trophies', label: 'Trophies 🏆' },
]

export default function Footer() {
  return (
    <footer className="border-t-4 border-card/60 bg-card/50">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
        <p className="font-display text-xl font-extrabold text-primary">
          🧩 Codivo <span className="text-base font-bold text-muted-foreground">— learn coding the fun way 🎮</span>
        </p>
        <ul className="flex flex-wrap items-center gap-4 p-0">
          {links.map((item) => (
            <li key={item.to} className="list-none">
              <Link to={item.to} className="no-underline hover:text-primary">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">© 2026 Cod Ivo · made with 💛</p>
      </div>
    </footer>
  )
}