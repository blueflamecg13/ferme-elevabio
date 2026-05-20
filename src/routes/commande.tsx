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

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(80, "Nom trop long").regex(/^[\p{L}\s'-]+$/u, "Caractères invalides"),
  phone: z.string().trim().min(7, "Téléphone invalide").max(20).regex(/^[+\d\s().-]+$/, "Téléphone invalide"),
  email: z.string().trim().email("Email invalide").max(120).optional().or(z.literal("")),
  product: z.enum(productOptions.map((p) => p.id) as [string, ...string[]]),
  breed: z.enum(breedOptions),
  quantity: z.coerce.number().int().min(1, "Min. 1").max(10000, "Quantité trop élevée"),
  message: z.string().trim().max(800, "Message trop long").optional().or(z.literal("")),
});

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

    // Anti-spam : honeypot
    if (data.website.trim() !== "") {
      setErrors({ form: "Erreur de validation." });
      return;
    }
    // Anti-spam : soumission trop rapide (< 3s = bot)
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
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">Commander</span>
        <h1 className="mt-2 text-4xl md:text-5xl font-display font-bold text-primary">Passez votre commande</h1>
        <p className="mt-3 text-muted-foreground">Remplissez le formulaire ci-dessous. Votre demande nous sera envoyée par WhatsApp pour une réponse rapide.</p>

        {sent && (
          <div className="mt-6 flex items-start gap-3 bg-primary/10 border border-primary/30 text-primary rounded-2xl p-4">
            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold">Commande envoyée !</div>
              <div className="text-sm opacity-90">Nous vous répondrons rapidement via WhatsApp ou téléphone.</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-8 bg-card rounded-3xl shadow-card p-6 sm:p-8 space-y-5">
          <Field label="Nom complet *" error={errors.name}>
            <input type="text" required maxLength={80} autoComplete="name" value={data.name} onChange={(e) => update("name", e.target.value)} className="form-input" />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Téléphone *" error={errors.phone}>
              <input type="tel" required maxLength={20} autoComplete="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} className="form-input" placeholder="+242 ..." />
            </Field>
            <Field label="Email (optionnel)" error={errors.email}>
              <input type="email" maxLength={120} autoComplete="email" value={data.email} onChange={(e) => update("email", e.target.value)} className="form-input" />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Produit *" error={errors.product}>
              <select value={data.product} onChange={(e) => update("product", e.target.value)} className="form-input">
                {productOptions.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </Field>
            <Field label="Race *" error={errors.breed}>
              <select value={data.breed} onChange={(e) => update("breed", e.target.value as typeof data.breed)} className="form-input">
                {breedOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Quantité *" error={errors.quantity}>
            <input type="number" required min={1} max={10000} value={data.quantity} onChange={(e) => update("quantity", Number(e.target.value))} className="form-input" />
          </Field>

          <Field label="Message (optionnel)" error={errors.message}>
            <textarea rows={4} maxLength={800} value={data.message} onChange={(e) => update("message", e.target.value)} className="form-input resize-none" placeholder="Précisez vos besoins, dates de livraison souhaitées..." />
          </Field>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold hover:brightness-110 transition">
              <MessageCircle className="w-4 h-4" /> Envoyer via WhatsApp
            </button>
            <a href="tel:+242068172503" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3.5 font-semibold hover:brightness-95 transition">
              <Phone className="w-4 h-4" /> Appeler directement
            </a>
          </div>
          <p className="text-xs text-muted-foreground pt-2">En envoyant ce formulaire, vous acceptez d'être recontacté. Aucune donnée n'est stockée sur ce site.</p>
        </form>

        <p className="mt-6 text-sm text-muted-foreground text-center">
          Vous cherchez plutôt nos formations ? <Link to="/formation" className="text-primary font-semibold underline">Voir le programme</Link>
        </p>
      </section>

      <style>{`
        .form-input {
          width: 100%;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          padding: 0.7rem 0.95rem;
          font-size: 0.95rem;
          color: var(--color-foreground);
          transition: border-color .15s, box-shadow .15s;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 20%, transparent);
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
