'use client'

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: 3,
    textTransform: 'uppercase' as const, color: 'var(--accent)', marginBottom: 14,
    border: '1px solid rgba(96,165,250,0.2)', padding: '5px 14px', borderRadius: 4,
  }}>
    {children}
  </div>
)

export function Problema() {
  const items = [
    { stat: '73%', icon: '💬', title: 'WhatsApp sin control', desc: 'Los clientes de Río IV te escriben y no reciben respuesta a tiempo. Cada hora sin respuesta es un lead que se va a la competencia.' },
    { stat: '×3', icon: '🔁', title: 'Seguimiento manual', desc: 'Llamadas sin registro, visitas sin seguimiento, tareas repetidas. Tu equipo trabaja el triple sin resultados proporcionales.' },
    { stat: '68%', icon: '🧊', title: 'Clientes que se enfrían', desc: 'Un lead interesado en comprar en Alberdi o Centro puede enfriarse en 24hs. Sin alertas predictivas, lo perdés.' },
    { stat: '0', icon: '📊', title: 'Sin métricas reales', desc: 'No sabés qué barrios generan más consultas, qué agentes cierran más ni qué propiedades tienen mayor conversión en Río Cuarto.' },
  ]

  return (
    <section id="problema" style={{ padding: '96px 60px', background: 'var(--bg2)' }}>
      <div style={{ textAlign: 'center' }}>
        <SectionTag>El problema real</SectionTag>
        <h2 style={{ fontSize: 'clamp(26px,3vw,46px)', fontWeight: 900, letterSpacing: -1, lineHeight: 1.08, marginBottom: 14 }}>
          Las inmobiliarias de Río Cuarto<br />
          <span style={{ color: '#ef4444' }}>pierden leads todos los días.</span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          Sin un sistema inteligente, el caos operativo te cuesta ventas, tiempo y clientes — en una ciudad que crece y no espera.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18, marginTop: 56 }}>
        {items.map(({ stat, icon, title, desc }) => (
          <div
            key={title}
            style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.13)', borderRadius: 14, padding: 26, position: 'relative', overflow: 'hidden', transition: 'transform .3s', cursor: 'default' }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'none')}
          >
            <div style={{ position: 'absolute', top: 16, right: 18, fontSize: 26, fontWeight: 900, color: 'rgba(239,68,68,0.15)' }}>{stat}</div>
            <div style={{ fontSize: 26, marginBottom: 14 }}>{icon}</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{title}</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Solucion() {
  const modules = [
    { icon: '🧠', title: 'CRM Inteligente', desc: 'Todos tus leads, propiedades y clientes centralizados. La IA prioriza automáticamente quién está listo para comprar.', badge: 'IA-powered' },
    { icon: '⚡', title: 'Funnel Builder', desc: 'Embudos de captación optimizados para el mercado riocuartense. Sin código, listos en minutos.', badge: 'No-code' },
    { icon: '🤖', title: 'Asistente IA 24/7', desc: 'Responde consultas automáticamente, agenda visitas y califica leads a cualquier hora.', badge: 'Claude API' },
    { icon: '🎯', title: 'NeuroScore IA', desc: 'Score de intención de compra basado en señales emocionales. Sabés quién va a cerrar antes que él mismo.', badge: 'Predictivo' },
    { icon: '🔄', title: 'Automatizaciones', desc: 'Seguimiento automático, recordatorios de visita, propuestas y más. Tu inmobiliaria trabaja sola.', badge: 'Flows' },
    { icon: '📱', title: 'WhatsApp Inteligente', desc: 'IA integrada en tu WhatsApp Business. Responde, clasifica y deriva mensajes de forma inteligente.', badge: '24/7' },
    { icon: '📊', title: 'Dashboard Ejecutivo', desc: 'Métricas en tiempo real. Conversión, rendimiento por agente, actividad de IA y pipelines.', badge: 'Real-time' },
    { icon: '🏠', title: 'Gestión de Propiedades', desc: 'Catálogo inteligente con match automático lead-propiedad. Asigna la propiedad ideal en segundos.', badge: 'Smart Match' },
    { icon: '👥', title: 'Multiagente', desc: 'Asignación automática de leads, gestión de equipo y ranking de rendimiento. Para 2 a 50 agentes.', badge: 'Team' },
  ]

  return (
    <section id="solucion" style={{ padding: '96px 60px', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center' }}>
        <SectionTag>La solución</SectionTag>
        <h2 style={{ fontSize: 'clamp(26px,3vw,46px)', fontWeight: 900, letterSpacing: -1, lineHeight: 1.08, marginBottom: 14 }}>
          9 módulos. Una sola plataforma.<br />
          <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#fff,var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Control total.
          </em>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          Diseñado para la realidad operativa de las inmobiliarias del sur de Córdoba.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 18, marginTop: 56 }}>
        {modules.map(({ icon, title, desc, badge }) => (
          <div
            key={title}
            style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 14, padding: 26, transition: 'all .3s', cursor: 'default' }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = 'rgba(37,99,235,.4)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            <div style={{ width: 42, height: 42, background: 'rgba(29,78,216,0.1)', border: '1px solid rgba(29,78,216,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 14 }}>{icon}</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{title}</h3>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</p>
            <span style={{ display: 'inline-block', marginTop: 10, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: 'var(--accent)', background: 'rgba(29,78,216,0.12)', padding: '3px 9px', borderRadius: 4 }}>{badge}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function IA() {
  return (
    <section id="ia" style={{ padding: '96px 60px', background: 'var(--bg2)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
        {/* Left */}
        <div>
          <SectionTag>Inteligencia artificial</SectionTag>
          <h2 style={{ fontSize: 'clamp(26px,3vw,46px)', fontWeight: 900, letterSpacing: -1, lineHeight: 1.08 }}>
            La IA que{' '}
            <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#fff,var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              entiende
            </em>
            <br />a tus clientes<br />de Río Cuarto.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', marginTop: 14, lineHeight: 1.7 }}>
            Powered by Anthropic Claude. Detecta intención de compra, clasifica leads en tiempo real y predice cierres en el mercado inmobiliario local.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14, marginTop: 28 }}>
            {[
              { ico: '⚡', color: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', title: 'Respuesta en menos de 3 segundos', desc: 'Tus leads de Río IV reciben respuesta inmediata. Sin demoras, sin leads perdidos.' },
              { ico: '🎯', color: 'rgba(29,78,216,0.1)', border: 'rgba(29,78,216,0.25)', title: 'NeuroScore predictivo', desc: 'Score emocional e intención de compra. Sabés a quién llamar primero.' },
              { ico: '🔮', color: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', title: 'Predicción de cierre', desc: 'La IA predice qué leads van a cerrar en los próximos 7 días en tu zona.' },
            ].map(({ ico, color, border, title, desc }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: 14, background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: color, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{ico}</div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{title}</h4>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat mockup */}
        <div>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 22, maxWidth: 440 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#1d4ed8,#818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>AI</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Asistente INMOCREADOR</div>
                <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>● Activo ahora</div>
              </div>
            </div>

            {/* Messages */}
            {[
              { out: true, av: 'LG', text: 'Hola, busco casa 3 dormitorios en Alberdi o Nueva Italia, presupuesto $120k USD' },
            ].map(({ out, av, text }, i) => (
              <div key={i} style={{ marginBottom: 10, display: 'flex', gap: 8, alignItems: 'flex-end', flexDirection: out ? 'row-reverse' : 'row' as any }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{av}</div>
                <div style={{ padding: '9px 13px', borderRadius: 12, fontSize: 12, lineHeight: 1.55, maxWidth: '78%', background: out ? 'var(--el2)' : 'rgba(255,255,255,0.06)', border: out ? 'none' : '1px solid var(--border)', color: '#fff' }}>{text}</div>
              </div>
            ))}

            {/* AI reply with NeuroScore */}
            <div style={{ marginBottom: 10, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#1d4ed8,#818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>AI</div>
              <div>
                <div style={{ padding: '9px 13px', borderRadius: 12, fontSize: 12, lineHeight: 1.55, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', marginBottom: 8 }}>
                  ¡Hola! Encontré 4 propiedades ideales en Alberdi y Nueva Italia dentro de tu presupuesto. ¿Cuándo podés visitarlas?
                </div>
                <div style={{ background: 'rgba(29,78,216,0.07)', border: '1px solid rgba(29,78,216,0.2)', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8 }}>⚡ NeuroScore — Río Cuarto</div>
                  {[['Intención compra', 91], ['Urgencia', 76], ['Capacidad pago', 85]].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: 'var(--muted)', width: 90 }}>{l}</span>
                      <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                        <div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg,#1d4ed8,#22c55e)', width: `${v}%` }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 7, fontSize: 11, color: '#4ade80', fontWeight: 700 }}>
                    🔥 Lead con alta intención detectado. Prioridad ALTA.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 10, display: 'flex', gap: 8, alignItems: 'flex-end', flexDirection: 'row-reverse' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>LG</div>
              <div style={{ padding: '9px 13px', borderRadius: 12, fontSize: 12, background: 'var(--el2)', color: '#fff', maxWidth: '78%' }}>El miércoles a las 17hs me viene bien</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#1d4ed8,#818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>AI</div>
              <div style={{ padding: '9px 13px', borderRadius: 12, fontSize: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', maxWidth: '78%' }}>✅ ¡Visita confirmada! Miércoles 17hs. Te mando las direcciones por WhatsApp. ¡Nos vemos en Río Cuarto!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Stats() {
  return (
    <section id="stats" style={{ padding: '70px 60px', background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' as const, gap: 36 }}>
        {[
          { n: '+340%', l: 'Aumento en conversión' },
          { n: '24/7', l: 'IA activa sin parar' },
          { n: '−70%', l: 'Tareas manuales' },
          { n: '3 seg', l: 'Tiempo de respuesta IA' },
          { n: '98%', l: 'Tasa de respuesta' },
        ].map(({ n, l }) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 52, fontWeight: 900, background: 'linear-gradient(135deg,#fff,var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' as const }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Zona() {
  const cities = [
    { ico: '🏙️', name: 'Río Cuarto', desc: 'Ciudad central · 200k hab.' },
    { ico: '🌄', name: 'Alpa Corral', desc: 'Sierras · turístico' },
    { ico: '🌾', name: 'Alcira Gigena', desc: 'Zona sur' },
    { ico: '🏘️', name: 'Las Acequias', desc: 'Zona rural-urbana' },
    { ico: '🌿', name: 'Achiras', desc: 'Turismo serrano' },
    { ico: '⛰️', name: 'Comechingones', desc: 'Sierra y naturaleza' },
    { ico: '🏡', name: 'Sampacho', desc: 'Corredor sur' },
    { ico: '📍', name: '+Toda la zona', desc: 'Expansión regional' },
  ]

  return (
    <section id="zona" style={{ padding: '96px 60px', background: 'var(--bg2)' }}>
      <div style={{ textAlign: 'center' }}>
        <SectionTag>Cobertura regional</SectionTag>
        <h2 style={{ fontSize: 'clamp(26px,3vw,46px)', fontWeight: 900, letterSpacing: -1, lineHeight: 1.08, marginBottom: 14 }}>
          Hecho para el{' '}
          <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#fff,var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Sur de Córdoba.
          </em>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          INMOCREADOR está optimizado para la dinámica inmobiliaria de Río Cuarto y toda su zona de influencia.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginTop: 48 }}>
        {cities.map(({ ico, name, desc }) => (
          <div
            key={name}
            style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, textAlign: 'center' as const, transition: 'all .3s', cursor: 'default' }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = 'rgba(37,99,235,.4)'
              e.currentTarget.style.background = 'rgba(29,78,216,0.06)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'var(--glass)'
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{ico}</div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{name}</h4>
            <p style={{ fontSize: 11, color: 'var(--muted)' }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SocialProof() {
  const testimonials = [
    { init: 'MF', name: 'Marcela Ferreira', co: 'Inmobiliaria RF · Río Cuarto', color: 'linear-gradient(135deg,#1d4ed8,#6d28d9)', quote: 'En 3 semanas triplicamos las consultas calificadas. La IA responde sola por WhatsApp y nosotros solo cerramos.', m1: '+280%', l1: 'Leads calif.', m2: '21 días', l2: 'Para ver resultado' },
    { init: 'JL', name: 'Jorge López', co: 'Propiedades del Sur · RC', color: 'linear-gradient(135deg,#7c3aed,#0ea5e9)', quote: 'El dashboard ejecutivo me muestra en tiempo real qué agente rinde más y qué zona genera más ventas. Nunca tuve eso.', m1: '−65%', l1: 'Tiempo admin', m2: '×4', l2: 'Velocidad cierre' },
    { init: 'AL', name: 'Ana Lucía Ríos', co: 'Inmobiliaria Sur · Zona RC', color: 'linear-gradient(135deg,#047857,#fbbf24)', quote: 'Antes perdíamos leads en WhatsApp constantemente. Ahora la IA los responde, califica y agenda. Increíble.', m1: '98%', l1: 'Respuesta leads', m2: '+190%', l2: 'Visitas agendadas' },
  ]

  return (
    <section id="proof" style={{ padding: '96px 60px', background: 'var(--bg)', textAlign: 'center' as const }}>
      <SectionTag>Inmobiliarias que ya operan con el sistema</SectionTag>
      <h2 style={{ fontSize: 'clamp(26px,3vw,46px)', fontWeight: 900, letterSpacing: -1, lineHeight: 1.08, marginTop: 14, marginBottom: 0 }}>
        Resultados reales.<br />
        <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#fff,var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>En Río Cuarto.</em>
      </h2>

      {/* Live bar */}
      <div style={{ background: 'rgba(29,78,216,0.06)', border: '1px solid rgba(29,78,216,0.2)', borderRadius: 12, padding: 20, margin: '32px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' as const, maxWidth: 700 }}>
        {[['47', 'Inmobiliarias activas'], ['3.2k', 'Leads procesados este mes'], ['312', 'Visitas agendadas por IA'], ['$28M', 'Pipeline total activo']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--accent)' }}>{n}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18, marginTop: 40 }}>
        {testimonials.map(({ init, name, co, color, quote, m1, l1, m2, l2 }) => (
          <div
            key={name}
            style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, textAlign: 'left' as const, transition: 'transform .3s' }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'none')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>{init}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{name}</div>
                <div style={{ fontSize: 11, color: 'var(--accent)' }}>{co}</div>
              </div>
            </div>
            <div style={{ color: '#fbbf24', fontSize: 14, letterSpacing: 1, marginBottom: 10 }}>★★★★★</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, fontStyle: 'italic' }}>"{quote}"</p>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 16 }}>
              {[[m1, l1], [m2, l2]].map(([n, l]) => (
                <div key={l} style={{ flex: 1, textAlign: 'center' as const }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'block' }}>{n}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
