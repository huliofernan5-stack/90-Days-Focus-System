'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Auth from '@/components/Auth'
import type { User } from '@supabase/supabase-js'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#1a1612',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: '48px',
          fontWeight: '300',
          color: '#d4b882'
        }}>90</div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1612',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        background: '#faf7f2',
        borderRadius: '12px',
        padding: '48px',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: '48px',
          fontWeight: '300',
          color: '#2c2118',
          lineHeight: 1,
          marginBottom: '6px'
        }}>90</div>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#8a7d6e',
          marginBottom: '32px'
        }}>Day Focus System</div>

        <div style={{
          background: 'rgba(184,151,90,0.1)',
          border: '1px solid rgba(184,151,90,0.3)',
          borderRadius: '8px',
          padding: '16px 20px',
          marginBottom: '24px',
          fontSize: '13px',
          color: '#5a5248'
        }}>
          Signed in as <strong style={{ color: '#2c2118' }}>{user.email}</strong>
        </div>

        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: '22px',
          color: '#2c2118',
          marginBottom: '12px'
        }}>Your planner is loading soon.</div>

        <div style={{
          fontSize: '13px',
          color: '#8a7d6e',
          lineHeight: '1.7',
          marginBottom: '32px'
        }}>
          Authentication is working. Next we connect your full 90-day planner.
        </div>

        <button
          onClick={handleSignOut}
          style={{
            background: 'transparent',
            border: '1px solid #ece7e0',
            color: '#8a7d6e',
            padding: '10px 24px',
            borderRadius: '6px',
            fontSize: '13px',
            cursor: 'pointer',
            letterSpacing: '0.05em'
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}