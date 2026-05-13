import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { Problema, Solucion, IA, Stats, Zona, SocialProof } from '@/components/Sections'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Solucion />
        <IA />
        <Stats />
        <Zona />
        <SocialProof />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
