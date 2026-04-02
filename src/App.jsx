import { useState } from 'react'
import api from './api/axios'
import './App.css'

console.log('App.jsx: Loading file');

function App() {
  console.log('App.jsx: Rendering component');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    console.log('App.jsx: Form submitted', { email });

    try {
      const response = await api.post('/login', {
        email,
        password,
      })

      const token = response.data.token || response.data.access_token
      if (token) {
        localStorage.setItem('token', token)
        alert('Login Successful!')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in.</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" disabled={loading} /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
      <div className="background-decor">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
    </div>
  )
}

export default App
