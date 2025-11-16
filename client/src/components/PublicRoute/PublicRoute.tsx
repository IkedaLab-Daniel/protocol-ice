import type { ReactNode } from "react"
import { useAuth } from "../../context/AuthContext"
import Loading from "../Loading/Loading"
import { Navigate } from "react-router-dom"

interface PublicRouteProps {
  children: ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return <Loading fullScreen />
  }

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <>
      {children}
    </>
  )
}

export default PublicRoute;
