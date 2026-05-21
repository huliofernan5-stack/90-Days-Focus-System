'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Auth from '@/components/Auth'

export default function Home() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return

    const iframe = document.getElementById('planner-iframe') as HTMLIFrameElement
    if (!iframe) return

    const sendToken = () => {
      iframe.contentWindow?.postMessage({
        type: 'SUPABASE_SESSION',
        accessToken: session.access_token,
        userId: session.user.id
      }, '*')
      console.log('[Parent] Token sent to iframe')
    }

    iframe.addEventListener('load', sendToken)
    return () => iframe.removeEventListener('load', sendToken)
  }, [session])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#1a1612',
        color: '#d4b882',
        fontFamily: 'Georgia, serif',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    )
  }

  if (!session) {
    return <Auth />
  }

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <iframe
        id="planner-iframe"
        src="/planner/planner.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title="90-Day Focus Planner"
      />
    </div>
  )
}