//this file main use Login → Save user + token → Manage session → Logout

import { useState } from 'react' //store and update
import type { Role } from '../types' //role type user or admin

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

  //Called after successful login
  const saveSession = (token: string, name: string, email: string, role: Role) => {
    localStorage.setItem('token', token)//store jwt token
    const userData = { name, email, role }
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return { user, saveSession, logout }//current user login save logout
}
