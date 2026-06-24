import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

function Home({ user }: { user: User }) {
  const [count, setCount] = useState(0)

  return (
    <section id="center">
      <h1>Welcome, {user.email} 👋</h1>

      <button
        type="button"
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>

      <button
        type="button"
        className="auth-toggle-btn"
        onClick={() => supabase.auth.signOut()}
      >
        Sign out
      </button>
    </section>
  )
}

export default Home
