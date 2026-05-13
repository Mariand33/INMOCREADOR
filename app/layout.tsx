import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INMOCREADOR — Sistema Inteligente Inmobiliario | Río Cuarto',
  description:
    'CRM + Funnels + IA para inmobiliarias de Río Cuarto y Zona Sur de Córdoba. El primer sistema operativo inteligente para el mercado inmobiliario regional.',
  keywords:
    'inmobiliaria rio cuarto, CRM inmobiliario, IA inmobiliaria, funnels inmobiliarios, cordoba sur',
  openGraph: {
    title: 'INMOCREADOR — La evolución tecnológica inmobiliaria',
    description:
      'Sistema operativo inteligente para inmobiliarias de Río Cuarto y Zona.',
    url: 'https://inmocreador.com',
    siteName: 'INMOCREADOR',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  )
}
