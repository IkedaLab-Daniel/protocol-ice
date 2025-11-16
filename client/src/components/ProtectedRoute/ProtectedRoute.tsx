import type { ReactNode } from "react"
import { useAuth } from "../../context/AuthContext"
import Loading from "../Loading/Loading";
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
        {children}
    </>
  )
}

export default ProtectedRoute
