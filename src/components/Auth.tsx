'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      })
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Check your email to confirm your account.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) setMessage(error.message)
    }

    setLoading(false)
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
        maxWidth: '420px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '48px',
            fontWeight: '300',
            color: '#2c2118',
            lineHeight: 1
          }}>90</div>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#8a7d6e',
            marginTop: '6px'
          }}>Day Focus System</div>
        </div>

        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '26px',
          color: '#2c2118',
          fontWeight: '400',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h2>

        <form onSubmit={handleAuth}>
          {isSignUp && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: '#5a5248',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                fontWeight: '500'
              }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #ece7e0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#1a1612',
                  background: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: '#5a5248',
              letterSpacing: '0.05em',
              marginBottom: '6px',
              fontWeight: '500'
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #ece7e0',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#1a1612',
                background: 'white',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: '#5a5248',
              letterSpacing: '0.05em',
              marginBottom: '6px',
              fontWeight: '500'
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #ece7e0',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#1a1612',
                background: 'white',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {message && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '6px',
              marginBottom: '16px',
              fontSize: '13px',
              background: message.includes('Check') ? 'rgba(34,197,94,0.1)' : 'rgba(192,57,43,0.1)',
              color: message.includes('Check') ? '#16a34a' : '#c0392b',
              borderLeft: `3px solid ${message.includes('Check') ? '#16a34a' : '#c0392b'}`
            }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#b5a898' : 'linear-gradient(135deg, #b8975a 0%, #d4b882 100%)',
              color: '#2c2118',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.06em',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s'
            }}
          >
            {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => { setIsSignUp(!isSignUp); setMessage('') }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8a7d6e',
              fontSize: '13px',
              cursor: 'pointer',
              letterSpacing: '0.03em'
            }}
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : 'No account yet? Create one'}
          </button>
        </div>
      </div>
    </div>
  )
}