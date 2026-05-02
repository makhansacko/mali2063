<script lang="ts">
    import { articles } from '$lib/data/articles';
  
    const featured = articles.find(a => a.featured);
    const rest = articles.filter(a => !a.featured);
  
    function formatDate(date: string) {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  </script>
  
  <svelte:head>
    <title>Analyses — mali2063.org</title>
  </svelte:head>
  
  <div class="analyses-page">
  
    <!-- HERO -->
    <div class="analyses-hero">
      <div class="container">
        <p class="label">Intelligence & Analyse</p>
        <h1>Analytics</h1>
        <p class="analyses-desc">
          Notes d'analyse et décryptages produits par Sahel Analytics — 
          appliquant un cadre de politique d'innovation aux objectifs de la Vision Mali Kura 2063.
        </p>
      </div>
    </div>
  
    <div class="container analyses-body">
  
      <!-- FEATURED -->
      {#if featured}
        <a href="/analyses/{featured.slug}" class="featured-card">
          <div class="featured-image">
            {#if featured.image}
              <img src={featured.image} alt={featured.titre} />
            {:else}
              <div class="featured-image-placeholder" style="background: var(--color-blue-deep)"></div>
            {/if}
          </div>
          <div class="featured-content">
            <div class="featured-card-header">
              <div class="article-number-wrap">
                <span class="article-number">{String(featured.number).padStart(2, '0')}</span>
                {#if featured.projectRef}
                  <img
                    src="/projects/Project{featured.projectRef}.svg"
                    alt={featured.titre}
                    class="article-icon"
                  />
                {/if}
              </div>
            </div>
            <div class="featured-meta">
              <span class="article-type {featured.type}">{featured.type === 'note' ? "Note d'analyse" : 'Décryptage'}</span>
              <span class="article-date">{formatDate(featured.date)}</span>
              <span class="article-read">{featured.lecture} min de lecture</span>
            </div>
            <h2 class="featured-titre">{featured.titre}</h2>
            <p class="featured-resume">{featured.resume}</p>
            <div class="featured-author">
              <span>{featured.auteur}</span>
            </div>
            <span class="featured-cta">Lire l'analyse →</span>
          </div>
        </a>
      {/if}
  
      <!-- GRID -->
      {#if rest.length > 0}
        <div class="articles-section">
          <h3 class="articles-section-title">Toutes les analyses</h3>
          <div class="articles-grid">
            {#each rest as article}
              <a href="/analyses/{article.slug}" class="article-card">
                <div class="article-image">
                  {#if article.image}
                    <img src={article.image} alt={article.titre} />
                  {:else}
                    <div class="article-image-placeholder" style="background: var(--color-blue-mid)"></div>
                  {/if}
                </div>
                <div class="article-content">
                  <div class="article-card-header">
                    <div class="article-number-wrap">
                      <span class="article-number">{String(article.number).padStart(2, '0')}</span>
                      {#if article.projectRef}
                        <img
                          src="/projects/Project{article.projectRef}.svg"
                          alt={article.titre}
                          class="article-icon"
                        />
                      {/if}
                    </div>
                  </div>
                  <div class="article-meta">
                    <span class="article-type {article.type}">{article.type === 'note' ? "Note d'analyse" : 'Décryptage'}</span>
                    <span class="article-read">{article.lecture} min</span>
                  </div>
                  <h3 class="article-titre">{article.titre}</h3>
                  <p class="article-resume">{article.resume}</p>
                  <div class="article-footer">
                    <span class="article-date">{formatDate(article.date)}</span>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/if}
  
    </div>
  </div>
  
  <style>
    /* --- HERO --- */
    .analyses-hero {
      background: var(--color-night);
      padding: 5rem 0 3rem;
      border-bottom: 1px solid rgba(115, 101, 85, 0.15);
    }
  
    .analyses-hero h1 {
      color: white;
      font-size: 3rem;
      margin: 0.5rem 0 1rem;
    }
  
    .analyses-hero .label {
      color: var(--color-sand);
      opacity: 1;
    }
  
    .analyses-desc {
      color: rgba(255, 255, 255, 0.65);
      font-size: 1rem;
      line-height: 1.7;
      max-width: 600px;
    }
  
    /* --- BODY --- */
    .analyses-body {
      padding-top: 3rem;
      padding-bottom: 5rem;
    }
  
    /* --- FEATURED --- */
    .featured-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      text-decoration: none;
      border: 1px solid rgba(115, 101, 85, 0.15);
      overflow: hidden;
      margin-bottom: 4rem;
      transition: box-shadow 0.2s;
    }
  
    .featured-card:hover {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    }
  
    .featured-image {
      aspect-ratio: 4/3;
      overflow: hidden;
    }
  
    .featured-image img,
    .featured-image-placeholder {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
  
    .featured-card:hover .featured-image img {
      transform: scale(1.03);
    }
  
  .featured-content {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    background: white;
  }

  .featured-card-header,
  .article-card-header {
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(115, 101, 85, 0.1);
  }

  .article-number-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .article-number {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-night);
    letter-spacing: 0.1em;
  }

  .article-icon {
    width: 25px;
    height: 25px;
    filter: brightness(0);
    opacity: 0.7;
  }

  .featured-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
    }
  
    .featured-titre {
      font-size: 1.5rem;
      color: var(--color-night);
      line-height: 1.3;
      margin-bottom: 1rem;
    }
  
    .featured-resume {
      color: #444;
      font-size: 0.9rem;
      line-height: 1.7;
      flex: 1;
      margin-bottom: 1.5rem;
    }
  
    .featured-author {
      font-size: 0.8rem;
      color: var(--color-brown);
      font-weight: 600;
      margin-bottom: 1.5rem;
      font-family: var(--font-mono);
    }
  
    .featured-cta {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--color-blue-deep);
      text-transform: uppercase;
    }
  
    /* --- ARTICLE TYPE BADGE --- */
    .article-type {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 0.25rem 0.6rem;
    }
  
    .article-type.note {
      background: rgba(48, 88, 140, 0.1);
      color: var(--color-blue-deep);
    }
  
    .article-type.decryptage {
      background: rgba(103, 148, 54, 0.1);
      color: var(--color-green);
    }
  
    .article-date,
    .article-read {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-brown);
      opacity: 0.7;
    }
  
    /* --- GRID --- */
    .articles-section-title {
      font-size: 1rem;
      color: var(--color-night);
      margin-bottom: 1.5rem;
      font-family: var(--font-mono);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      opacity: 0.5;
    }
  
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  
    .article-card {
      text-decoration: none;
      border: 1px solid rgba(115, 101, 85, 0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: white;
      transition: box-shadow 0.2s, transform 0.2s;
    }
  
    .article-card:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
      transform: translateY(-2px);
    }
  
    .article-image {
      aspect-ratio: 16/9;
      overflow: hidden;
    }
  
    .article-image img,
    .article-image-placeholder {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
  
    .article-card:hover .article-image img {
      transform: scale(1.03);
    }
  
    .article-content {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  
    .article-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }
  
    .article-titre {
      font-size: 1rem;
      color: var(--color-night);
      line-height: 1.4;
      margin-bottom: 0.75rem;
    }
  
    .article-resume {
      font-size: 0.82rem;
      color: #555;
      line-height: 1.65;
      flex: 1;
      margin-bottom: 1rem;
    }
  
    .article-footer {
      border-top: 1px solid rgba(115, 101, 85, 0.1);
      padding-top: 0.75rem;
    }
  
    /* --- RESPONSIVE --- */
    @media (max-width: 900px) {
      .featured-card {
        grid-template-columns: 1fr;
      }
  
      .articles-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  
    @media (max-width: 600px) {
      .analyses-hero h1 {
        font-size: 2rem;
      }
  
      .articles-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>