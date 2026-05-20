import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import trainingImg from "@/assets/training.jpg";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/formation")({
  head: () => ({
    meta: [
      { title: "Formation Avicole Goliath & Brahma | Elevabio Pointe-Noire" },
      { name: "description", content: "Formations pratiques en aviculture : démarrage d'élevage, soin des Goliath et Brahma, reproduction et gestion sanitaire." },
      { property: "og:title", content: "Formation Avicole — Elevabio" },
      { property: "og:description", content: "Programmes pratiques pour aviculteurs débutants et confirmés." },
    ],
  }),
  component: Training,
});

function Training() {
  const modules = [
    "Démarrer son élevage avicole de A à Z",
    "Conduite d'élevage Goliath : nutrition, croissance",
    "Élevage Brahma : reproduction et incubation",
    "Hygiène, biosécurité et prévention des maladies",
    "Gestion économique et commercialisation",
  ];
  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">Formation</span>
        <h1 className="mt-2 text-4xl md:text-5xl font-display font-bold text-primary">Devenez un aviculteur expert</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Programmes pratiques animés par les experts Elevabio. Sessions sur site à Pointe-Noire.</p>

        <div className="mt-10 grid md:grid-cols-2 gap-8 items-start">
          <img src={trainingImg} alt="Formation Elevabio" className="rounded-3xl shadow-card w-full" />
          <div className="bg-card rounded-3xl shadow-card p-7">
            <h2 className="text-2xl font-display font-bold text-foreground">Modules</h2>
            <ul className="mt-4 space-y-3">
              {modules.map((m) => (
                <li key={m} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/85">{m}</span>
                </li>
              ))}
            </ul>
            <Link to="/commande" className="mt-7 inline-flex rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold">
              S'inscrire à une formation
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
