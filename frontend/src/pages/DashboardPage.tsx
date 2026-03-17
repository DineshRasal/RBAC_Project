import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchAdminContent, fetchPublicContent, fetchUserContent } from '../api/auth'
import { useAuth } from '../hooks/useAuth'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const publicQuery = useQuery({ queryKey: ['public'], queryFn: fetchPublicContent })
  const userQuery = useQuery({ queryKey: ['user'], queryFn: fetchUserContent, enabled: !!user })
  const adminQuery = useQuery({
    queryKey: ['admin'],
    queryFn: fetchAdminContent,
    enabled: user?.role === 'ADMIN',
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-lg font-semibold text-gray-800">RBAC Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              user.role === 'ADMIN'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {user.role}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <h2 className="text-xl font-bold text-gray-800">
          Hey {user.name}, here's what you can access 👋
        </h2>

        {/* Public Card - everyone sees this */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500 text-lg">🌐</span>
            <h3 className="font-semibold text-gray-700">Public Content</h3>
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Everyone</span>
          </div>
          <p className="text-sm text-gray-600">
            {publicQuery.isLoading ? 'Loading...' : publicQuery.data?.message}
          </p>
        </div>

        {/* User Card - USER and ADMIN */}
        <div className="bg-white rounded-xl border border-blue-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-500 text-lg">👤</span>
            <h3 className="font-semibold text-gray-700">User Content</h3>
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">USER + ADMIN</span>
          </div>
          <p className="text-sm text-gray-600">
            {userQuery.isLoading
              ? 'Loading...'
              : userQuery.isError
              ? '⛔ You do not have access to this content.'
              : userQuery.data?.message}
          </p>
        </div>

        {/* Admin Card - only ADMIN */}
        {user.role === 'ADMIN' ? (
          <div className="bg-white rounded-xl border border-purple-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-500 text-lg">🛡️</span>
              <h3 className="font-semibold text-gray-700">Admin Content</h3>
              <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">ADMIN only</span>
            </div>
            <p className="text-sm text-gray-600">
              {adminQuery.isLoading ? 'Loading...' : adminQuery.data?.message}
            </p>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl border border-dashed border-gray-300 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400 text-lg">🔒</span>
              <h3 className="font-semibold text-gray-400">Admin Content</h3>
              <span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">ADMIN only</span>
            </div>
            <p className="text-sm text-gray-400">This section is restricted to admins only.</p>
          </div>
        )}
      </div>
    </div>
  )
}
