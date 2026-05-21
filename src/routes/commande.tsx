import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/commande")({
  head: () => ({
    meta: [
      { title: "Passer Commande — Œufs, Poussins, Reproducteurs | Elevabio" },
      { name: "description", content: "Commandez œufs fertiles, poussins, reproducteurs Goliath et Brahma, ou inscrivez-vous à nos formations avicoles à Pointe-Noire." },
      { property: "og:title", content: "Commander — Elevabio" },
      { property: "og:description", content: "Œufs fertiles, poussins, reproducteurs et formations." },
    ],
  }),
  component: Order,
});

const productOptions = [
  { id: "oeufs", label: "Œufs fertiles" },
  { id: "poussins", label: "Poussins" },
  { id: "reproducteurs", label: "Reproducteurs" },
  { id: "formation", label: "Formation" },
] as const;

const breedOptions = ["Goliath", "Brahma", "Les deux"] as const;

// Téléphone international strict : +<indicatif 1-3><chiffres 6-12>, espaces tolérés à la saisie
// Accepte aussi format local Congo commençant par 0 (puis 8 ou 9 chiffres).
const phoneRegex = /^(\+\d{7,15}|0\d{8,9})$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(80, "Nom trop long").regex(/^[\p{L}\s'-]+$/u, "Caractères invalides"),
  phone: z.string()
    .trim()
    .transform((v) => v.replace(/[\s().-]/g, ""))
    .pipe(z.string().regex(phoneRegex, "Numéro invalide. Format : +242 06 817 25 03 ou 06 817 25 03")),
  email: z.string().trim().max(120).regex(emailRegex, "Format email invalide").optional().or(z.literal("")),
  product: z.enum(productOptions.map((p) => p.id) as [string, ...string[]]),
  breed: z.enum(breedOptions),
  quantity: z.coerce.number().int().min(1, "Min. 1").max(10000, "Quantité trop élevée"),
  message: z.string().trim().max(800, "Message trop long").optional().or(z.literal("")),
});

// Limitation côté client (anti-spam) : max 3 envois / 10 min, sinon blocage 15 min.
const RL_KEY = "elevabio_order_rl";
const RL_WINDOW = 10 * 60 * 1000;
const RL_MAX = 3;
const RL_BLOCK = 15 * 60 * 1000;

function checkRateLimit(): { ok: true } | { ok: false; retryInSec: number } {
  if (typeof window === "undefined") return { ok: true };
  try {
    const now = Date.now();
    const raw = localStorage.getItem(RL_KEY);
    const state: { hits: number[]; blockUntil?: number } = raw ? JSON.parse(raw) : { hits: [] };
    if (state.blockUntil && state.blockUntil > now) {
      return { ok: false, retryInSec: Math.ceil((state.blockUntil - now) / 1000) };
    }
    state.hits = (state.hits || []).filter((t) => now - t < RL_WINDOW);
    if (state.hits.length >= RL_MAX) {
      state.blockUntil = now + RL_BLOCK;
      localStorage.setItem(RL_KEY, JSON.stringify(state));
      return { ok: false, retryInSec: Math.ceil(RL_BLOCK / 1000) };
    }
    state.hits.push(now);
    delete state.blockUntil;
    localStorage.setItem(RL_KEY, JSON.stringify(state));
    return { ok: true };
  } catch {
    return { ok: true };
  }
}

