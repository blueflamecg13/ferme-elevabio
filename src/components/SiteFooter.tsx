import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo-wrapper">
            <img src="/img/logo-elevabio.jpg" alt="Logo ElevaBio" className="site-logo" />
            <div className="logo-text">
              <span className="logo" style={{ color: "#fff" }}>ElevaBio</span>
            </div>
          </Link>
          <p>Ferme avicole spécialiste des races Goliath et Brahma à Pointe-Noire.</p>
          <div className="social-links">
            <a href="https://facebook.com/Elevabio" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com/Elevabio" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg>
            </a>
            <a href="https://tiktok.com/@Elevabio" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h5>Navigation</h5>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/races">Nos Races</Link></li>
            <li><Link to="/commande">Commander</Link></li>
            <li><Link to="/formation">Formation</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Produits et Services</h5>
          <ul>
            <li><Link to="/commande">Œufs fertiles</Link></li>
            <li><Link to="/commande">Poussins</Link></li>
            <li><Link to="/commande">Reproducteurs</Link></li>
            <li><Link to="/formation">Formation</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li><a href="tel:+242068172503">+242 06 817 25 03</a></li>
            <li><Link to="/contact">Adresse & Réseaux</Link></li>
            <li><a href="https://wa.me/242068172503" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-wordmark">
        <p className="footer-wordmark-text" aria-hidden="true">ElevaBio</p>
        <Link to="/commande" className="btn btn-lime shop-embed">Passer commande</Link>
      </div>
    </footer>
  );
}
