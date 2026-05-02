<script lang="ts">
  import { articles } from '$lib/data/articles';

  const featured = articles.find(a => a.featured);
  const rest = articles.filter(a => !a.featured).slice(0, 2);

  const typeLabel = (type: string) => type === 'note' ? "Note d'analyse" : 'Décryptage';

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  }
</script>

<section class="analyses section">
  <div class="container">

    <div class="analyses-header">
      <div>
        <p class="label">Analyses & Intelligence</p>
        <h2>Analytics</h2>
        <p class="section-desc" style="text-align: left; max-width: 480px">
          Des analyses indépendantes sur les enjeux, les opportunités et les 
          défis que représente la Vision Mali Kura 2063 pour l'économie malienne.
        </p>
      </div>
      <a href="/analyses" class="btn btn-outline">
        Voir toutes les analyses
      </a>
    </div>

    <div class="analyses-grid">

      <!-- FEATURED -->
      {#if featured}
        <a href="/analyses/{featured.slug}" class="analysis-card analysis-featured">
          <div class="analysis-card-header">
            <div class="analysis-number-wrap">
              <span class="analysis-number">{String(featured.number).padStart(2, '0')}</span>
              {#if featured.projectRef}
                <img
                  src="/projects/Project{featured.projectRef}.svg"
                  alt={featured.titre}
                  class="analysis-icon"
                />
              {/if}
            </div>
          </div>
          <div class="analysis-meta">
            <span class="analysis-type {featured.type}">{typeLabel(featured.type)}</span>
            <span class="analysis-date">{formatDate(featured.date)}</span>
          </div>
          <h3 class="analysis-title">{featured.titre}</h3>
          <p class="analysis-excerpt">{featured.resume}</p>
          <div class="analysis-footer">
            <span class="analysis-author">{featured.auteur}</span>
            <span class="analysis-read">{featured.lecture} min</span>
          </div>
          <span class="analysis-link">Lire l'analyse →</span>
        </a>
      {/if}

      <!-- REST -->
      {#each rest as article}
        <a href="/analyses/{article.slug}" class="analysis-card">
          <div class="analysis-card-header">
            <div class="analysis-number-wrap">
              <span class="analysis-number">{String(article.number).padStart(2, '0')}</span>
              {#if article.projectRef}
                <img
                  src="/projects/Project{article.projectRef}.svg"
                  alt={article.titre}
                  class="analysis-icon"
                />
              {/if}
            </div>
          </div>
          <div class="analysis-meta">
            <span class="analysis-type {article.type}">{typeLabel(article.type)}</span>
            <span class="analysis-date">{formatDate(article.date)}</span>
          </div>
          <h3 class="analysis-title">{article.titre}</h3>
          <p class="analysis-excerpt">{article.resume}</p>
          <div class="analysis-footer">
            <span class="analysis-author">{article.auteur}</span>
            <span class="analysis-read">{article.lecture} min</span>
          </div>
          <span class="analysis-link">Lire l'analyse →</span>
        </a>
      {/each}

    </div>

  </div>
</section>

<style>
  .analyses {
    background: var(--color-sand-pale);
  }

  .analyses-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    gap: 2rem;
  }

  .analyses-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 1.25rem;
    align-items: start;
  }

  /* --- CARD --- */
  .analysis-card {
    background: white;
    padding: 1.75rem;
    border: 1px solid rgba(115, 101, 85, 0.12);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .analysis-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
  }

  .analysis-featured {
    border-left: 3px solid var(--color-blue-deep);
  }

  /* --- HEADER (number + icon) --- */
  .analysis-card-header {
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(115, 101, 85, 0.1);
  }

  .analysis-number-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .analysis-number {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-night);
    letter-spacing: 0.1em;
  }

  .analysis-icon {
    width: 25px;
    height: 25px;
    filter: brightness(0);
    opacity: 0.7;
  }

  /* --- META --- */
  .analysis-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .analysis-type {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
  }

  .analysis-type.note {
    background: rgba(48, 88, 140, 0.1);
    color: var(--color-blue-deep);
  }

  .analysis-type.decryptage {
    background: rgba(103, 148, 54, 0.1);
    color: var(--color-green);
  }

  .analysis-date {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--color-brown);
    opacity: 0.6;
  }

  /* --- CONTENT --- */
  .analysis-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-night);
    line-height: 1.4;
  }

  .analysis-featured .analysis-title {
    font-size: 1.2rem;
  }

  .analysis-excerpt {
    font-size: 0.85rem;
    color: var(--color-brown);
    line-height: 1.7;
    flex: 1;
  }

  /* --- FOOTER --- */
  .analysis-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(115, 101, 85, 0.1);
  }

  .analysis-author {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--color-brown);
    font-weight: 600;
  }

  .analysis-read {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--color-brown);
    opacity: 0.5;
  }

  .analysis-link {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--color-blue-deep);
    margin-top: 0.25rem;
    transition: color 0.2s;
  }

  .analysis-card:hover .analysis-link {
    color: var(--color-blue-mid);
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 900px) {
    .analyses-grid {
      grid-template-columns: 1fr 1fr;
    }

    .analysis-featured {
      grid-column: span 2;
    }

    .analyses-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 600px) {
    .analyses-grid {
      grid-template-columns: 1fr;
    }

    .analysis-featured {
      grid-column: span 1;
    }
  }
</style>