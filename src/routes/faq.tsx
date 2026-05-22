import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ElevaBio" },
      { name: "description", content: "Questions fréquentes sur l'élevage Goliath & Brahma, la biosécurité, les commandes et les formations." },
    ],
  }),
  component: FaqPage,
});

type Cat = "all" | "elevage" | "biosecurite" | "commandes" | "formations";

const GROUPS: { cat: Exclude<Cat, "all">; title: string; items: { q: string; a: string }[] }[] = [
  {
    cat: "elevage",
    title: "Élevage Goliath & Brahma",
    items: [
      { q: "Quelles sont les particularités de la race Goliath ?", a: "Le Goliath est la plus grande race de poule au monde, originaire de RDC. Coq jusqu'à 7 kg, excellente production de viande, rusticité remarquable et adaptation au climat tropical congolais. Ponte de 80 à 120 œufs/an." },
      { q: "Et la race Brahma, quels avantages ?", a: "La Brahma est docile, majestueuse, avec pattes emplumées. Poids 5-6 kg, ponte régulière même en saison fraîche. Idéale pour reproduction, ornement et élevage familial." },
      { q: "Quelle alimentation conseillez-vous ?", a: "Aliment complet adapté à chaque stade (démarrage, croissance, ponte). Eau propre en permanence, compléments calciques pour les pondeuses. Nos formations détaillent les rations optimales Goliath et Brahma." },
      { q: "À quel âge commencent les pontes ?", a: "En général entre 6 et 8 mois selon la race, l'alimentation et les conditions d'élevage. La Brahma peut pondre plus régulièrement en saison fraîche que d'autres races." },
    ],
  },
  {
    cat: "biosecurite",
    title: "Biosécurité",
    items: [
      { q: "Comment prévenir les maladies dans mon élevage ?", a: "Isolement des nouveaux sujets, désinfection régulière, eau et litière propres, limitation des visiteurs. Vaccination selon protocole adapté au Congo." },
      { q: "Quels vaccins sont indispensables au Congo ?", a: "Nos poussins sont vaccinés selon les maladies courantes locales. Nous vous fournissons un calendrier vaccinal et des conseils à l'achat." },
      { q: "Que faire en cas de mortalité suspecte ?", a: "Isolez immédiatement les sujets malades, contactez un vétérinaire et notre équipe. Ne déplacez pas d'animaux sains sans désinfection préalable." },
      { q: "Comment désinfecter le poulailler ?", a: "Nettoyage complet entre chaque bande, produits désinfectants adaptés, séchage, litière neuve. Module dédié dans nos formations." },
    ],
  },
  {
    cat: "commandes",
    title: "Commandes & délais",
    items: [
      { q: "Quels sont les délais de livraison ?", a: "Les délais varient selon le produit et la disponibilité. Nous confirmons par WhatsApp après réception de votre commande, généralement sous 24 à 48 h." },
      { q: "Comment passer commande ?", a: "Remplissez le formulaire sur la page Commander ou écrivez-nous sur WhatsApp au +242 06 817 25 03." },
      { q: "Livrez-vous en dehors de Pointe-Noire ?", a: "Oui, selon les zones et le type de produit. Contactez-nous pour organiser la livraison ou le retrait." },
      { q: "Un acompte est-il demandé ?", a: "Les modalités de paiement vous sont précisées par WhatsApp selon votre commande (œufs, poussins, reproducteurs ou formation)." },
    ],
  },
  {
    cat: "formations",
    title: "Formations",
    items: [
      { q: "Qui peut suivre vos formations ?", a: "Débutants comme aviculteurs confirmés souhaitant se spécialiser sur Goliath et Brahma." },
      { q: "Quelle est la durée et le contenu ?", a: "Modules pratiques : démarrage, nutrition Goliath, reproduction Brahma, biosécurité, gestion économique. Durée communiquée à l'inscription." },
      { q: "Quel est le coût d'une formation ?", a: "Le tarif dépend du module choisi. Demandez un devis via le formulaire de commande (produit : Formation) ou WhatsApp." },
      { q: "Proposez-vous un suivi après formation ?", a: "Oui, conseils et accompagnement par WhatsApp pour vous aider à appliquer ce que vous avez appris sur site." },
    ],
  },
];

function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function FaqPage() {
  const [filter, setFilter] = useState<Cat>("all");
  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState<string | null>("elevage-0");

  const groups = useMemo(() => {
    const q = normalize(query.trim());
    return GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((it) => {
        if (filter !== "all" && filter !== g.cat) return false;
        if (!q) return true;
        return normalize(it.q + " " + it.a).includes(q);
      }),
    })).filter((g) => g.items.length > 0);
  }, [filter, query]);

  return (
    <Layout>
      <section className="page-hero" style={{ marginTop: 24 }}>
        <span className="eyebrow">FAQ</span>
        <h1>Questions fréquentes</h1>
        <p>Tout ce qu'il faut savoir sur l'élevage Goliath & Brahma, la biosécurité, nos délais de commande et nos formations.</p>
      </section>

      <section className="inner-page">
        <div className="container">
          <div style={{ maxWidth: 480, margin: "0 auto 24px" }}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une question…"
              style={{ width: "100%", padding: "12px 18px", borderRadius: 999, border: "1.5px solid rgba(48,130,37,0.25)", fontFamily: "inherit", fontSize: "0.95rem", outline: "none" }}
            />
          </div>

          <div className="faq-filters">
            {(["all", "elevage", "biosecurite", "commandes", "formations"] as Cat[]).map((c) => (
              <button
                key={c}
                type="button"
                className={"faq-filter" + (filter === c ? " active" : "")}
                onClick={() => setFilter(c)}
              >
                {c === "all" ? "Tous" : c === "biosecurite" ? "Biosécurité" : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          <div className="why-section">
            {groups.length === 0 && (
              <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Aucune question trouvée.</p>
            )}
            {groups.map((g) => (
              <div key={g.cat} className="faq-group" data-category={g.cat}>
                <h2>{g.title}</h2>
                <div className="accordion">
                  {g.items.map((it, i) => {
                    const key = `${g.cat}-${i}`;
                    const active = openKey === key;
                    return (
                      <div key={key} className={"accordion-item faq-item" + (active ? " active" : "")}>
                        <button
                          type="button"
                          className="accordion-trigger"
                          onClick={() => setOpenKey(active ? null : key)}
                        >
                          {it.q}<span className="icon">+</span>
                        </button>
                        <div className="accordion-panel">
                          <div className="accordion-panel-inner">
                            <p>{it.a}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="cta-banner">
            <h2>Une autre question ?</h2>
            <p>Écrivez-nous directement, nous répondons sous 24h.</p>
            <Link to="/contact" className="btn btn-outline" style={{ marginRight: 12 }}>Nous contacter</Link>
            <Link to="/commande" className="btn btn-lime">Passer commande</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
