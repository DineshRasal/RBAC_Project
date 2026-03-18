import api from './axiosInstance'
//These are TypeScript types for request and response"
import type { AuthResponse, LoginForm, RegisterForm } from '../types'

//Function to register a new user
//async This function works asynchronously (handles API calls)
//data is input variable
//promise async result
//res response store in res
//await is use wait until api response comes
//api Axios instance
//post the request to backend
//'/api/auth/register' backend endpoint
//data send login data email and pass to backend
export const registerUser = async (data: RegisterForm): Promise<string> => {
  //Backend call:
  const res = await api.post('/api/auth/register', data)
  //by using this Returns statement  response from backend ( ' registered successfully')
  return res.data
}

export const loginUser = async (data: LoginForm): Promise<AuthResponse> => {
  const res = await api.post('/api/auth/login', data)
  return res.data
}

//Fetch data from public endpoint (no login required)
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
