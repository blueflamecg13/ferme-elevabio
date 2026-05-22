import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/races")({
  head: () => ({
    meta: [
      { title: "Nos Races — Goliath & Brahma | ElevaBio" },
      { name: "description", content: "Découvrez les races Goliath et Brahma élevées par ElevaBio à Pointe-Noire." },
    ],
  }),
  component: RacesPage,
});

function RacesPage() {
  return (
    <Layout>
      <section className="page-hero" style={{ marginTop: 24 }}>
        <span className="eyebrow">Nos Races</span>
        <h1>Goliath & Brahma</h1>
        <p>Deux races d'exception sélectionnées pour leur taille, leur robustesse et leur rendement remarquable.</p>
      </section>

      <section className="inner-page">
        <div className="container">
          <article className="race-card" id="goliath" style={{ marginBottom: 40 }}>
            <div className="race-grid" style={{ gridTemplateColumns: "1fr 1.2fr", alignItems: "center" }}>
              <img src="/img/goliath.jpg" alt="Poulet Goliath" style={{ borderRadius: "var(--radius-lg)", height: "100%", minHeight: 320, objectFit: "cover" }} />
              <div className="race-card-body" style={{ background: "var(--cream)", borderRadius: "var(--radius-lg)" }}>
                <h2>Goliath</h2>
                <p>Considérée comme la plus grande race de poule au monde, originaire de la République Démocratique du Congo. Le Goliath impressionne par sa taille et sa robustesse.</p>
                <ul>
                  <li><strong>Poids :</strong> jusqu'à 7 kg pour le coq, 5 kg pour la poule.</li>
                  <li><strong>Production :</strong> excellente viande, fibres tendres.</li>
                  <li><strong>Rusticité :</strong> très adaptée au climat tropical du Congo.</li>
                  <li><strong>Ponte :</strong> 80 à 120 œufs/an, gros calibre.</li>
                </ul>
                <Link to="/commande" className="btn btn-lime" style={{ marginTop: 20 }}>Commander</Link>
              </div>
            </div>
          </article>

          <article className="race-card" id="brahma">
            <div className="race-grid" style={{ gridTemplateColumns: "1.2fr 1fr", alignItems: "center" }}>
              <div className="race-card-body" style={{ background: "var(--cream)", borderRadius: "var(--radius-lg)" }}>
                <h2>Brahma</h2>
                <p>Race majestueuse dite « roi des poulets ». Plumage soyeux, tempérament docile, idéale pour la reproduction et l'ornement.</p>
                <ul>
                  <li><strong>Poids adulte :</strong> 5 à 6 kg</li>
                  <li><strong>Pattes emplumées</strong> caractéristiques</li>
                  <li><strong>Ponte régulière</strong> en hiver</li>
                  <li>Excellente race pour la reproduction et l'élevage familial</li>
                </ul>
                <Link to="/commande" className="btn btn-lime" style={{ marginTop: 20 }}>Commander</Link>
              </div>
              <img src="/img/brahma.jpg" alt="Brahma" style={{ borderRadius: "var(--radius-lg)", height: "100%", minHeight: 320, objectFit: "cover" }} />
            </div>
          </article>

          <div className="cta-banner">
            <h2>Intéressé par nos races ?</h2>
            <p>Commandez vos œufs fertiles, poussins ou reproducteurs dès maintenant.</p>
            <Link to="/commande" className="btn btn-lime">Passer commande</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
