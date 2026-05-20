import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import goliathImg from "@/assets/goliath.jpg";
import brahmaImg from "@/assets/hero-brahma.jpg";

export const Route = createFileRoute("/races")({
  head: () => ({
    meta: [
      { title: "Nos Races Goliath et Brahma | Elevabio" },
      { name: "description", content: "Découvrez les races Goliath et Brahma élevées par Elevabio à Pointe-Noire : caractéristiques, atouts et conseils d'élevage." },
      { property: "og:title", content: "Races Goliath & Brahma — Elevabio" },
      { property: "og:description", content: "Caractéristiques et atouts des races Goliath et Brahma." },
    ],
  }),
  component: Races,
});

function Races() {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">Nos Races</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Elevabio se concentre exclusivement sur deux races d'exception : Goliath et Brahma.</p>

        <article className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <img src={goliathImg} alt="Race Goliath" className="rounded-3xl shadow-card w-full" />
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">Goliath</h2>
            <p className="mt-3 text-muted-foreground">Considérée comme la plus grande race de poule au monde, originaire de la République Démocratique du Congo. Le Goliath impressionne par sa taille et sa robustesse.</p>
            <ul className="mt-5 space-y-2 text-foreground/80">
              <li><b>Poids :</b> jusqu'à 7 kg pour le coq, 5 kg pour la poule.</li>
              <li><b>Production :</b> excellente viande, fibres tendres.</li>
              <li><b>Rusticité :</b> très adaptée au climat tropical du Congo.</li>
              <li><b>Ponte :</b> 80 à 120 œufs/an, gros calibre.</li>
            </ul>
          </div>
        </article>

        <article className="mt-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img src={brahmaImg} alt="Race Brahma" className="rounded-3xl shadow-card w-full" />
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl font-display font-bold text-foreground">Brahma</h2>
            <p className="mt-3 text-muted-foreground">Surnommée le « roi des poulets », la Brahma est une race majestueuse au plumage soyeux et aux pattes emplumées.</p>
            <ul className="mt-5 space-y-2 text-foreground/80">
              <li><b>Poids :</b> 5 à 6 kg pour le coq.</li>
              <li><b>Caractère :</b> docile, idéale en élevage familial.</li>
              <li><b>Ponte :</b> régulière, même en saison fraîche.</li>
              <li><b>Esthétique :</b> très prisée en ornement et reproduction.</li>
            </ul>
          </div>
        </article>
      </section>
    </Layout>
  );
}
