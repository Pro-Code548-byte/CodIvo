import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider } from './context/GameProvider.jsx'
import { useGame } from './context/gameContext.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'

import Land from './pages/Land.jsx'
import Challenge from './pages/Challenge.jsx'
import Race from './pages/Race.jsx'
import RaceBot from './pages/RaceBot.jsx'
import Trophies from './pages/Trophies.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function RequireAuth({ children }) {
  const { ready, profile } = useGame()
  if (!ready) return null
  return profile ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<RequireAuth><Learn /></RequireAuth>} />
          
          <Route path="/land/:landId" element={<RequireAuth><Land /></RequireAuth>} />
          <Route path="/challenge/:challengeId" element={<RequireAuth><Challenge /></RequireAuth>} />
          <Route path="/race" element={<RequireAuth><Race /></RequireAuth>} />
          <Route path="/race-bot" element={<RequireAuth><RaceBot /></RequireAuth>} />
          <Route path="/trophies" element={<RequireAuth><Trophies /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/duel" element={<Navigate to="/race" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GameProvider>
  )
}