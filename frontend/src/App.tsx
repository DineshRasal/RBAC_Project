import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// BrowserRouter → Enables routing in the app
// Routes → Container for all routes
// Route → Defines a path and its component
// Navigate → Used to redirect users
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'

//this main component of your app
//<BrowserRouter> Wraps the whole app to enable routing
// <Routes> All routes are defined inside this
//ProtectedRoute is used to stop unauthorized users from accessing private pages ( Dashboard).
export default function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
