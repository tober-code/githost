import { useState } from 'react'
import { supabase } from './supabaseClient'

function Auth() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } =
      mode === 'sign-in'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else if (mode === 'sign-up') {
      // If email confirmation is enabled, no session is returned yet.
      setMessage('Check your email to confirm your account, then sign in.')
    }
    // On a successful sign-in the auth listener in App.tsx swaps to the homepage.
    setLoading(false)
  }

  return (
    <section className="auth-card">
      <h1>{mode === 'sign-in' ? 'Sign in' : 'Create account'}</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={
              mode === 'sign-in' ? 'current-password' : 'new-password'
            }
            minLength={6}
            required
          />
        </label>

        <button type="submit" className="counter" disabled={loading}>
          {loading
            ? 'Please wait…'
            : mode === 'sign-in'
              ? 'Sign in'
              : 'Sign up'}
        </button>
      </form>

      {error && <p className="auth-error">{error}</p>}
      {message && <p className="auth-message">{message}</p>}

      <p className="auth-toggle">
        {mode === 'sign-in' ? "Don't have an account?" : 'Already registered?'}{' '}
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
            setError(null)
            setMessage(null)
          }}
        >
          {mode === 'sign-in' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </section>
  )
}

export default Auth
