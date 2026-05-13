'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '18px 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,8,16,0.95)' : 'rgba(5,8,16,0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s',
        flexWrap: 'wrap', gap: '12px',
      }}
    >
      <div style={{
        fontSize: 18, fontWeight: 900, letterSpacing: 3,
        background: 'linear-gradient(90deg,#fff 30%,var(--accent))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        INMOCREADOR
      </div>

      <ul style={{ display: 'flex', gap: 28, listStyle: 'none', flexWrap: 'wrap' }}>
        {[['solucion', 'Sistema'], ['ia', 'IA'], ['zona', 'Zona'], ['cta', 'Acceso']].map(([id, label]) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--muted)', fontSize: 12, fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                fontFamily: 'inherit', transition: 'color .25s',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#fff')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => scrollTo('cta')}
        style={{
          background: 'var(--el2)', color: '#fff', border: 'none',
          padding: '10px 22px', borderRadius: 6, fontSize: 12, fontWeight: 700,
          letterSpacing: 1, cursor: 'pointer', fontFamily: 'inherit',
          transition: 'all .3s', whiteSpace: 'nowrap',
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = 'var(--el3)'
          e.currentTarget.style.boxShadow = '0 0 24px rgba(37,99,235,0.45)'
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'var(--el2)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        Solicitar Demo →
      </button>
    </nav>
  )
}
