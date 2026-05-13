'use client'

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        padding: '130px 40px 100px', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/R%C3%ADo_Cuarto%2C_C%C3%B3rdoba.jpg/1280px-R%C3%ADo_Cuarto%2C_C%C3%B3rdoba.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.35) saturate(1.1)',
      }} />

      {/* Overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg,rgba(5,8,16,.4) 0%,rgba(5,8,16,.55) 50%,rgba(5,8,16,.95) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
        backgroundSize: '70px 70px',
      }} />
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse,rgba(29,78,216,0.18),transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, width: '100%' }}>
        {/* Tag */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(29,78,216,0.35)',
          padding: '8px 22px', borderRadius: 100, fontSize: 11, fontWeight: 700,
          letterSpacing: 2.5, textTransform: 'uppercase' as const, color: 'var(--accent)',
          marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', animation: 'blink 2s infinite', display: 'inline-block' }} />
          Sistema activo · Río Cuarto y Zona · 2026
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(34px,5.5vw,74px)', fontWeight: 900, lineHeight: 1.02, letterSpacing: -2, marginBottom: 12 }}>
          <span style={{ display: 'block', fontSize: 'clamp(20px,2.8vw,36px)', fontWeight: 600, color: 'var(--accent)', marginBottom: 8, letterSpacing: 1 }}>
            Río Cuarto &amp; Zona Sur de Córdoba
          </span>
          La{' '}
          <em style={{
            fontStyle: 'normal',
            background: 'linear-gradient(135deg,#ffffff 20%,#93c5fd)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            evolución tecnológica
          </em>
          <br />inmobiliaria.
        </h1>

        <p style={{
          fontSize: 'clamp(15px,1.5vw,19px)', color: '#cbd5e1',
          maxWidth: 620, margin: '20px auto 44px', fontWeight: 400, lineHeight: 1.7,
        }}>
          El primer sistema operativo inteligente diseñado para inmobiliarias de Río Cuarto, Alpa Corral, Alcira Gigena y toda la región. CRM + Funnels + IA en una sola plataforma.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <button
            onClick={() => scrollTo('cta')}
            style={{
              background: 'var(--el2)', color: '#fff', padding: '15px 30px',
              borderRadius: 8, fontWeight: 700, fontSize: 14, border: 'none',
              cursor: 'pointer', fontFamily: 'inherit', letterSpacing: .5, transition: 'all .3s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'var(--el3)'
              e.currentTarget.style.boxShadow = '0 0 36px rgba(37,99,235,0.55)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'var(--el2)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'none'
            }}
          >
            Solicitar acceso privado
          </button>
          <button
            onClick={() => scrollTo('solucion')}
            style={{
              background: 'transparent', color: '#fff', padding: '15px 30px',
              borderRadius: 8, fontWeight: 600, fontSize: 14,
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all .3s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Ver sistema inteligente
          </button>
        </div>

        {/* Zone badges */}
        <div style={{
          display: 'inline-flex', gap: 16, marginTop: 40,
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
          borderRadius: 50, padding: '10px 24px', flexWrap: 'wrap' as const, justifyContent: 'center',
        }}>
          {['📍 Río Cuarto · Ciudad central', '🌄 Sierras del Sur · Comechingones', '🌾 Zona agroindustrial · Toda la región'].map(t => (
            <span key={t} style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}
              dangerouslySetInnerHTML={{ __html: t.replace(/\*\*(.*?)\*\*/g, '<b style="color:#fff">$1</b>') }}
            />
          ))}
        </div>

        {/* Dashboard */}
        <Dashboard />
      </div>
    </section>
  )
}

function Dashboard() {
  const leads = [
    { init: 'LG', name: 'Laura González', status: '3 amb · Alberdi', score: 94, color: 'linear-gradient(135deg,#1d4ed8,#818cf8)' },
    { init: 'MR', name: 'Marcos Ríos', status: 'Casa · Nueva Italia', score: 88, color: 'linear-gradient(135deg,#7c3aed,#ec4899)' },
    { init: 'SV', name: 'Sofía Vargas', status: 'Dpto · Centro RC', score: 98, color: 'linear-gradient(135deg,#047857,#0ea5e9)' },
  ]
  const bars = [
    { label: 'Contacto', pct: 88, delay: 0.1 },
    { label: 'Calificado', pct: 64, delay: 0.3 },
    { label: 'Visita', pct: 43, delay: 0.5 },
    { label: 'Cierre', pct: 27, delay: 0.7, gradient: true },
  ]

  return (
    <div style={{ marginTop: 60, maxWidth: 860, marginLeft: 'auto', marginRight: 'auto' }}>
      <div style={{
        background: 'rgba(7,16,31,0.9)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 22, backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(37,99,235,.8),transparent)' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
          {[['#ef4444'], ['#eab308'], ['#22c55e']].map(([c], i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 6, fontWeight: 600, letterSpacing: .5 }}>
            INMOCREADOR · Panel Ejecutivo — Río Cuarto
          </span>
          <div style={{ marginLeft: 'auto', fontSize: 10, color: '#22c55e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, letterSpacing: 1 }}>
            <span style={{ width: 5, height: 5, background: '#22c55e', borderRadius: '50%', animation: 'blink 1.5s infinite', display: 'inline-block' }} />
            EN VIVO
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
          {[
            { n: '183', l: 'Leads activos', c: '↑ +14% hoy', col: 'var(--accent)' },
            { n: '97%', l: 'Respuesta IA', c: '↑ Tiempo real', col: '#22c55e' },
            { n: '29', l: 'Visitas agend.', c: '↑ Esta semana', col: '#a78bfa' },
            { n: '$1.4M', l: 'Pipeline', c: '↑ +19% mes', col: '#fbbf24' },
          ].map(({ n, l, c, col }) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: col, marginBottom: 2 }}>{n}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' as const, letterSpacing: 1 }}>{l}</div>
              <div style={{ fontSize: 10, color: '#22c55e', marginTop: 3, fontWeight: 600 }}>{c}</div>
            </div>
          ))}
        </div>

        {/* Bottom panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {/* Leads */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 10 }}>Leads en tiempo real — Río IV</div>
            {leads.map(({ init, name, status, score, color }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, flexShrink: 0 }}>{init}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{name}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{status}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent)' }}>{score}</div>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 10 }}>Pipeline por etapa</div>
            {bars.map(({ label, pct, delay, gradient }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: 'var(--muted)', width: 72, textAlign: 'right' as const, flexShrink: 0 }}>{label}</span>
                <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    background: gradient ? 'linear-gradient(90deg,#1d4ed8,#22c55e)' : 'linear-gradient(90deg,#1d4ed8,#3b82f6)',
                    width: `${pct}%`,
                    animation: `growBar 2.5s ease-out ${delay}s forwards`,
                  }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', width: 28 }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
