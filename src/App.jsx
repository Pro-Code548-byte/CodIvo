import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider } from './context/GameProvider.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Map from './pages/Map.jsx'
import Land from './pages/Land.jsx'
import Challenge from './pages/Challenge.jsx'
import Race from './pages/Race.jsx'
import RaceBot from './pages/RaceBot.jsx'
import Trophies from './pages/Trophies.jsx'
import Parents from './pages/Parents.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/land/:landId" element={<Land />} />
          <Route path="/challenge/:challengeId" element={<Challenge />} />
          <Route path="/race" element={<Race />} />
          <Route path="/race-bot" element={<RaceBot />} />
          <Route path="/trophies" element={<Trophies />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learn" element={<Navigate to="/map" replace />} />
          <Route path="/duel" element={<Navigate to="/race" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}