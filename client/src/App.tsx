import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import PublicRoute from './components/PublicRoute/PublicRoute'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

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

          {/* Protected Rotues Here */}
          <Route 
            path='/dashboard'
            element={
              <PublicRoute>
                {/* TODO: Dashboard */}
                <Login />  
              </PublicRoute>
            }
          />
          <Route 
            path='/stats'
            element={
              <PublicRoute>
                {/* TODO: Stats */}
                <Login />  
              </PublicRoute>
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