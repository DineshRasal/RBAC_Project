import api from './axiosInstance'
import type { AuthResponse, LoginForm, RegisterForm } from '../types'

export const registerUser = async (data: RegisterForm): Promise<string> => {
  const res = await api.post('/api/auth/register', data)
  return res.data
}

export const loginUser = async (data: LoginForm): Promise<AuthResponse> => {
  const res = await api.post('/api/auth/login', data)
  return res.data
}

export const fetchPublicContent = async (): Promise<{ message: string }> => {
  const res = await api.get('/api/public')
  return res.data
}

export const fetchUserContent = async (): Promise<{ message: string }> => {
  const res = await api.get('/api/user')
  return res.data
}

export const fetchAdminContent = async (): Promise<{ message: string }> => {
  const res = await api.get('/api/admin')
  return res.data
}
