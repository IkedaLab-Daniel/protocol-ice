import { Navigate, Route, BrowserRouter, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import PublicRoute from './components/PublicRoute/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Stats from './pages/Stats/Stats'
import About from './pages/About/About'
import Footer from './components/Footer/Footer'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <div className="app-layout">
            <Routes>
            {/* Public Routes Here */}
            <Route 
              path='/about'
              element={
                <PublicRoute>
                  <About />
                </PublicRoute>
              }
            />
            <Route 
              path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route 
              path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Protected Routes Here */}
            <Route 
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />  
                </ProtectedRoute>
              }
            />
            <Route 
              path='/stats'
              element={
                <ProtectedRoute>
                  <Stats />
                </ProtectedRoute>
              }
            />

            {/* Default Rotues */}
            <Route path='/' element={<Navigate to="/dashboard" replace />} />
            <Route path='*' element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;