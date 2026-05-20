import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Egg, Bird, GraduationCap, Award, ShieldCheck, Sparkles, ArrowRight, Phone } from "lucide-react";
import heroImg from "@/assets/hero-brahma.jpg";
import goliathImg from "@/assets/goliath.jpg";
import chicksImg from "@/assets/chicks.jpg";
import eggsImg from "@/assets/eggs.jpg";
import farmImg from "@/assets/farm.jpg";
import trainingImg from "@/assets/training.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elevabio — Ferme Avicole Goliath & Brahma | Pointe-Noire" },
      { name: "description", content: "Elevabio, ferme avicole à Pointe-Noire, République du Congo. Spécialiste des races Goliath et Brahma : œufs fertiles, poussins, reproducteurs et formations." },
      { property: "og:title", content: "Elevabio — Ferme Avicole Goliath & Brahma" },
      { property: "og:description", content: "Œufs fertiles, poussins, reproducteurs Goliath et Brahma. Pointe-Noire, Congo." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-primary-foreground">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Pointe-Noire · Congo 🇨🇬
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.05]">
              L'excellence avicole<br />
              <span className="text-accent">Goliath & Brahma</span>
            </h1>
            <p className="mt-5 text-lg opacity-95 max-w-lg">
              Élevage premium de races rares. Œufs fertiles, poussins, reproducteurs et formations pour réussir votre projet avicole.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/commande" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3.5 font-semibold shadow-elegant hover:brightness-95 transition">
                Passer commande <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+242068172503" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur border border-primary-foreground/30 px-6 py-3.5 font-semibold hover:bg-primary-foreground/20 transition">
                <Phone className="w-4 h-4" /> +242 06 817 25 03
              </a>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            <img src={heroImg} alt="Coq Brahma" width={600} height={500} className="rounded-3xl object-cover aspect-[4/5] shadow-elegant" />
            <div className="grid gap-4">
              <img src={goliathImg} alt="Coq Goliath" width={600} height={300} loading="lazy" className="rounded-3xl object-cover aspect-square shadow-elegant" />
              <div className="rounded-3xl bg-accent/95 text-accent-foreground p-5 shadow-elegant">
                <div className="text-3xl font-display font-bold">100%</div>
                <div className="text-xs uppercase tracking-widest font-semibold">Races pures certifiées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Nos Produits</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-foreground">Commandez en toute confiance</h2>
          </div>
          <Link to="/commande" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Egg, title: "Œufs fertiles", desc: "Œufs sélectionnés à haut taux d'éclosion.", img: eggsImg },
            { icon: Bird, title: "Poussins", desc: "Poussins en bonne santé, vaccinés et robustes.", img: chicksImg },
            { icon: Award, title: "Reproducteurs", desc: "Reproducteurs Goliath et Brahma de race pure.", img: goliathImg },
            { icon: GraduationCap, title: "Formation", desc: "Programmes pratiques pour aviculteurs.", img: trainingImg },
          ].map((p) => (
            <Link to="/commande" key={p.title} className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elegant transition-all hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="w-11 h-11 -mt-12 mb-3 relative rounded-2xl bg-accent text-accent-foreground grid place-items-center shadow-elegant">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                  Commander <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BREEDS */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Nos Races</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-foreground">Goliath & Brahma : la noblesse avicole</h2>
            <p className="mt-3 text-muted-foreground">Deux races d'exception sélectionnées pour leur taille, leur robustesse et leur rendement remarquable.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-3xl overflow-hidden shadow-card">
              <img src={goliathImg} alt="Race Goliath" loading="lazy" className="w-full h-72 object-cover" />
              <div className="p-7">
                <h3 className="text-2xl font-display font-bold text-primary">Goliath</h3>
                <p className="mt-2 text-muted-foreground">La plus grande race de poule au monde. Excellente production de viande, rusticité exceptionnelle, parfaitement adaptée au climat tropical.</p>
                <ul className="mt-4 space-y-1.5 text-sm text-foreground/80">
                  <li>• Poids adulte : jusqu'à 7 kg</li>
                  <li>• Forte rusticité et adaptabilité</li>
                  <li>• Viande savoureuse, très demandée</li>
                </ul>
              </div>
            </div>
            <div className="bg-card rounded-3xl overflow-hidden shadow-card">
              <img src={heroImg} alt="Race Brahma" loading="lazy" className="w-full h-72 object-cover" />
              <div className="p-7">
                <h3 className="text-2xl font-display font-bold text-primary">Brahma</h3>
                <p className="mt-2 text-muted-foreground">Race majestueuse dite « roi des poulets ». Plumage soyeux, tempérament docile, idéale pour la reproduction et l'ornement.</p>
                <ul className="mt-4 space-y-1.5 text-sm text-foreground/80">
                  <li>• Poids adulte : 5 à 6 kg</li>
                  <li>• Pattes emplumées caractéristiques</li>
                  <li>• Ponte régulière en hiver</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <img src={farmImg} alt="Ferme Elevabio" loading="lazy" className="rounded-3xl shadow-elegant w-full" />
        <div>
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Pourquoi Elevabio ?</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-foreground">Une ferme engagée pour votre réussite</h2>
          <div className="mt-7 space-y-5">
            {[
              { icon: ShieldCheck, title: "Qualité garantie", desc: "Sujets sains, vaccinés, traçabilité complète." },
              { icon: Award, title: "Races pures", desc: "Lignées Goliath et Brahma certifiées 100 %." },
              { icon: GraduationCap, title: "Accompagnement", desc: "Conseils et formations pour démarrer sereinement." },
            ].map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center">
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">{f.title}</h3>
                  <p className="text-muted-foreground text-sm mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-10 md:p-14 text-primary-foreground shadow-elegant">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Prêt à démarrer votre élevage ?</h2>
            <p className="mt-3 opacity-95">Contactez-nous dès aujourd'hui pour réserver vos œufs fertiles, poussins ou reproducteurs.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/commande" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3.5 font-semibold hover:brightness-95 transition">
                Passer commande <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/242068172503" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground text-primary px-6 py-3.5 font-semibold hover:bg-primary-foreground/90 transition">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
