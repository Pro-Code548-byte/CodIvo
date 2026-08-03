import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Duel from './pages/Duel.jsx'
import Race from './pages/Race.jsx'
import Help from './pages/Help.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="mx-auto max-w-[960px] px-4 pb-16 pt-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/duel" element={<Duel />} />
          <Route path="/race" element={<Race />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
