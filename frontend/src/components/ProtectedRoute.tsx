import { Navigate } from 'react-router-dom' //use to redirect user to another page 
import { useAuth } from '../hooks/useAuth'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
} 

//use to component to protect routes
export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth()

  if (!user || !localStorage.getItem('token')) {
    return <Navigate to="/login" replace />
  }
//if user and token is valid the protect page will display by return statement
  return <>{children}</>
}
