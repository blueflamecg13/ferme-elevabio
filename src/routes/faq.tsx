import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useMemo, useState } from "react";
import { ChevronDown, HelpCircle, Search, X } from "lucide-react";


export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Élevage Goliath & Brahma, Biosécurité, Commandes | Elevabio" },
      { name: "description", content: "Réponses aux questions fréquentes sur l'élevage des races Goliath et Brahma, la biosécurité, les délais de commande et nos formations avicoles à Pointe-Noire." },
      { property: "og:title", content: "FAQ — Elevabio" },
      { property: "og:description", content: "Tout savoir sur nos races, la biosécurité, les délais et les formations." },
    ],
  }),
  component: FaqPage,
});

type QA = { q: string; a: string };

const sections: { title: string; items: QA[] }[] = [
  {
    title: "Élevage Goliath & Brahma",
    items: [
      { q: "Quelles sont les particularités de la race Goliath ?", a: "La Goliath est une race géante issue de croisements sélectionnés, réputée pour son gabarit imposant (les mâles dépassent souvent 7 kg), sa croissance rapide et sa rusticité, idéale sous climat tropical." },
      { q: "Et la race Brahma, quels avantages ?", a: "La Brahma est une race ancienne, calme, résistante au froid comme à la chaleur, à plumage dense et pattes emplumées. C'est une excellente pondeuse d'œufs bruns et une volaille de chair recherchée." },
      { q: "Quelle alimentation conseillez-vous ?", a: "Démarrage (0-6 sem.) : aliment poussin riche en protéines (20-22%). Croissance (6-16 sem.) : aliment croissance (18%). Adulte : aliment ponte ou reproducteur. Toujours associer eau propre fraîche à volonté et grit/coquilles." },
      { q: "À quel âge commencent les pontes ?", a: "Les Brahma pondent généralement à partir de 6-7 mois. Les Goliath, plus tardives, commencent vers 7-8 mois selon les conditions d'élevage." },
    ],
  },
  {
    title: "Biosécurité",
    items: [
      { q: "Comment prévenir les maladies dans mon élevage ?", a: "Quarantaine de tout nouveau sujet (21 jours minimum), pédiluve à l'entrée du poulailler, nettoyage et désinfection réguliers, vide sanitaire entre bandes, lutte contre rongeurs et oiseaux sauvages." },
      { q: "Quels vaccins sont indispensables au Congo ?", a: "Newcastle (rappel tous les 3 mois), Gumboro, variole aviaire et coryza selon la pression locale. Nos poussins partent vaccinés Newcastle + Gumboro et un protocole complet vous est remis." },
      { q: "Que faire en cas de mortalité suspecte ?", a: "Isoler immédiatement les sujets malades, ne pas mélanger les bandes, contacter un vétérinaire ou nous appeler au +242 06 817 25 03. Ne jamais consommer ni vendre une volaille morte de cause inconnue." },
      { q: "Comment désinfecter le poulailler ?", a: "Vider, gratter, laver à l'eau savonneuse, rincer, puis désinfectant agréé (crésyl, ammonium quaternaire ou eau de javel diluée). Laisser sécher 7 à 14 jours avant remise en charge." },
    ],
  },
  {
    title: "Commandes & délais",
    items: [
      { q: "Quels sont les délais de livraison ?", a: "Œufs fertiles : 2 à 5 jours selon disponibilité. Poussins d'un jour : sur réservation, départ chaque semaine. Reproducteurs adultes : 1 à 3 semaines selon la race et le lot demandé." },
      { q: "Comment passer commande ?", a: "Remplissez le formulaire sur la page Commander : votre demande nous parvient instantanément par WhatsApp avec un récapitulatif clair. Nous confirmons disponibilité, prix et délai sous 24h ouvrées." },
      { q: "Livrez-vous en dehors de Pointe-Noire ?", a: "Oui, dans tout le Congo et la sous-région. Les frais de transport sont à la charge du client et nous organisons l'expédition par bus, avion ou transporteur agréé selon la destination." },
      { q: "Un acompte est-il demandé ?", a: "Oui, 50% à la commande pour réserver le lot, le solde à la livraison ou à l'enlèvement. Paiement par Mobile Money, virement ou espèces." },
    ],
  },
  {
    title: "Formations",
    items: [
      { q: "Qui peut suivre vos formations ?", a: "Toute personne souhaitant se lancer dans l'aviculture : débutants, éleveurs en activité, porteurs de projet, coopératives. Aucun prérequis, support en français." },
      { q: "Quelle est la durée et le contenu ?", a: "Modules de 2 à 5 jours, théorie + pratique sur notre ferme : installation, alimentation, biosécurité, reproduction, gestion économique. Attestation remise en fin de formation." },
      { q: "Quel est le coût d'une formation ?", a: "Le tarif dépend du module et du nombre de participants. Contactez-nous pour un devis personnalisé adapté à votre projet (groupes, entreprises, ONG)." },
      { q: "Proposez-vous un suivi après formation ?", a: "Oui, un accompagnement post-formation (WhatsApp + visites) est inclus pendant 3 mois pour vous aider à démarrer sereinement votre élevage." },
    ],
  },
];

