import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

const NAV = [
  { to: "/", label: "Accueil", id: "index" },
  { to: "/races", label: "Nos Races", id: "races" },
  { to: "/commande", label: "Commander", id: "commande" },
  { to: "/formation", label: "Formation", id: "formation" },
  { to: "/faq", label: "FAQ", id: "faq" },
  { to: "/contact", label: "Contact", id: "contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const currentId =
    NAV.find((n) => n.to === location.pathname)?.id ?? "index";

  return (
    <header className="site-header site-header--solid" id="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo-wrapper">
          <img src="/img/logo-elevabio.jpg" alt="Logo ElevaBio" className="site-logo" width={52} height={52} />
          <div className="logo-text">
            <span className="logo-brand">ElevaBio</span>
            <span className="logo-tag">Ferme avicole</span>
          </div>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-controls="site-nav"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <div className="site-nav" id="site-nav">
          <nav className="nav-main" aria-label="Navigation principale">
            {NAV.map((n) => (
              <Link key={n.id} to={n.to} className={currentId === n.id ? "active" : ""}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link to="/commande" className="btn btn-lime">Commander</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
