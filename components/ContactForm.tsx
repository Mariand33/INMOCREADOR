'use client'
import { useState } from 'react'

const SUPABASE_URL = 'https://nniivhebocgdsynlpuhf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uaWl2aGVib2NnZHN5bmxwdWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMDQ4MDksImV4cCI6MjA5MTg4MDgwOX0.LucbLf6bWhNYdfo2zhmCgkf5gTKsvJWA73_piCmoG70'

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: '',
    inmobiliaria: '',
    whatsapp: '',
    ciudad: '',
    agentes: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.nombre || !form.whatsapp) {
      setError('Por favor completá al menos tu nombre y WhatsApp.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/inmobiliarias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
        nombre: form.nombre,
Inmobiliaria: form.inmobiliaria,
WhatsApp: form.whatsapp,
Ciudad: form.ciudad,
agentes: form.agentes,
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        throw new Error(err)
      }
      setSent(true)
    } catch (e: any) {
      setError('Hubo un error al enviar. Intentá de nuevo.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const field = (label: string, key: keyof typeof form, placeholder: string, type = 'text') => (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' as const, letterSpacing: .8 }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '11px 14px', color: '#fff',
          fontFamily: 'inherit', fontSize: 13, outline: 'none', transition: 'border-color .3s',
        }}
        onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,.6)'}
        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
      />
    </div>
  )

  return (
    <section id="cta" style={{ padding: '96px 60px', background: 'var(--bg2)', position: 'relative', overflow: 'hidden', textAlign: 'center' as const }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 50%,rgba(29,78,216,0.08),transparent)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' as const, color: 'var(--accent)', marginBottom: 18, border: '1px solid rgba(96,165,250,0.2)', padding: '5px 14px', borderRadius: 4 }}>
        Acceso privado · 2026
      </div>

      <h2 style={{ fontSize: 'clamp(26px,4vw,52px)', fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}>
        Tu inmobiliaria en Río Cuarto ya puede funcionar como un{' '}
        <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#fff,var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          sistema inteligente.
        </em>
      </h2>

      <p style={{ fontSize: 17, color: 'var(--muted)', marginBottom: 48, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
        Acceso limitado a 15 inmobiliarias de la región por lanzamiento. Reservá tu lugar ahora.
      </p>

      <div style={{
        background: 'rgba(7,16,31,0.95)', border: '1px solid var(--border)',
        borderRadius: 20, padding: 48, maxWidth: 580, margin: '0 auto',
        position: 'relative', textAlign: 'left' as const,
      }}>
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(37,99,235,.7),transparent)' }} />

        {!sent ? (
          <>
            <h3 style={{ fontSize: 20, fontWeight: 800, textAlign: 'center' as const, marginBottom: 6 }}>Solicitar demo privada</h3>
            <p style={{ textAlign: 'center' as const, fontSize: 13, color: 'var(--muted)', marginBottom: 28 }}>
              Un especialista de INMOCREADOR te contacta en menos de 24hs.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {field('Nombre completo', 'nombre', 'Tu nombre')}
              {field('Inmobiliaria', 'inmobiliaria', 'Nombre de tu empresa')}
              {field('WhatsApp', 'whatsapp', '+54 358 ...', 'tel')}
              {field('Ciudad / Zona', 'ciudad', 'Río Cuarto, Alpa Corral...')}
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' as const, gap: 5 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' as const, letterSpacing: .8 }}>Cantidad de agentes</label>
                <select
                  value={form.agentes}
                  onChange={e => setForm(p => ({ ...p, agentes: e.target.value }))}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 8, padding: '11px 14px', color: form.agentes ? '#fff' : 'var(--muted)', fontFamily: 'inherit', fontSize: 13, outline: 'none' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,.6)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <option value="">Seleccioná tu caso</option>
                  <option>Solo yo (1 agente)</option>
                  <option>Equipo pequeño (2 a 5 agentes)</option>
                  <option>Equipo mediano (6 a 20 agentes)</option>
                  <option>Empresa grande (más de 20 agentes)</option>
                </select>
              </div>
            </div>

            {error && (
              <p style={{ fontSize: 12, color: '#f87171', textAlign: 'center' as const, marginTop: 12 }}>{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%', background: loading ? '#475569' : 'var(--el2)',
                color: '#fff', border: 'none', padding: 14, borderRadius: 8,
                fontSize: 14, fontWeight: 800, fontFamily: 'inherit',
                cursor: loading ? 'default' : 'pointer', marginTop: 14,
                letterSpacing: .5, transition: 'all .3s',
              }}
            >
              {loading ? 'Enviando...' : 'Activar sistema inteligente en mi inmobiliaria →'}
            </button>

            <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center' as const, marginTop: 14 }}>
              🔒 Tus datos son confidenciales. Sin spam, sin compromiso.
            </p>
          </>
        ) : (
          <div style={{ textAlign: 'center' as const, padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>¡Solicitud recibida!</h3>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>
              Un especialista de INMOCREADOR te contacta en menos de 24 horas.<br />Revisá tu WhatsApp.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