function Item({ qa }: { qa: QA }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground">{qa.q}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 pr-8 text-muted-foreground leading-relaxed">{qa.a}</p>}
    </div>
  );
}

const TAGS = ["Tous", "Élevage", "Biosécurité", "Commandes", "Formations"] as const;

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function FaqPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<(typeof TAGS)[number]>("Tous");

  const filteredSections = useMemo(() => {
    const q = normalize(query.trim());
    return sections
      .filter((s) => {
        if (tag === "Tous") return true;
        return normalize(s.title).includes(normalize(tag));
      })
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (qa) => !q || normalize(qa.q).includes(q) || normalize(qa.a).includes(q),
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [query, tag]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sections.flatMap((s) =>
      s.items.map((qa) => ({
        "@type": "Question",
        name: qa.q,
        acceptedAnswer: { "@type": "Answer", text: qa.a },
      })),
    ),
  };

  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">FAQ</span>
        <h1 className="mt-2 text-4xl md:text-5xl font-display font-bold text-primary">Questions fréquentes</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Tout ce qu'il faut savoir sur l'élevage Goliath & Brahma, la biosécurité, nos délais de commande et nos formations.
        </p>

        {/* Recherche + filtres */}
        <div className="mt-8 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher : biosécurité, délais, formation, vaccin..."
              className="w-full bg-card border border-border rounded-2xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              aria-label="Rechercher dans la FAQ"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Effacer"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-secondary"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  tag === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {filteredSections.length === 0 ? (
            <div className="bg-card rounded-3xl shadow-card p-10 text-center">
              <p className="text-muted-foreground">Aucun résultat pour <span className="font-semibold text-foreground">"{query}"</span>.</p>
              <button type="button" onClick={() => { setQuery(""); setTag("Tous"); }} className="mt-4 text-primary font-semibold underline">Réinitialiser</button>
            </div>
          ) : (
            filteredSections.map((s) => (
              <div key={s.title} className="bg-card rounded-3xl shadow-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-display font-bold text-primary">{s.title}</h2>
                </div>
                <div>
                  {s.items.map((qa) => <Item key={qa.q} qa={qa} />)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 text-center bg-primary/5 border border-primary/20 rounded-3xl p-8">
          <h2 className="text-2xl font-display font-bold text-primary">Une autre question ?</h2>
          <p className="mt-2 text-muted-foreground">Écrivez-nous directement, nous répondons sous 24h.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:brightness-110 transition">Nous contacter</Link>
            <Link to="/commande" className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold hover:brightness-95 transition">Passer commande</Link>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>
    </Layout>
  );
}

