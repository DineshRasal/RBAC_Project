import { useState } from 'react'
import type { Role } from '../types'

interface StoredUser {
  name: string
  email: string
  role: Role
}

export function useAuth() {
  const [user, setUser] = useState<StoredUser | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const saveSession = (token: string, name: string, email: string, role: Role) => {
    localStorage.setItem('token', token)
    const userData = { name, email, role }
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return { user, saveSession, logout }
}
