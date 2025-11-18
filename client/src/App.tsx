import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import PublicRoute from './components/PublicRoute/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Stats from './pages/Stats/Stats'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes Here */}
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
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;