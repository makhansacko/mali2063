<svelte:head>
  <title>À Propos — mali2063.org</title>
</svelte:head>

<div class="apropos-page">

  <!-- HERO -->
  <div class="apropos-hero">
    <div class="container">
      <p class="label">À Propos</p>
      <h1>Une plateforme d'intelligence et de dialogue sur la Vision</h1>
    </div>
  </div>

  <!-- SECTION 1 — LA PLATEFORME -->
  <section class="apropos-section section">
    <div class="container apropos-grid">
      <div class="apropos-label-col">
        <p class="section-marker">01</p>
        <p class="section-marker-label">La plateforme</p>
      </div>
      <div class="apropos-content-col">
        <h2>Pourquoi mali2063.org</h2>
        <p>
          La Vision Mali Kura 2063 est un document de 150 pages publié par le 
          Ministère de l'Économie et des Finances en décembre 2024. Ambitieux, 
          structuré, et porteur d'une transformation profonde — mais difficile 
          d'accès pour la majorité des citoyens, entrepreneurs et acteurs de la 
          société civile malienne.
        </p>
        <p>
          mali2063.org est née de ce constat. La plateforme rend la Vision 
          lisible, traçable et analysable — en la décryptant à travers un cadre 
          de politique d'innovation appliqué au contexte malien.
        </p>
        <p>
          La plateforme est indépendante. Elle n'est affiliée à aucun parti 
          politique, aucune institution gouvernementale, aucun bailleur de fonds. 
          Son seul engagement est la rigueur analytique et l'intérêt général.
        </p>
        <div class="apropos-tags">
          <span class="tag">Indépendante</span>
          <span class="tag">Open source</span>
          <span class="tag">GPL v3</span>
          <span class="tag">Non-partisane</span>
        </div>
        <a
          href="https://github.com/makhansacko/mali2063"
          target="_blank"
          rel="noopener noreferrer"
          class="apropos-link"
        >
          Voir le code source sur GitHub →
        </a>
      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- SECTION 2 — MAKHAN SACKO -->
  <section class="apropos-section section">
    <div class="container apropos-grid">
      <div class="apropos-label-col">
        <p class="section-marker">02</p>
        <p class="section-marker-label">Le fondateur</p>
      </div>
      <div class="apropos-content-col founder-col">
        <div class="founder-text">
          <h2>Makhan Sacko</h2>
          <p class="founder-title">
            Fondateur, Sahel Analytics · MPP Princeton University 2026
          </p>
          <p>
            Makhan Sacko est spécialiste des politiques de développement et des 
            données au Sahel. Fondateur de Sahel Analytics au Mali en 2018, il a 
            travaillé avec le PNUD avant de rejoindre le programme de Master en 
            Politiques Publiques de Princeton University (promotion 2026).
          </p>
          <p>
            Ses travaux portent sur la politique d'innovation, la transformation 
            économique et l'utilisation des données pour le développement en 
            Afrique de l'Ouest. mali2063.org est l'application directe de ce 
            cadre analytique au contexte malien.
          </p>
        </div>
        <div class="founder-image-wrap">
          <img
            src="/makhan.webp"
            alt="Makhan Sacko — Fondateur, Sahel Analytics"
            class="founder-image"
          />
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- SECTION 3 — SAHEL ANALYTICS -->
  <section class="apropos-section section">
    <div class="container apropos-grid">
      <div class="apropos-label-col">
        <p class="section-marker">03</p>
        <p class="section-marker-label">Sahel Analytics</p>
      </div>
      <div class="apropos-content-col">
        <div class="sa-logo-wrap">
            <img src="/sahel-analytics-logo.png" alt="Sahel Analytics" class="sa-logo" />
          </div>
          <h2>L'entreprise derrière la plateforme</h2>
        <p>
          Sahel Analytics est une entreprise de données et d'intelligence 
          stratégique basée au Mali, fondée en 2018. Elle accompagne les 
          entreprises, institutions publiques et organisations de la société 
          civile dans la collecte, l'analyse et la visualisation de données.
        </p>
        <p>
          mali2063.org est le produit phare de Sahel Analytics — une 
          démonstration concrète de son approche : rendre l'information complexe 
          accessible, lisible et utile pour les décideurs et les citoyens.
        </p>

        <div class="services-grid">
          <div class="service-item">
            <span class="service-n">01</span>
            <span class="service-l">Collecte & Sourcing de données</span>
          </div>
          <div class="service-item">
            <span class="service-n">02</span>
            <span class="service-l">Analyse & Modélisation</span>
          </div>
          <div class="service-item">
            <span class="service-n">03</span>
            <span class="service-l">Visualisation & Data Apps</span>
          </div>
          <div class="service-item">
            <span class="service-n">04</span>
            <span class="service-l">Solutions digitales</span>
          </div>
        </div>
        <a
          href="https://sahelanalytics.com"
          target="_blank"
          rel="noopener noreferrer"
          class="apropos-link"
        >
          Visiter sahelanalytics.com →
        </a>
      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- SECTION 4 — CONTACT -->
  <section class="apropos-section section">
    <div class="container apropos-grid">
      <div class="apropos-label-col">
        <p class="section-marker">04</p>
        <p class="section-marker-label">Contact</p>
      </div>
      <div class="apropos-content-col">
        <h2>Nous contacter</h2>
        <p>
          Pour toute question sur la plateforme, demande de collaboration, 
          ou intérêt pour les services de Sahel Analytics :
        </p>
        <a href="mailto:info@sahelanalytics.com" class="contact-email">
          info@sahelanalytics.com
        </a>
        <p class="contact-note">
          Pour les questions relatives au contenu officiel de la Vision Mali 
          Kura 2063, nous vous invitons à consulter directement le Ministère 
          de l'Économie et des Finances du Mali.
        </p>
      </div>
    </div>
  </section>

