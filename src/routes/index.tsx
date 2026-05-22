import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ElevaBio — Ferme Avicole Goliath & Brahma | Pointe-Noire" },
      { name: "description", content: "Elevabio, ferme avicole à Pointe-Noire, Congo. Œufs fertiles, poussins, reproducteurs et formations Goliath & Brahma." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-bg">
          <img src="/img/brahma.jpg" alt="Ferme avicole ElevaBio" />
        </div>

        <div className="stat-card">
          <div>
            <span className="score">100%</span>
            <p className="stat-label">Races pures certifiées</p>
          </div>
        </div>

        <div className="hero-content container">
          <h1 className="hero-title">L'excellence avicole<br />Goliath & Brahma</h1>
          <p className="hero-subtitle">Élevage premium de races rares. Œufs fertiles, poussins, reproducteurs et formations pour réussir votre projet avicole.</p>
          <div className="hero-actions">
            <Link to="/commande" className="btn btn-lime">Passer commande</Link>
            <a href="https://wa.me/242068172503" className="btn btn-ghost-white" target="_blank" rel="noopener noreferrer">+242 06 817 25 03</a>
          </div>
        </div>

        <div className="hero-cards container">
          <div className="hero-cards-grid">
            <article className="product-mini-card">
              <div>
                <h3>Poulet Goliath</h3>
                <p>La plus grande race de poule au monde, rusticité et production exceptionnelles.</p>
                <Link to="/races" hash="goliath" className="btn btn-dark">Découvrir</Link>
              </div>
              <img className="thumb" src="/img/goliath.jpg" alt="Poulet Goliath" />
            </article>
            <article className="product-mini-card">
              <div>
                <h3>Brahma</h3>
                <p>Le « roi des poulets » — majestueux, docile, idéal pour la reproduction.</p>
                <Link to="/races" hash="brahma" className="btn btn-outline">Découvrir</Link>
              </div>
              <img className="thumb" src="/img/brahma.jpg" alt="Poulet Brahma" />
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Nos Produits</p>
          <h2 className="section-title">Commandez en toute confiance</h2>
          <div className="product-grid-4" style={{ marginTop: 32 }}>
            {[
              { img: "/img/oeufs-fertiles.jpg", title: "Œufs fertiles", desc: "Œufs sélectionnés à haut taux d'éclosion." },
              { img: "/img/Poussins.jpg", title: "Poussins", desc: "Poussins en bonne santé, vaccinés et robustes." },
              { img: "/img/brahma.jpg", title: "Reproducteurs", desc: "Reproducteurs Goliath et Brahma de race pure." },
              { img: "/img/Formation.jpg", title: "Formation", desc: "Programmes pratiques pour aviculteurs." },
            ].map((p) => (
              <article key={p.title} className="product-tile">
                <img src={p.img} alt={p.title} style={{ height: 120, objectFit: "cover", borderRadius: 16, width: "100%" }} />
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <Link to={p.title === "Formation" ? "/formation" : "/commande"} className="btn btn-lime">Commander</Link>
              </article>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link to="/commande" className="btn btn-outline">Voir tout</Link>
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container">
          <p className="section-eyebrow">Nos Races</p>
          <h2 className="section-title">Goliath & Brahma : la noblesse avicole</h2>
          <p className="section-desc" style={{ margin: "16px 0 40px" }}>Deux races d'exception sélectionnées pour leur taille, leur robustesse et leur rendement remarquable.</p>
          <div className="race-grid">
            <article className="race-card">
              <img src="/img/goliath.jpg" alt="Poulet Goliath" />
              <div className="race-card-body">
                <h2>Goliath</h2>
                <p>La plus grande race de poule au monde. Excellente production de viande, rusticité exceptionnelle, parfaitement adaptée au climat tropical.</p>
                <ul>
                  <li>Poids adulte : jusqu'à 7 kg</li>
                  <li>Forte rusticité et adaptabilité</li>
                  <li>Viande savoureuse, très demandée</li>
                </ul>
                <Link to="/races" hash="goliath" className="btn btn-outline" style={{ marginTop: 16 }}>En savoir plus</Link>
              </div>
            </article>
            <article className="race-card">
              <img src="/img/brahma.jpg" alt="Poulet Brahma" />
              <div className="race-card-body">
                <h2>Brahma</h2>
                <p>Race majestueuse dite « roi des poulets ». Plumage soyeux, tempérament docile, idéale pour la reproduction et l'ornement.</p>
                <ul>
                  <li>Poids adulte : 5 à 6 kg</li>
                  <li>Pattes emplumées caractéristiques</li>
                  <li>Ponte régulière en hiver</li>
                </ul>
                <Link to="/races" hash="brahma" className="btn btn-outline" style={{ marginTop: 16 }}>En savoir plus</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Ferme Elevabio</p>
          <h2 className="section-title">Pourquoi Elevabio ?</h2>
          <p className="section-desc" style={{ margin: "12px 0 0" }}>Une ferme engagée pour votre réussite.</p>
          <div className="why-cards" style={{ marginTop: 40 }}>
            <article className="why-card"><h3>Qualité garantie</h3><p>Sujets sains, vaccinés, traçabilité complète.</p></article>
            <article className="why-card"><h3>Races pures</h3><p>Lignées Goliath et Brahma certifiées 100 %.</p></article>
            <article className="why-card"><h3>Accompagnement</h3><p>Conseils et formations pour démarrer sereinement.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="newsletter">
            <div className="newsletter-bg">
              <img src="/img/Formation.jpg" alt="Ferme avicole" />
            </div>
            <div className="newsletter-content">
              <h2>Prêt à démarrer votre élevage ?</h2>
              <p className="hero-subtitle" style={{ margin: "0 auto 28px" }}>Contactez-nous dès aujourd'hui pour réserver vos œufs fertiles, poussins ou reproducteurs.</p>
              <div className="hero-actions" style={{ justifyContent: "center" }}>
                <Link to="/commande" className="btn btn-lime">Passer commande</Link>
                <a href="https://wa.me/242068172503" className="btn btn-ghost-white" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
