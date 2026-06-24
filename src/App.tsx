import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Home from './Home'
import './App.css'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore an existing session on load
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // Keep in sync on sign in / sign out
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <section id="center">
        <p>Loading…</p>
      </section>
    )
  }

  return session ? <Home user={session.user} /> : <Auth />
}

export default App
