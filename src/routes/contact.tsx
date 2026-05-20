import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Phone, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Elevabio Ferme Avicole | Pointe-Noire Congo" },
      { name: "description", content: "Contactez Elevabio à Pointe-Noire : téléphone, WhatsApp, réseaux sociaux et adresse à NGOUOLONDÉLÉ Japon, près du Ponton Plage." },
      { property: "og:title", content: "Contact — Elevabio" },
      { property: "og:description", content: "Joignez Elevabio à Pointe-Noire, Congo." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">Contact</span>
        <h1 className="mt-2 text-4xl md:text-5xl font-display font-bold text-primary">Parlons de votre projet</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">Notre équipe est à votre disposition pour répondre à toutes vos questions.</p>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <a href="tel:+242068172503" className="bg-card rounded-3xl shadow-card p-7 hover:shadow-elegant transition group">
            <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center"><Phone className="w-5 h-5" /></div>
            <h2 className="mt-4 font-display font-bold text-xl">Téléphone</h2>
            <p className="mt-1 text-primary font-semibold">+242 06 817 25 03</p>
          </a>
          <a href="https://wa.me/242068172503" className="bg-card rounded-3xl shadow-card p-7 hover:shadow-elegant transition">
            <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground grid place-items-center"><MessageCircle className="w-5 h-5" /></div>
            <h2 className="mt-4 font-display font-bold text-xl">WhatsApp</h2>
            <p className="mt-1 text-muted-foreground">Réponse rapide tous les jours</p>
          </a>
          <div className="bg-card rounded-3xl shadow-card p-7 md:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center"><MapPin className="w-5 h-5" /></div>
            <h2 className="mt-4 font-display font-bold text-xl">Adresse</h2>
            <p className="mt-1 text-foreground/85">NGOUOLONDÉLÉ Japon, non loin du Ponton Plage</p>
            <p className="text-muted-foreground">Pointe-Noire, République du Congo 🇨🇬</p>
          </div>
          <div className="md:col-span-2 bg-card rounded-3xl shadow-card p-7">
            <h2 className="font-display font-bold text-xl">Réseaux sociaux</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="https://facebook.com/Elevabio" className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 font-medium hover:bg-primary hover:text-primary-foreground transition"><Facebook className="w-4 h-4" /> Facebook</a>
              <a href="https://instagram.com/Elevabio" className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 font-medium hover:bg-primary hover:text-primary-foreground transition"><Instagram className="w-4 h-4" /> Instagram</a>
              <a href="https://tiktok.com/@Elevabio" className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 font-medium hover:bg-primary hover:text-primary-foreground transition">TikTok</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
