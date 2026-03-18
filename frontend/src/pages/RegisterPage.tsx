import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../api/auth'
import type { RegisterForm } from '../types'

export default function RegisterPage() {
  const navigate = useNavigate()

  //useForm is used to manage form inputs, submission, and validation easily
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>()

  //useMutation is used to perform API calls and handle responses.
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setTimeout(() => navigate('/login'), 2000)
    },
  })

  //onSubmit sends form data to the backend using mutation.
  const onSubmit = (data: RegisterForm) => mutation.mutate(data)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Create an account</h1>
        <p className="text-gray-500 text-sm mb-6">Fill in the details below to get started</p>

        {mutation.isSuccess ? (
          <div className="text-center py-6">
            <div className="text-green-500 text-4xl mb-3">✓</div>
            <p className="text-green-600 font-semibold text-lg">User registered successfully!</p>
            <p className="text-gray-400 text-sm mt-1">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                {...register('role', { required: 'Role is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select a role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
            </div>

            {mutation.isError && (
              <p className="text-red-500 text-sm">Registration failed. Email might already be in use.</p>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition disabled:opacity-60"
            >
              {mutation.isPending ? 'Creating account...' : 'Register'}
            </button>
          </form>
        )}

        {!mutation.isSuccess && (
          <p className="text-sm text-gray-500 mt-5 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
