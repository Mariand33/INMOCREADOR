# INMOCREADOR

**Sistema Inteligente Inmobiliario — Río Cuarto y Zona Sur de Córdoba**

CRM + Funnels + IA para convertir consultas en cierres. El primer sistema operativo inteligente diseñado para inmobiliarias del sur de Córdoba.

---

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Estilos**: Tailwind CSS + CSS Variables custom
- **Fuente**: Montserrat (Google Fonts)
- **Deploy**: Vercel (recomendado)

---

## Instalación local

```bash
git clone https://github.com/TU_USUARIO/inmocreador.git
cd inmocreador
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Deploy en Vercel (5 minutos)

### Opción A — Desde la web de Vercel

1. Subí el proyecto a GitHub (ver abajo)
2. Entrá a [vercel.com](https://vercel.com) → **New Project**
3. Importá el repo `inmocreador`
4. Click en **Deploy** — listo ✅

### Opción B — Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## Subir a GitHub

```bash
# Dentro de la carpeta del proyecto:
git init
git add .
git commit -m "feat: INMOCREADOR landing inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/inmocreador.git
git push -u origin main
```

---

## Configuración del repo GitHub

- **Nombre**: `inmocreador`
- **Descripción**: `Sistema Inteligente Inmobiliario | CRM + Funnel + IA`
- **README**: ✅ (este archivo)
- **.gitignore**: Node
- **Licencia**: MIT

---

## Integrar formulario con backend (opcional)

En `components/ContactForm.tsx`, reemplazá la línea del `await new Promise(...)` por tu endpoint real:

```typescript
// Supabase
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
await supabase.from('leads').insert([form])

// O webhook (Make/n8n/Zapier)
await fetch('https://hook.make.com/TU_WEBHOOK', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
```

### Variables de entorno (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

---

## Dominio personalizado en Vercel

1. Vercel Dashboard → tu proyecto → **Settings → Domains**
2. Agregá: `inmocreador.com` (o el que tengas)
3. Configurá los DNS en tu registrador apuntando a Vercel

---

## Estructura del proyecto

```
inmocreador/
├── app/
│   ├── globals.css       # Variables CSS + estilos base
│   ├── layout.tsx        # Layout raíz (fuente, metadata SEO)
│   └── page.tsx          # Página principal (ensambla secciones)
├── components/
│   ├── Navbar.tsx        # Navegación fija con scroll
│   ├── Hero.tsx          # Hero + foto Río Cuarto + dashboard
│   ├── Sections.tsx      # Problema, Solución, IA, Stats, Zona, Proof
│   ├── ContactForm.tsx   # Formulario de captura con estado
│   └── Footer.tsx        # Footer
├── public/               # Assets estáticos
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

**© 2026 INMOCREADOR · El Imperio del Sur**
