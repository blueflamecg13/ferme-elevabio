import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useRef, useState } from "react";

export const Route = createFileRoute("/commande")({
  head: () => ({
    meta: [
      { title: "Commander — ElevaBio" },
      { name: "description", content: "Commandez œufs fertiles, poussins, reproducteurs Goliath & Brahma ou une formation chez ElevaBio." },
    ],
  }),
  component: CommandePage,
});

const WA = "242068172503";

const PRODUITS = [
  { value: "Œufs fertiles", races: ["Goliath", "Brahma"] },
  { value: "Poussins", races: ["Goliath", "Brahma"] },
  { value: "Reproducteurs", races: ["Goliath", "Brahma"] },
  { value: "Formation", races: [] },
];

function checkRateLimit() {
  if (typeof window === "undefined") return { ok: true };
  const key = "elevabio_rl";
  const now = Date.now();
  try {
    const raw = JSON.parse(localStorage.getItem(key) || "{}");
    if (raw.blockedUntil && now < raw.blockedUntil) {
      return { ok: false, retryInSec: Math.ceil((raw.blockedUntil - now) / 1000) };
    }
    const hits = (raw.hits || []).filter((t: number) => now - t < 10 * 60 * 1000);
    if (hits.length >= 3) {
      const blockedUntil = now + 15 * 60 * 1000;
      localStorage.setItem(key, JSON.stringify({ hits, blockedUntil }));
      return { ok: false, retryInSec: 15 * 60 };
    }
    hits.push(now);
    localStorage.setItem(key, JSON.stringify({ hits }));
    return { ok: true };
  } catch {
    return { ok: true };
  }
}

function CommandePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(Date.now());
  const [produit, setProduit] = useState("");
  const [error, setError] = useState<string | null>(null);

  const currentRaces = PRODUITS.find((p) => p.value === produit)?.races || [];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    if ((fd.get("website") as string)?.length) return;
    if (Date.now() - mountedAt.current < 3000) {
      setError("Veuillez patienter quelques secondes avant d'envoyer.");
      return;
    }
    const rl = checkRateLimit();
    if (!rl.ok) {
      setError(`Trop de tentatives. Réessayez dans ${Math.ceil((rl.retryInSec || 60) / 60)} minutes.`);
      return;
    }

    const nom = String(fd.get("nom") || "").trim();
    const tel = String(fd.get("telephone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const race = String(fd.get("race") || "");
    const quantite = String(fd.get("quantite") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!nom || !tel || !produit) {
      setError("Veuillez remplir nom, téléphone et produit.");
      return;
    }
    const phoneClean = tel.replace(/[\s().-]/g, "");
    if (!/^(\+\d{7,15}|0\d{8,9})$/.test(phoneClean)) {
      setError("Numéro de téléphone invalide.");
      return;
    }
    if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Email invalide.");
      return;
    }

    let text = "Bonjour ElevaBio,\n\nJe souhaite passer commande :\n";
    text += "• Nom : " + nom + "\n";
    text += "• Téléphone : " + tel + "\n";
    if (email) text += "• Email : " + email + "\n";
    text += "• Produit : " + produit + "\n";
    if (race) text += "• Race : " + race + "\n";
    if (quantite) text += "• Quantité : " + quantite + "\n";
    if (message) text += "• Message : " + message + "\n";

    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    formRef.current?.reset();
    setProduit("");
  };

  return (
    <Layout>
      <section className="page-hero" style={{ marginTop: 24 }}>
        <span className="eyebrow">Nous sommes là pour vous</span>
        <h1>Commandez vos Goliath & Brahma en toute simplicité</h1>
        <p>Œufs fertiles, poussins, reproducteurs ou formation : remplissez le formulaire, votre demande nous arrive immédiatement par WhatsApp avec un récapitulatif clair.</p>
      </section>

      <section className="inner-page">
        <div className="container">
          <div className="contact-quick">
            <a href="https://wa.me/242068172503" target="_blank" rel="noopener noreferrer">WhatsApp — +242 06 817 25 03</a>
            <a href="tel:+242068172503">Téléphone — +242 06 817 25 03</a>
            <Link to="/formation">Plutôt une formation ? Voir le programme</Link>
          </div>

          <form ref={formRef} className="form-card" id="order-form" noValidate onSubmit={onSubmit}>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="website">Site web (laisser vide)</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="nom">Nom complet *</label>
              <input type="text" id="nom" name="nom" required />
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Téléphone *</label>
              <input type="tel" id="telephone" name="telephone" required placeholder="+242 06 XXX XX XX" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (optionnel)</label>
              <input type="email" id="email" name="email" />
            </div>

            <div className="form-group">
              <label htmlFor="produit">Produit *</label>
              <select id="produit" name="produit" required value={produit} onChange={(e) => setProduit(e.target.value)}>
                <option value="">Choisir un produit</option>
                {PRODUITS.map((p) => (
                  <option key={p.value} value={p.value}>{p.value}</option>
                ))}
              </select>
            </div>

            {currentRaces.length > 0 && (
              <div className="form-group">
                <label htmlFor="race">Race *</label>
                <select id="race" name="race" required defaultValue="">
                  <option value="">Choisir une race</option>
                  {currentRaces.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="quantite">Quantité</label>
              <input type="text" id="quantite" name="quantite" placeholder="Ex : 24 œufs, 10 poussins..." />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Précisez votre demande, date souhaitée, etc."></textarea>
            </div>

            {error && <p style={{ color: "#b91c1c", marginBottom: 16, fontSize: "0.9rem" }}>{error}</p>}

            <button type="submit" className="btn btn-lime" style={{ width: "100%", justifyContent: "center" }}>
              Envoyer via WhatsApp
            </button>
            <p className="form-note">Votre demande est transmise par WhatsApp avec un récapitulatif clair. Réponse rapide garantie.</p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
