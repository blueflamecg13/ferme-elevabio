import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useRef, useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ElevaBio" },
      { name: "description", content: "Contactez ElevaBio à Pointe-Noire : téléphone, WhatsApp et formulaire." },
    ],
  }),
  component: ContactPage,
});

const WA = "242068172503";

function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  const mountedAt = useRef(Date.now());

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if ((fd.get("website") as string)?.length) return;
    if (Date.now() - mountedAt.current < 3000) return;

    const nom = String(fd.get("nom") || "").trim();
    const tel = String(fd.get("telephone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const produit = String(fd.get("produit") || "");
    const message = String(fd.get("message") || "").trim();
    if (!nom || !tel || !produit || !message) return;

    let text = "Bonjour ElevaBio,\n\n";
    text += "• Nom : " + nom + "\n";
    text += "• Téléphone : " + tel + "\n";
    if (email) text += "• Email : " + email + "\n";
    text += "• Objet : " + produit + "\n";
    text += "• Message : " + message + "\n";

    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    setSuccess(true);
    formRef.current?.reset();
  };

  return (
    <Layout>
      <section className="page-hero" style={{ marginTop: 24 }}>
        <span className="eyebrow">Contact</span>
        <h1>Parlons de votre projet</h1>
        <p>Notre équipe est à votre disposition pour répondre à toutes vos questions.</p>
      </section>

      <section className="inner-page contact-section">
        <div className="container">
          <div className="contact-split">
            <div className="contact-split__info">
              <p className="contact-split__eyebrow">Nous sommes là pour vous aider</p>
              <h2 className="contact-split__title">Discutons de vos besoins en élevage avicole</h2>
              <p className="contact-split__desc">
                Œufs fertiles, poussins, reproducteurs ou formation — décrivez votre projet et nous vous répondons rapidement par téléphone ou WhatsApp.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
                  </div>
                  <div>
                    <strong>E-mail</strong>
                    <a href="mailto:contact@elevabio.cg">contact@elevabio.cg</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <strong>Téléphone</strong>
                    <a href="tel:+242068172503">+242 06 817 25 03</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <strong>Adresse</strong>
                    <span>Ngouolondélé Japon, Pointe-Noire — Congo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              {success && (
                <div className="contact-form-success visible" role="status">
                  Merci ! Votre message a été préparé sur WhatsApp.
                </div>
              )}

              <form ref={formRef} id="contact-form" className="form-card" style={{ maxWidth: "none", margin: 0, padding: 0, background: "transparent" }} noValidate onSubmit={onSubmit}>
                <div className="form-honeypot" aria-hidden="true">
                  <label htmlFor="website">Site web (laisser vide)</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="form-group">
                  <label htmlFor="nom">Nom complet *</label>
                  <input type="text" id="nom" name="nom" required placeholder="Votre nom" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" name="email" placeholder="vous@exemple.com" />
                </div>

                <div className="form-group">
                  <label htmlFor="telephone">Téléphone *</label>
                  <input type="tel" id="telephone" name="telephone" required placeholder="+242 06 XXX XX XX" />
                </div>

                <div className="form-group">
                  <label htmlFor="produit">Objet de votre demande *</label>
                  <select id="produit" name="produit" required defaultValue="">
                    <option value="">Choisir un sujet</option>
                    <option value="Œufs fertiles">Œufs fertiles</option>
                    <option value="Poussins">Poussins</option>
                    <option value="Reproducteurs">Reproducteurs</option>
                    <option value="Formation">Formation</option>
                    <option value="Information générale">Information générale</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" required placeholder="Décrivez votre projet, vos questions ou la quantité souhaitée…"></textarea>
                </div>

                <button type="submit" className="btn-submit-pill">
                  <span className="btn-submit-pill-icon" aria-hidden="true">→</span>
                  Envoyer le message
                </button>
                <p className="form-note" style={{ textAlign: "left", marginTop: 16 }}>
                  Vous pouvez aussi nous joindre directement sur <a href="https://wa.me/242068172503" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                </p>
              </form>
            </div>
          </div>

          <div className="cta-banner" style={{ marginTop: 48 }}>
            <h2>Prêt à commander ?</h2>
            <p>Œufs fertiles, poussins, reproducteurs ou formation — on vous répond rapidement.</p>
            <Link to="/commande" className="btn btn-lime">Passer commande</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