</div>

<style>
  /* --- HERO --- */
  .apropos-hero {
    background: var(--color-night);
    padding: 6rem 0 4rem;
  }

  .apropos-hero h1 {
    color: white;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.2;
    margin-top: 0.75rem;
  }

  .apropos-hero .label {
    color: var(--color-sand);
    opacity: 1;
  }

  /* --- SECTIONS --- */
  .apropos-page {
    background: white;
  }

  .apropos-section {
    padding: 4rem 0;
  }

  .apropos-grid {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 4rem;
    align-items: start;
  }

  /* --- LABEL COL --- */
  .apropos-label-col {
    padding-top: 0.4rem;
  }

  .section-marker {
    font-family: var(--font-mono);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-blue-deep);
    opacity: 0.2;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .section-marker-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-brown);
    opacity: 0.6;
  }

  /* --- CONTENT COL --- */
  .apropos-content-col h2 {
    font-size: 1.6rem;
    color: var(--color-night);
    margin-bottom: 1.5rem;
    line-height: 1.25;
  }

  .apropos-content-col p {
    font-size: 0.95rem;
    color: #444;
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  /* --- TAGS --- */
  .apropos-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1.5rem 0;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-blue-deep);
    background: rgba(48, 88, 140, 0.08);
    padding: 0.3rem 0.75rem;
  }

  /* --- LINKS --- */
  .apropos-link {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--color-blue-deep);
    text-decoration: none;
    margin-top: 1rem;
    transition: color 0.2s;
  }

  .apropos-link:hover {
    color: var(--color-night);
  }

  /* --- FOUNDER --- */
  .founder-col {
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 3rem;
    align-items: start;
  }

  .founder-title {
    font-family: var(--font-mono);
    font-size: 0.7rem !important;
    color: var(--color-brown) !important;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 1.25rem !important;
  }

  .founder-image-wrap {
    flex-shrink: 0;
  }

  .founder-image {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    object-position: top;
    display: block;
    filter: grayscale(15%);
  }

  .sa-logo-wrap {
  margin-bottom: 1.5rem;
}

.sa-logo {
  height: 50px;
  width: auto;
  display: block;
}

  /* --- SERVICES --- */
  .services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .service-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    border: 1px solid rgba(115, 101, 85, 0.12);
  }

  .service-n {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--color-blue-deep);
    opacity: 0.4;
    flex-shrink: 0;
    padding-top: 0.1rem;
  }

  .service-l {
    font-size: 0.85rem;
    color: var(--color-night);
    line-height: 1.4;
    font-weight: 500;
  }

  /* --- CONTACT --- */
  .contact-email {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-blue-deep);
    text-decoration: none;
    margin: 1rem 0 1.5rem;
    transition: color 0.2s;
  }

  .contact-email:hover {
    color: var(--color-night);
  }

  .contact-note {
    font-size: 0.8rem !important;
    color: var(--color-brown) !important;
    opacity: 0.6;
    font-style: italic;
    border-left: 2px solid rgba(115, 101, 85, 0.2);
    padding-left: 1rem;
  }

  /* --- DIVIDER --- */
  .section-divider {
    border: none;
    border-top: 1px solid rgba(115, 101, 85, 0.1);
    margin: 0 2rem;
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 768px) {
    .apropos-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .apropos-label-col {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .section-marker {
      font-size: 1.2rem;
      margin-bottom: 0;
    }

    .founder-col {
      grid-template-columns: 1fr;
    }

    .founder-image-wrap {
      max-width: 200px;
    }

    .services-grid {
      grid-template-columns: 1fr;
    }
  }
</style>