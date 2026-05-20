import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Elevabio" className="w-12 h-12 rounded-full" width={48} height={48} />
            <div>
              <div className="font-display font-bold text-xl">Elevabio</div>
              <div className="text-xs uppercase tracking-widest opacity-80">Ferme Avicole</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm opacity-90">
            Spécialistes des races Goliath et Brahma à Pointe-Noire, République du Congo. Œufs fertiles, poussins, reproducteurs et formations professionnelles.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/races" className="hover:text-accent">Nos Races</Link></li>
            <li><Link to="/commande" className="hover:text-accent">Commander</Link></li>
            <li><Link to="/formation" className="hover:text-accent">Formation</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Contact</h4>
          <ul className="space-y-2.5 text-sm opacity-90">
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /><a href="tel:+242068172503">+242 06 817 25 03</a></li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />NGOUOLONDÉLÉ Japon, près du Ponton Plage — Pointe-Noire</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="https://facebook.com/Elevabio" aria-label="Facebook" className="w-9 h-9 grid place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition"><Facebook className="w-4 h-4" /></a>
            <a href="https://instagram.com/Elevabio" aria-label="Instagram" className="w-9 h-9 grid place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition"><Instagram className="w-4 h-4" /></a>
            <a href="https://tiktok.com/@Elevabio" aria-label="TikTok" className="w-9 h-9 grid place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition font-bold text-xs">TT</a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 py-5 text-center text-xs opacity-80">
        © {new Date().getFullYear()} Elevabio Ferme Avicole — Pointe-Noire, République du Congo 🇨🇬
      </div>
    </footer>
  );
}
