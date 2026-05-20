import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.jpg";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/races", label: "Nos Races" },
  { to: "/commande", label: "Commander" },
  { to: "/formation", label: "Formation" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Elevabio Ferme Avicole" className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20" width={44} height={44} />
          <div className="leading-tight">
            <div className="font-display font-bold text-lg text-primary">Elevabio</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ferme Avicole</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3.5 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary transition-colors"
              activeProps={{ className: "px-3.5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link to="/commande" className="hidden md:inline-flex items-center rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-95 transition">
          Commander
        </Link>
        <button aria-label="Menu" className="md:hidden p-2 rounded-md hover:bg-secondary" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary">
                {l.label}
              </Link>
            ))}
            <Link to="/commande" onClick={() => setOpen(false)} className="mt-2 text-center rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold">
              Commander
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
