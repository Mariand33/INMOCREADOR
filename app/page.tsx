"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase ──────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Types ─────────────────────────────────────────────────
interface Msg { role: "bot" | "user"; text: string; isHtml?: boolean; }

// ── WHATSAPP NUMBER ───────────────────────────────────────
const WA = "5493584289903"; // ← REEMPLAZAR con tu número real

export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ background: "#060810", minHeight: "100vh", color: "#e8eaf0", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{globalStyles}</style>
      <CityCanvas />
      <div className="overlay" />
      <Nav />
      <Hero />
      <Problem />
      <Modules />
      <Planes />
      <Zona />
      <Contacto />
      <Footer />
      <CataIA />
    </main>
  );
}

// ══════════════════════════════════════════════════════════
// CITY CANVAS
// ══════════════════════════════════════════════════════════
function CityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    
    let W = 0, H = 0, animId = 0;
    let buildings: Building[] = [], stars: Star[] = [], particles: Particle[] = [];
    let t = 0;

    interface Building { x: number; y: number; w: number; h: number; color: string; windows: Win[]; }
    interface Win { on: boolean; flicker: boolean; flickerSpeed: number; phase: number; wx: number; wy: number; gold: boolean; }
    interface Star { x: number; y: number; r: number; a: number; speed: number; }
    interface Particle { x: number; y: number; vx: number; vy: number; r: number; a: number; gold: boolean; }

    function init() {
     W = canvasEl!.width = window.innerWidth;
H = canvasEl!.height = window.innerHeight;
      const bCount = Math.floor(W / 30);
      buildings = Array.from({ length: bCount }, (_, i) => {
        const x = (W / bCount) * i;
        const bw = (W / bCount) * 0.82;
        const bh = 80 + Math.random() * H * 0.52;
        const floors = Math.floor(bh / 18);
        const wins: Win[] = [];
        for (let f = 0; f < floors; f++) {
          const wc = Math.floor(bw / 12);
          for (let w = 0; w < wc; w++) {
            wins.push({ on: Math.random() > 0.42, flicker: Math.random() > 0.94, flickerSpeed: 0.01 + Math.random() * 0.03, phase: Math.random() * Math.PI * 2, wx: w * 12 + 4, wy: f * 18 + 8, gold: Math.random() > 0.65 });
          }
        }
        return { x, y: H - bh, w: bw, h: bh, color: `hsl(220,${10 + Math.random() * 15}%,${5 + Math.random() * 8}%)`, windows: wins };
      });
      stars = Array.from({ length: 200 }, () => ({ x: Math.random() * W, y: Math.random() * H * 0.5, r: Math.random() * 1.2, a: Math.random(), speed: 0.002 + Math.random() * 0.004 }));
      particles = Array.from({ length: 45 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.4, vy: -Math.random() * 0.5 - 0.1, r: Math.random() * 1.5, a: Math.random() * 0.4, gold: Math.random() > 0.55 }));
    }

    function draw() {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#010306");
      sky.addColorStop(0.45, "#040810");
      sky.addColorStop(1, "#080f1e");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

      stars.forEach(s => {
        s.a = 0.25 + 0.55 * Math.abs(Math.sin(t * s.speed + s.x));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,215,255,${s.a})`; ctx.fill();
      });

      const glow = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, W * 0.65);
      glow.addColorStop(0, "rgba(201,168,76,0.08)");
      glow.addColorStop(0.4, "rgba(79,120,200,0.05)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

      buildings.forEach(b => {
        ctx.fillStyle = b.color; ctx.fillRect(b.x, b.y, b.w, b.h);
        b.windows.forEach(w => {
          let on = w.on;
          if (w.flicker) on = Math.sin(t * w.flickerSpeed * 60 + w.phase) > 0;
          if (!on) return;
          const px = b.x + w.wx, py = b.y + w.wy;
          ctx.fillStyle = w.gold ? "rgba(201,168,76,0.88)" : "rgba(200,225,255,0.72)";
          ctx.fillRect(px, py, 6, 8);
          const wg = ctx.createRadialGradient(px + 3, py + 4, 0, px + 3, py + 4, 14);
          wg.addColorStop(0, w.gold ? "rgba(201,168,76,0.14)" : "rgba(150,200,255,0.1)");
          wg.addColorStop(1, "transparent");
          ctx.fillStyle = wg; ctx.fillRect(px - 10, py - 10, 26, 28);
        });
        ctx.beginPath(); ctx.arc(b.x + b.w / 2, b.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,70,70,${0.5 + 0.4 * Math.sin(t * 1.5 + b.x)})`; ctx.fill();
      });

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(201,168,76,${p.a})` : `rgba(100,185,255,${p.a})`; ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    const onResize = () => { init(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

// ══════════════════════════════════════════════════════════
// NAV
// ══════════════════════════════════════════════════════════
function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 48px", background: "rgba(6,8,16,0.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.7rem", letterSpacing: "3px", background: "linear-gradient(135deg,#c9a84c,#e8c96a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>INMOCREADOR</div>
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {["#sistema", "#planes", "#zona"].map((href, i) => (
          <a key={i} href={href} style={{ color: "#8892a4", textDecoration: "none", fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8892a4")}>
            {["Sistema", "Planes", "Zona"][i]}
          </a>
        ))}
        <a href="#contacto" style={{ background: "linear-gradient(135deg,#c9a84c,#e8c96a)", color: "#060810", padding: "10px 24px", borderRadius: "4px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1px", textDecoration: "none" }}>
          Solicitar Demo →
        </a>
      </div>
    </nav>
  );
}

// ══════════════════════════════════════════════════════════
// HERO
// ══════════════════════════════════════════════════════════
function Hero() {
  return (
    <section style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px" }}>
      <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.28)", padding: "7px 20px", borderRadius: "50px", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "#c9a84c", marginBottom: "32px" }}>
        <span style={{ width: 7, height: 7, background: "#4ade80", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
        Sistema activo · Río Cuarto · 2026
      </div>

      <h1 className="fade-up delay-1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,10vw,8rem)", lineHeight: 0.92, letterSpacing: "3px", marginBottom: "24px" }}>
        TU INMOBILIARIA<br />
        <span style={{ background: "linear-gradient(135deg,#c9a84c,#e8c96a,#4fc3f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>EN MODO IA</span>
      </h1>

      <p className="fade-up delay-2" style={{ fontSize: "clamp(1rem,2.2vw,1.25rem)", color: "#8892a4", maxWidth: "580px", lineHeight: 1.75, marginBottom: "48px" }}>
        El primer sistema operativo inteligente para inmobiliarias de<br />
        <strong style={{ color: "#e8eaf0" }}>Río Cuarto y Zona Sur de Córdoba.</strong><br />
        CRM · Funnels · IA — en una sola plataforma.
      </p>

      <div className="fade-up delay-3" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <a href="#contacto" style={{ background: "linear-gradient(135deg,#c9a84c,#e8c96a)", color: "#060810", padding: "16px 36px", borderRadius: "4px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", letterSpacing: "0.5px" }}>
          Quiero mi sistema →
        </a>
        <a href="#sistema" style={{ background: "transparent", color: "#e8eaf0", padding: "16px 36px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.18)", fontSize: "1rem", textDecoration: "none" }}>
          Ver qué incluye
        </a>
      </div>

      <div className="fade-up delay-4" style={{ display: "flex", gap: "48px", marginTop: "72px", flexWrap: "wrap", justifyContent: "center" }}>
        {[["9", "Módulos activos"], ["24/7", "IA respondiendo"], ["3s", "Respuesta IA"], ["RC", "Zona Sur Cba"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.4rem", letterSpacing: "2px", background: "linear-gradient(135deg,#c9a84c,#e8c96a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
            <div style={{ fontSize: "0.72rem", color: "#8892a4", letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px" }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// PROBLEM
// ══════════════════════════════════════════════════════════
function Problem() {
  const problems = [
    { icon: "💬", pct: "73%", title: "WhatsApp sin control", desc: "Los clientes escriben y no reciben respuesta a tiempo. Cada hora perdida es un lead que se va a la competencia." },
    { icon: "🔁", pct: "×3", title: "Seguimiento manual", desc: "Llamadas sin registro, visitas sin seguimiento, tareas repetidas. Tu equipo trabaja el triple sin resultados proporcionales." },
    { icon: "🧊", pct: "68%", title: "Clientes que se enfrían", desc: "Un lead interesado puede enfriarse en 24hs. Sin alertas predictivas, lo perdés antes de llamarlo." },
    { icon: "📊", pct: "0", title: "Sin métricas reales", desc: "No sabés qué barrios generan más consultas, qué agentes cierran más ni qué propiedades convierten mejor." },
  ];
  return (
    <section style={{ position: "relative", zIndex: 10, background: "rgba(13,17,23,0.88)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
        <p className="reveal" style={labelStyle}>// El problema real</p>
        <h2 className="reveal" style={titleStyle}>Las inmobiliarias de<br /><span style={{ color: "#c9a84c" }}>Río Cuarto</span><br />pierden leads todos los días.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "20px", marginTop: "56px" }}>
          {problems.map(p => (
            <div key={p.title} className="reveal card-hover" style={cardBase}>
              <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>{p.icon}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.4rem", color: "#ef4444", letterSpacing: "2px" }}>{p.pct}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "8px 0" }}>{p.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#8892a4", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// MODULES
// ══════════════════════════════════════════════════════════
function Modules() {
  const mods = [
    { icon: "🧠", tag: "IA-powered", title: "CRM Inteligente", desc: "Leads, propiedades y clientes centralizados. La IA prioriza automáticamente quién está listo para comprar." },
    { icon: "⚡", tag: "No-code", title: "Funnel Builder", desc: "Tu propio funnel con tu marca, tus propiedades y tu asistente IA. Listo en minutos." },
    { icon: "🤖", tag: "Claude API", title: "Asistente IA 24/7", desc: "Responde consultas automáticamente, agenda visitas y califica leads a cualquier hora." },
    { icon: "🎯", tag: "Predictivo", title: "NeuroScore IA", desc: "Score de intención de compra basado en señales del comportamiento. Sabés quién va a cerrar antes que él mismo." },
    { icon: "📱", tag: "24/7", title: "WhatsApp Inteligente", desc: "IA integrada en tu WhatsApp Business. Responde, clasifica y deriva mensajes de forma inteligente." },
    { icon: "📊", tag: "Real-time", title: "Dashboard Ejecutivo", desc: "Métricas en tiempo real: conversión, rendimiento por agente, actividad IA y pipeline completo." },
    { icon: "🏠", tag: "Smart Match", title: "Gestión de Propiedades", desc: "Catálogo inteligente con match automático lead-propiedad. Asigna la propiedad ideal en segundos." },
    { icon: "📸", tag: "Auto", title: "Marketing IA", desc: "Generador de posts para Instagram, programador de contenido y piezas listas para publicar." },
    { icon: "🌐", tag: "Próximo", title: "Red Comunidad", desc: "Con un click conectás tu inmobiliaria con toda la red InmoCreador. Más alcance, más leads, más cierres." },
  ];
  return (
    <section id="sistema" style={{ position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
        <p className="reveal" style={labelStyle}>// La solución</p>
        <h2 className="reveal" style={titleStyle}>9 módulos. Una plataforma.<br /><span style={{ color: "#c9a84c" }}>Control total.</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px", marginTop: "56px" }}>
          {mods.map(m => (
            <div key={m.title} className="reveal card-hover" style={{ ...cardBase, background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)" }}>
              <div style={{ fontSize: "1.7rem", marginBottom: "12px" }}>{m.icon}</div>
              <span style={{ display: "inline-block", fontSize: "0.68rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#c9a84c", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", padding: "3px 10px", borderRadius: "50px", marginBottom: "10px" }}>{m.tag}</span>
              <h3 style={{ fontSize: "0.97rem", fontWeight: 600, marginBottom: "8px" }}>{m.title}</h3>
              <p style={{ fontSize: "0.83rem", color: "#8892a4", lineHeight: 1.65 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// PLANES
// ══════════════════════════════════════════════════════════
function Planes() {
  const planes = [
    {
      name: "Starter", desc: "Para comenzar con sistema propio", price: "120", featured: false,
      features: ["Funnel público personalizado", "CRM básico de propiedades", "Asistente Cata IA 24/7", "WhatsApp integrado", "Dashboard básico", "Soporte por WhatsApp"],
      plan: "starter"
    },
    {
      name: "Pro", desc: "El sistema completo para tu inmobiliaria", price: "220", featured: true,
      features: ["Todo lo del plan Starter", "Radar IA + NeuroScore", "Módulo de Alquileres", "Marketing IA + Instagram", "Tour Virtual 360°", "Dashboard ejecutivo completo", "Gestión multiagente", "Soporte prioritario"],
      plan: "pro"
    },
    {
      name: "Comunidad", desc: "Red de inmobiliarias · Próximamente", price: null, featured: false,
      features: ["Red regional de inmobiliarias", "Match automático entre portales", "Ciudadanos calificados", "Gamificación de leads", "Colaboración entre agentes", "Acceso con 1 click"],
      plan: "comunidad"
    },
  ];

  return (
    <section id="planes" style={{ position: "relative", zIndex: 10, background: "rgba(13,17,23,0.85)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
        <p className="reveal" style={labelStyle}>// Inversión</p>
        <h2 className="reveal" style={titleStyle}>Elegí tu<br /><span style={{ color: "#c9a84c" }}>nivel de sistema.</span></h2>
        <p className="reveal" style={{ color: "#8892a4", marginTop: "12px", lineHeight: 1.7 }}>Cada inmobiliaria tiene su sistema propio, personalizado con su marca y su IA.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "24px", marginTop: "56px" }}>
          {planes.map(p => (
            <div key={p.name} className="reveal" style={{
              background: p.featured ? "linear-gradient(135deg,rgba(201,168,76,0.08),rgba(79,195,247,0.05))" : "rgba(255,255,255,0.03)",
              border: p.featured ? "1px solid rgba(201,168,76,0.42)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", padding: "40px 32px", position: "relative", transition: "transform 0.3s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
              {p.featured && (
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#c9a84c,#e8c96a)", color: "#060810", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", padding: "4px 16px", borderRadius: "50px" }}>MÁS ELEGIDO</div>
              )}
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "2px" }}>{p.name}</div>
              <div style={{ fontSize: "0.83rem", color: "#8892a4", marginBottom: "20px" }}>{p.desc}</div>
              {p.price ? (
                <>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.4rem", lineHeight: 1, letterSpacing: "1px" }}>
                    <span style={{ fontSize: "1.4rem", color: "#8892a4" }}>USD </span>{p.price}<span style={{ fontSize: "1rem", color: "#8892a4", fontFamily: "'DM Sans',sans-serif" }}>/mes</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#8892a4", margin: "6px 0 24px" }}>+ USD 150 setup inicial único</div>
                </>
              ) : (
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#c9a84c", margin: "8px 0 24px" }}>Lista de espera</div>
              )}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", gap: "10px", fontSize: "0.86rem", color: "#8892a4", alignItems: "flex-start" }}>
                    <span style={{ color: "#4ade80", fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <PlanBtn plan={p.plan} featured={p.featured} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanBtn({ plan, featured }: { plan: string; featured: boolean }) {
  const labels: Record<string, string> = { starter: "Consultar Starter →", pro: "Quiero el Plan Pro →", comunidad: "Anotarme en lista →" };
  return (
    <button
      onClick={() => {
        const el = document.getElementById("cata-toggle-btn");
        el?.click();
        setTimeout(() => {
          const ev = new CustomEvent("cata-plan", { detail: plan });
          window.dispatchEvent(ev);
        }, 400);
      }}
      style={{
        width: "100%", padding: "14px", borderRadius: "8px", border: featured ? "none" : "1px solid rgba(201,168,76,0.4)",
        background: featured ? "linear-gradient(135deg,#c9a84c,#e8c96a)" : "transparent",
        color: featured ? "#060810" : "#c9a84c", fontFamily: "'DM Sans',sans-serif", fontSize: "0.93rem", fontWeight: 600, cursor: "pointer", letterSpacing: "0.5px"
      }}>
      {labels[plan]}
    </button>
  );
}

// ══════════════════════════════════════════════════════════
// ZONA
// ══════════════════════════════════════════════════════════
function Zona() {
  const zones = [
    { icon: "🏙️", name: "Río Cuarto", sub: "Ciudad central · 200k hab." },
    { icon: "🌄", name: "Alpa Corral", sub: "Sierras · turístico" },
    { icon: "🌾", name: "Alcira Gigena", sub: "Zona sur" },
    { icon: "⛰️", name: "Comechingones", sub: "Sierra y naturaleza" },
    { icon: "📍", name: "+ Toda la zona", sub: "Expansión regional" },
  ];
  return (
    <section id="zona" style={{ position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <p className="reveal" style={labelStyle}>// Cobertura</p>
        <h2 className="reveal" style={titleStyle}>Hecho para el<br /><span style={{ color: "#c9a84c" }}>Sur de Córdoba.</span></h2>
        <p className="reveal" style={{ color: "#8892a4", margin: "16px auto 48px", maxWidth: 500, lineHeight: 1.7 }}>Optimizado para la dinámica inmobiliaria de Río Cuarto y toda su zona de influencia.</p>
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
          {zones.map(z => (
            <div key={z.name} style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.14)", borderRadius: "10px", padding: "20px 28px", textAlign: "center", minWidth: "140px" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{z.icon}</div>
              <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{z.name}</div>
              <div style={{ fontSize: "0.73rem", color: "#8892a4" }}>{z.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// CONTACTO — Supabase
// ══════════════════════════════════════════════════════════
function Contacto() {
  const [form, setForm] = useState({ nombre: "", inmobiliaria: "", whatsapp: "", ciudad: "", agentes: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handle = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit() {
    if (!form.nombre || !form.whatsapp) { alert("Completá tu nombre y WhatsApp."); return; }
    setStatus("loading");
    const { error } = await supabase.from("inmobiliarias").insert([{
      nombre: form.nombre,
      inmobiliaria: form.inmobiliaria,
      whatsapp: form.whatsapp,
      ciudad: form.ciudad,
      agentes: form.agentes,
    }]);
    if (error) { setStatus("error"); return; }
    setStatus("success");
    const msg = `Hola! Me registré desde la web de INMOCREADOR.\n\nNombre: ${form.nombre}\nInmobiliaria: ${form.inmobiliaria}\nCiudad: ${form.ciudad}\nAgentes: ${form.agentes}\nWhatsApp: ${form.whatsapp}`;
    setTimeout(() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank"), 800);
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px",
    padding: "14px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.93rem", color: "#e8eaf0", outline: "none", width: "100%"
  };

  return (
    <section id="contacto" style={{ position: "relative", zIndex: 10, background: "rgba(13,17,23,0.88)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "100px 24px" }}>
        <p className="reveal" style={labelStyle}>// Demo privada</p>
        <h2 className="reveal" style={titleStyle}>Activá tu sistema<br /><span style={{ color: "#c9a84c" }}>inteligente ahora.</span></h2>
        <p className="reveal" style={{ color: "#8892a4", marginTop: "12px", lineHeight: 1.7 }}>Un especialista te contacta en menos de 24hs con una demo personalizada.</p>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "48px", background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "16px", marginTop: "40px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>¡Solicitud recibida!</h3>
            <p style={{ color: "#8892a4", fontSize: "0.9rem" }}>Te contactamos en menos de 24hs por WhatsApp para coordinar tu demo personalizada.</p>
          </div>
        ) : (
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "48px" }}>
            {[["Nombre completo", "nombre", "Tu nombre"], ["Inmobiliaria", "inmobiliaria", "Nombre de tu inmobiliaria"], ["WhatsApp", "whatsapp", "+54 9 358..."], ["Ciudad", "ciudad", "Río Cuarto / Zona"]].map(([label, key, ph]) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase", color: "#8892a4" }}>{label}</label>
                <input style={inputStyle} placeholder={ph} value={(form as any)[key]} onChange={handle(key)} />
              </div>
            ))}
            <div style={{ gridColumn: "1/-1", display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase", color: "#8892a4" }}>Cantidad de agentes</label>
              <select style={{ ...inputStyle }} value={form.agentes} onChange={handle("agentes")}>
                <option value="">Seleccioná tu caso</option>
                <option>Solo yo (1 agente)</option>
                <option>Equipo pequeño (2 a 5 agentes)</option>
                <option>Equipo mediano (6 a 20 agentes)</option>
                <option>Empresa grande (más de 20 agentes)</option>
              </select>
            </div>
            <button
              onClick={submit}
              disabled={status === "loading"}
              style={{ gridColumn: "1/-1", background: "linear-gradient(135deg,#c9a84c,#e8c96a)", color: "#060810", border: "none", borderRadius: "8px", padding: "18px", fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.5px", marginTop: "8px" }}>
              {status === "loading" ? "Enviando..." : "Activar sistema inteligente en mi inmobiliaria →"}
            </button>
            {status === "error" && <p style={{ gridColumn: "1/-1", color: "#ef4444", fontSize: "0.85rem", textAlign: "center" }}>Hubo un error. Intentá de nuevo o escribinos por WhatsApp.</p>}
            <p style={{ gridColumn: "1/-1", fontSize: "0.75rem", color: "#8892a4", textAlign: "center" }}>🔒 Tus datos son confidenciales. Sin spam, sin compromiso.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 24px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "4px", background: "linear-gradient(135deg,#c9a84c,#e8c96a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "10px" }}>INMOCREADOR</div>
      <p style={{ fontSize: "0.8rem", color: "#8892a4", marginBottom: "24px" }}>Sistema Inteligente Inmobiliario · Río Cuarto y Zona Sur de Córdoba</p>
      <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
        {[["#sistema", "Sistema"], ["#planes", "Planes"], ["#zona", "Zona"], ["#contacto", "Demo"]].map(([href, label]) => (
          <a key={label} href={href} style={{ color: "#8892a4", textDecoration: "none", fontSize: "0.8rem" }}>{label}</a>
        ))}
      </div>
      <p style={{ fontSize: "0.73rem", color: "rgba(136,146,164,0.45)" }}>© 2026 INMOCREADOR · El Imperio del Sur</p>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════
// CATA IA CHAT
// ══════════════════════════════════════════════════════════
const cataKB: { keys: string[]; reply: string }[] = [
  { keys: ["precio", "costo", "cuanto", "vale", "plan"], reply: "Tenemos dos planes:\n\n🥈 **Starter** — USD 120/mes + USD 150 setup\n🥇 **Pro** — USD 220/mes + USD 150 setup\n\nAmbos incluyen sistema personalizado con tu marca. ¿Cuál te interesa?" },
  { keys: ["incluye", "módulo", "modulo", "funciones", "tiene"], reply: "El sistema incluye **9 módulos**: CRM, Funnel, Cata IA 24/7, WhatsApp IA, Dashboard ejecutivo, Radar IA, Marketing IA, Alquileres y Tour 360°. ¿Querés que te cuente más sobre alguno?" },
  { keys: ["demo", "ver", "probar", "mostrar"], reply: "¡Perfecto! Te hacemos una **demo personalizada** de 30 minutos con tus propiedades y tu marca. ¿Te abro el WhatsApp para coordinar?" },
  { keys: ["comunidad", "red", "app", "varios"], reply: "La **Red Comunidad** viene pronto 🚀 — conecta tu inmobiliaria con toda la red regional con un click. Ciudadanos calificados, match automático y gamificación. ¿Te anoto en la lista anticipada?" },
  { keys: ["whatsapp", "contacto", "hablar", "llamar", "quiero"], reply: `¡Te conecto ahora con el equipo! <a href="https://wa.me/${WA}?text=Hola,%20quiero%20saber%20más%20sobre%20INMOCREADOR" target="_blank" style="display:inline-block;margin-top:10px;background:linear-gradient(135deg,#c9a84c,#e8c96a);color:#060810;padding:8px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.82rem;">Hablar por WhatsApp →</a>` },
];

const planReplies: Record<string, string> = {
  starter: `El plan **Starter** incluye funnel personalizado, CRM, Cata IA 24/7 y WhatsApp por **USD 120/mes** + USD 150 setup. ¿Querés coordinar una demo? <a href="https://wa.me/${WA}?text=Quiero%20info%20del%20plan%20Starter%20de%20INMOCREADOR" target="_blank" style="display:inline-block;margin-top:10px;background:linear-gradient(135deg,#c9a84c,#e8c96a);color:#060810;padding:8px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.82rem;">Hablar por WhatsApp →</a>`,
  pro: `El plan **Pro** es el más completo: todo el sistema con Radar IA, Alquileres, Marketing, Tour 360° y Dashboard ejecutivo por **USD 220/mes** + USD 150 setup. <a href="https://wa.me/${WA}?text=Quiero%20info%20del%20plan%20Pro%20de%20INMOCREADOR" target="_blank" style="display:inline-block;margin-top:10px;background:linear-gradient(135deg,#c9a84c,#e8c96a);color:#060810;padding:8px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.82rem;">Quiero el Plan Pro →</a>`,
  comunidad: `La **Red Comunidad** está en desarrollo — acceso anticipado gratuito. ¿Me dejás tu nombre e inmobiliaria para anotarte? <a href="https://wa.me/${WA}?text=Quiero%20anotarme%20en%20la%20Red%20Comunidad%20de%20INMOCREADOR" target="_blank" style="display:inline-block;margin-top:10px;background:linear-gradient(135deg,#c9a84c,#e8c96a);color:#060810;padding:8px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.82rem;">Anotarme →</a>`,
};

function CataIA() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [inited, setInited] = useState(false);
  const msgsRef = useRef<HTMLDivElement>(null);

  function scrollBottom() { setTimeout(() => { msgsRef.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, 50); }

  function addBot(text: string, isHtml = false) {
    setTyping(false);
    setMsgs(m => [...m, { role: "bot", text, isHtml }]);
    scrollBottom();
  }

  function respond(text: string) {
    const lower = text.toLowerCase();
    const match = cataKB.find(r => r.keys.some(k => lower.includes(k)));
    const reply = match ? match.reply : `Gracias por tu consulta 🙏 Te conecto con el equipo ahora. <a href="https://wa.me/${WA}?text=Hola,%20consulta%20desde%20INMOCREADOR" target="_blank" style="display:inline-block;margin-top:10px;background:linear-gradient(135deg,#c9a84c,#e8c96a);color:#060810;padding:8px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.82rem;">Hablar por WhatsApp →</a>`;
    const isHtml = reply.includes("<a ");
    setTyping(true);
    scrollBottom();
    setTimeout(() => addBot(reply, isHtml), 1000 + Math.random() * 700);
  }

  function sendMsg(text?: string) {
    const t = (text || input).trim();
    if (!t) return;
    setInput("");
    setShowQuick(false);
    setMsgs(m => [...m, { role: "user", text: t }]);
    scrollBottom();
    respond(t);
  }

  function toggle() {
    setOpen(o => {
      if (!o && !inited) {
        setInited(true);
        setTimeout(() => addBot("¡Hola! Soy **Cata**, la IA de INMOCREADOR 👋\n¿Sos dueño/a de una inmobiliaria en Río Cuarto? Contame en qué puedo ayudarte."), 400);
      }
      return !o;
    });
  }

  useEffect(() => {
    const handler = (e: Event) => {
      const plan = (e as CustomEvent).detail as string;
      setShowQuick(false);
      setMsgs(m => [...m, { role: "user", text: `Quiero info sobre el plan ${plan}` }]);
      setTyping(true);
      scrollBottom();
      setTimeout(() => addBot(planReplies[plan] || planReplies.pro, true), 1000);
    };
    window.addEventListener("cata-plan", handler);
    setTimeout(() => { if (!open) toggle(); }, 6500);
    return () => window.removeEventListener("cata-plan", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderText = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");

  return (
    <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 1000 }}>
      {open && (
        <div style={{ position: "absolute", bottom: "80px", right: 0, width: "350px", background: "rgba(10,14,22,0.97)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.75)", display: "flex", flexDirection: "column", backdropFilter: "blur(20px)", animation: "slideUp 0.3s ease" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", background: "linear-gradient(135deg,rgba(201,168,76,0.1),rgba(79,195,247,0.05))", borderBottom: "1px solid rgba(201,168,76,0.14)" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#c9a84c,#4fc3f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>🤖</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.93rem" }}>Cata IA</div>
              <div style={{ fontSize: "0.72rem", color: "#4ade80", display: "flex", alignItems: "center", gap: "5px" }}>● Activa ahora · INMOCREADOR</div>
            </div>
            <button onClick={toggle} style={{ marginLeft: "auto", background: "none", border: "none", color: "#8892a4", fontSize: "1.1rem", cursor: "pointer" }}>✕</button>
          </div>

          {/* Messages */}
          <div ref={msgsRef} style={{ flex: 1, overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: "12px", maxHeight: "360px", minHeight: "160px" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{
                maxWidth: "85%", padding: "11px 15px", fontSize: "0.86rem", lineHeight: 1.55,
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.1))" : "rgba(255,255,255,0.05)",
                border: m.role === "user" ? "1px solid rgba(201,168,76,0.2)" : "1px solid rgba(255,255,255,0.07)",
                borderRadius: m.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
              }}>
                {m.isHtml
                  ? <span dangerouslySetInnerHTML={{ __html: renderText(m.text) }} />
                  : <span dangerouslySetInnerHTML={{ __html: renderText(m.text) }} />
                }
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: "5px", padding: "12px 16px", background: "rgba(255,255,255,0.05)", borderRadius: "4px 16px 16px 16px", alignSelf: "flex-start", width: "fit-content" }}>
                {[0, 0.2, 0.4].map((d, i) => <span key={i} style={{ width: 7, height: 7, background: "#c9a84c", borderRadius: "50%", display: "inline-block", animation: `bounce 1.2s ${d}s infinite` }} />)}
              </div>
            )}
          </div>

          {/* Quick */}
          {showQuick && (
            <div style={{ padding: "10px 16px", display: "flex", flexWrap: "wrap", gap: "7px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {["¿Qué incluye?", "¿Cuánto cuesta?", "Quiero demo"].map(q => (
                <button key={q} onClick={() => sendMsg(q)} style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", fontSize: "0.76rem", padding: "5px 12px", borderRadius: "50px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ display: "flex", gap: "10px", padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMsg()}
              placeholder="Escribí tu consulta..."
              style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "9px", padding: "9px 13px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.86rem", color: "#e8eaf0", outline: "none" }}
            />
            <button onClick={() => sendMsg()} style={{ background: "linear-gradient(135deg,#c9a84c,#e8c96a)", border: "none", borderRadius: "9px", width: "38px", height: "38px", cursor: "pointer", fontSize: "0.95rem", flexShrink: 0 }}>➤</button>
          </div>
        </div>
      )}

      <button id="cata-toggle-btn" onClick={toggle} style={{ width: 62, height: 62, borderRadius: "50%", background: "linear-gradient(135deg,#c9a84c,#e8c96a)", border: "none", cursor: "pointer", fontSize: "1.5rem", boxShadow: "0 8px 32px rgba(201,168,76,0.5)", position: "relative", transition: "transform 0.3s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        🤖
        <span style={{ position: "absolute", top: -3, right: -3, width: 16, height: 16, background: "#4ade80", borderRadius: "50%", border: "2px solid #060810", animation: "pulse 2s infinite" }} />
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SHARED STYLES
// ══════════════════════════════════════════════════════════
const labelStyle: React.CSSProperties = { fontFamily: "'JetBrains Mono',monospace", fontSize: "0.73rem", letterSpacing: "3px", textTransform: "uppercase", color: "#c9a84c", marginBottom: "14px" };
const titleStyle: React.CSSProperties = { fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.4rem,5.5vw,4.2rem)", lineHeight: 1, letterSpacing: "2px", marginBottom: "20px" };
const cardBase: React.CSSProperties = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "28px", transition: "border-color 0.3s, transform 0.3s" };

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  .overlay { position: fixed; inset: 0; background: linear-gradient(180deg,rgba(6,8,16,0.72) 0%,rgba(6,8,16,0.5) 40%,rgba(6,8,16,0.82) 100%); z-index: 1; pointer-events: none; }
  .card-hover:hover { border-color: rgba(201,168,76,0.32) !important; transform: translateY(-4px); }
  .fade-up { animation: fadeUp 0.8s ease both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }f
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.45s; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(1.4); } }
  @keyframes bounce { 0%,60%,100% { transform:translateY(0); } 30% { transform:translateY(-8px); } }
  @keyframes slideUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
  .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 4px; }
`;




