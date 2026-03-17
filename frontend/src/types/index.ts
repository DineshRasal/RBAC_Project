export type Role = 'USER' | 'ADMIN'

export interface AuthResponse {
  token: string
  role: Role
  name: string
  email: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  role: Role
}

export interface LoginForm {
  email: string
  password: string
}
