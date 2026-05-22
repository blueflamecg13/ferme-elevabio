import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/formation")({
  head: () => ({
    meta: [
      { title: "Formation avicole — ElevaBio" },
      { name: "description", content: "Formations pratiques en aviculture Goliath & Brahma à Pointe-Noire." },
    ],
  }),
  component: FormationPage,
});

function FormationPage() {
  return (
    <Layout>
      <section className="page-hero" style={{ marginTop: 24 }}>
        <span className="eyebrow">Formation</span>
        <h1>Devenez un aviculteur expert</h1>
        <p>Programmes pratiques animés par les experts Elevabio. Sessions sur site à Pointe-Noire.</p>
      </section>

      <section className="inner-page">
        <div className="container">
          <div className="reliability-grid" style={{ marginBottom: 48 }}>
            <div className="reliability-image">
              <img src="/img/Formation.jpg" alt="Formation Elevabio" />
            </div>
            <div className="reliability-content">
              <h2>Modules de formation</h2>
              <p>Des sessions concrètes pour maîtriser l'élevage des races Goliath et Brahma, de l'incubation à la commercialisation.</p>
            </div>
          </div>

          <ul className="modules-list">
            <li>Démarrer son élevage avicole de A à Z</li>
            <li>Conduite d'élevage Goliath : nutrition, croissance</li>
            <li>Élevage Brahma : reproduction et incubation</li>
            <li>Hygiène, biosécurité et prévention des maladies</li>
            <li>Gestion économique et commercialisation</li>
          </ul>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link to="/commande" search={{ produit: "Formation" } as never} className="btn btn-lime">S'inscrire à une formation</Link>
          </div>

          <div className="cta-banner">
            <h2>Une question sur nos formations ?</h2>
            <p>Consultez la FAQ ou contactez-nous directement.</p>
            <Link to="/faq" className="btn btn-outline" style={{ marginRight: 12 }}>FAQ</Link>
            <Link to="/contact" className="btn btn-lime">Nous contacter</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
