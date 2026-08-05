import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import { useAuth } from './context/authContext.js'
import { ProgressProvider } from './context/ProgressProvider.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Duel from './pages/Duel.jsx'
import Race from './pages/Race.jsx'
import Help from './pages/Help.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function PublicOnly({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return <Navigate to="/" replace />

  return children
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
        <Navbar />
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="animate-aurora absolute -left-24 -top-24 size-96 rounded-full bg-primary/25 blur-3xl" />
          <div
            className="animate-aurora absolute -right-24 top-1/3 size-96 rounded-full bg-accent/25 blur-3xl"
            style={{ animationDelay: '-6s' }}
          />
          <div
            className="animate-aurora absolute bottom-0 left-1/4 size-80 rounded-full bg-[#855cd6]/20 blur-3xl"
            style={{ animationDelay: '-12s' }}
          />
        </div>
        <main className="relative z-10 mx-auto max-w-[960px] px-4 pb-16 pt-8 sm:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/learn"
              element={
                <ProtectedRoute>
                  <Navigate to="/learn/html" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learn/:lang"
              element={
                <ProtectedRoute>
                  <Learn />
                </ProtectedRoute>
              }
            />
            <Route
              path="/duel"
              element={
                <ProtectedRoute>
                  <Duel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/race"
              element={
                <ProtectedRoute>
                  <Race />
                </ProtectedRoute>
              }
            />
            <Route path="/help" element={<Help />} />
            <Route
              path="/login"
              element={
                <PublicOnly>
                  <Login />
                </PublicOnly>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicOnly>
                  <Signup />
                </PublicOnly>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  )
}
