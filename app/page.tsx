"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ciudad, setCiudad] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("Inmobiliarias").insert([
      {
        nombre,
        whatsapp,
        ciudad,
      },
    ]);

    if (!error) {
      alert("Inmobiliaria registrada 🚀");
      setNombre("");
      setWhatsapp("");
      setCiudad("");
    } else {
      alert("Error al guardar");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>INMOCREADOR CRM</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre inmobiliaria"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="WhatsApp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <br /><br />

        <button type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}