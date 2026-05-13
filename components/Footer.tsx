export default function Footer() {
  return (
    <footer style={{
      padding: '40px 60px',
      borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap' as const, gap: 16, background: 'var(--bg)',
    }}>
      <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: 3, background: 'linear-gradient(90deg,#fff,var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        INMOCREADOR
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted)' }}>
        Sistema Inteligente Inmobiliario · Río Cuarto y Zona Sur de Córdoba
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
        {['CRM', 'IA', 'Funnels', 'WhatsApp', '2026'].map(t => (
          <span key={t} style={{ fontSize: 10, color: 'var(--muted)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 4 }}>{t}</span>
        ))}
      </div>
      <p style={{ fontSize: 11, color: '#475569' }}>© 2026 INMOCREADOR · El Imperio del Sur</p>
    </footer>
  )
}