function Order() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({
    name: "", phone: "", email: "",
    product: "oeufs", breed: "Goliath", quantity: 10, message: "",
    website: "", // honeypot
  });
  const [mountedAt] = useState(() => Date.now());

  function update<K extends keyof typeof data>(k: K, v: (typeof data)[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (data.website.trim() !== "") {
      setErrors({ form: "Erreur de validation." });
      return;
    }
    if (Date.now() - mountedAt < 3000) {
      setErrors({ form: "Merci de prendre quelques instants pour remplir le formulaire." });
      return;
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[issue.path.join(".")] = issue.message;
      }
      setErrors(errs);
      return;
    }

    const rl = checkRateLimit();
    if (!rl.ok) {
      const min = Math.ceil(rl.retryInSec / 60);
      setErrors({ form: `Trop de tentatives. Réessayez dans ~${min} min, ou appelez-nous directement.` });
      return;
    }

    setErrors({});
    const productLabel = productOptions.find((p) => p.id === result.data.product)?.label ?? "";
    const lines = [
      "🐔 *Nouvelle commande — Elevabio*",
      "",
      "*Récapitulatif*",
      `• Produit : ${productLabel}`,
      `• Race : ${result.data.breed}`,
      `• Quantité : ${result.data.quantity}`,
      "",
      "*Coordonnées client*",
      `• Nom : ${result.data.name}`,
      `• Téléphone : ${result.data.phone}`,
    ];
    if (result.data.email) lines.push(`• Email : ${result.data.email}`);
    if (result.data.message) {
      lines.push("", "*Message*", result.data.message);
    }
    lines.push("", "Merci de me confirmer la disponibilité, le prix et le délai. 🙏");
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/242068172503?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }


  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="bg-secondary/40 rounded-[2rem] p-6 sm:p-10 lg:p-14 shadow-card">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Colonne gauche */}
            <div className="lg:pr-6">
              <span className="text-accent font-semibold text-xs uppercase tracking-[0.18em]">Nous sommes là pour vous</span>
              <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary leading-[1.05]">
                <span className="text-accent">Commandez</span> vos<br />
                Goliath &amp; Brahma<br />
                en toute simplicité
              </h1>
              <p className="mt-5 text-muted-foreground max-w-md">
                Œufs fertiles, poussins, reproducteurs ou formation : remplissez le formulaire, votre demande nous arrive immédiatement par WhatsApp avec un récapitulatif clair.
              </p>

              <div className="mt-10 space-y-5">
                <a href="https://wa.me/242068172503" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-card">
                    <MessageCircle className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wider">WhatsApp</span>
                    <span className="block font-semibold text-foreground group-hover:text-primary transition">+242 06 817 25 03</span>
                  </span>
                </a>
                <a href="tel:+242068172503" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 rounded-xl bg-accent text-accent-foreground grid place-items-center shadow-card">
                    <Phone className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wider">Téléphone</span>
                    <span className="block font-semibold text-foreground group-hover:text-primary transition">+242 06 817 25 03</span>
                  </span>
                </a>
              </div>

              <p className="mt-10 text-sm text-muted-foreground">
                Plutôt une formation ? <Link to="/formation" className="text-primary font-semibold underline">Voir le programme</Link>
              </p>
            </div>

            {/* Colonne droite : formulaire */}
            <form onSubmit={handleSubmit} noValidate className="bg-card rounded-3xl shadow-elegant p-6 sm:p-8 space-y-4">
              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                <label>Site web (laisser vide)
                  <input type="text" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => update("website", e.target.value)} />
                </label>
              </div>

              {sent && (
                <div className="flex items-start gap-3 bg-primary/10 border border-primary/30 text-primary rounded-2xl p-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold">Commande envoyée !</div>
                    <div className="opacity-90">Réponse rapide via WhatsApp.</div>
                  </div>
                </div>
              )}

              {errors.form && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-xl px-4 py-3 text-sm">{errors.form}</div>
              )}

              <Field label="Nom complet" error={errors.name}>
                <input type="text" required maxLength={80} autoComplete="name" value={data.name} onChange={(e) => update("name", e.target.value)} className="form-input" placeholder="Jean Mavoungou" />
              </Field>

              <Field label="Téléphone" error={errors.phone}>
                <input type="tel" required maxLength={20} autoComplete="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} className="form-input" placeholder="+242 ..." />
              </Field>

              <Field label="Email (optionnel)" error={errors.email}>
                <input type="email" maxLength={120} autoComplete="email" value={data.email} onChange={(e) => update("email", e.target.value)} className="form-input" placeholder="vous@exemple.com" />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Produit" error={errors.product}>
                  <select value={data.product} onChange={(e) => update("product", e.target.value)} className="form-input">
                    {productOptions.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                </Field>
                <Field label="Race" error={errors.breed}>
                  <select value={data.breed} onChange={(e) => update("breed", e.target.value as typeof data.breed)} className="form-input">
                    {breedOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Quantité" error={errors.quantity}>
                <input type="number" required min={1} max={10000} value={data.quantity} onChange={(e) => update("quantity", Number(e.target.value))} className="form-input" />
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea rows={3} maxLength={800} value={data.message} onChange={(e) => update("message", e.target.value)} className="form-input resize-none" placeholder="Précisez vos besoins..." />
              </Field>

              <button type="submit" className="mt-2 w-full inline-flex items-center justify-center gap-3 rounded-full bg-primary text-primary-foreground px-6 py-4 font-semibold hover:brightness-110 transition shadow-card">
                <span className="w-7 h-7 rounded-full bg-primary-foreground/20 grid place-items-center">
                  <MessageCircle className="w-4 h-4" />
                </span>
                Envoyer via WhatsApp
              </button>

              <p className="text-xs text-muted-foreground text-center pt-1">Aucune donnée n'est stockée sur ce site.</p>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .form-input {
          width: 100%;
          background: color-mix(in oklab, var(--color-secondary) 50%, transparent);
          border: 1px solid transparent;
          border-radius: 0.85rem;
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: var(--color-foreground);
          transition: border-color .15s, box-shadow .15s, background .15s;
        }
        .form-input::placeholder { color: color-mix(in oklab, var(--color-foreground) 40%, transparent); }
        .form-input:focus {
          outline: none;
          background: var(--color-background);
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent);
        }
      `}</style>
    </Layout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-destructive mt-1.5">{error}</span>}
    </label>
  );
}
