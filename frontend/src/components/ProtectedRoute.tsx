import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth()

  if (!user || !localStorage.getItem('token')) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
