<script lang="ts">
    import { onMount } from 'svelte';
  
    export let titre: string;
    export let resume: string;
    export let auteur: string;
    export let auteurTitre: string = '';
    export let date: string;
    export let lecture: number;
    export let type: 'note' | 'decryptage';
    export let gradientColor: string = 'rgba(48, 88, 140, 0.3)';
  
    let showScroll = true;
  
    function formatDate(d: string) {
      return new Date(d).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  
    onMount(() => {
      const handleScroll = () => {
        showScroll = window.scrollY < 100;
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });
  </script>
  
  <!-- BOUTON RETOUR — fixe, haut gauche -->
  <a href="/analyses" class="back-btn">
    <span class="back-arrow">←</span>
    <span>Analyses</span>
  </a>
  
  <div class="article-hero">
    <div class="article-hero-bg" style="background: radial-gradient(ellipse at 20% 50%, {gradientColor} 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(78, 159, 191, 0.1) 0%, transparent 50%)"></div>
  
    <div class="container article-hero-content">
      <div class="article-hero-meta">
        <span class="article-type {type}">
          {type === 'note' ? "Note d'analyse" : 'Décryptage'}
        </span>
        <span class="article-hero-date">{formatDate(date)}</span>
        <span class="article-hero-read">{lecture} min de lecture</span>
      </div>
  
      <h1>{titre}</h1>
      <p class="article-hero-resume">{resume}</p>
  
      <div class="article-hero-author">
        <div class="author-info">
          <span class="author-name">{auteur}</span>
          {#if auteurTitre}
            <span class="author-title">{auteurTitre}</span>
          {/if}
        </div>
      </div>
    </div>
  
    {#if showScroll}
      <div class="scroll-indicator" class:hidden={!showScroll}>
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
        <span class="scroll-label">Défiler pour continuer</span>
      </div>
    {/if}
  </div>
  
  <style>
    /* --- BACK BUTTON --- */
    .back-btn {
      position: fixed;
      top: 5rem;
      left: 2rem;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      padding: 0.5rem 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(26, 46, 74, 0.6);
      backdrop-filter: blur(8px);
      transition: all 0.2s;
    }
  
    .back-btn:hover {
      color: white;
      border-color: rgba(255, 255, 255, 0.4);
      background: rgba(26, 46, 74, 0.85);
    }
  
    .back-arrow {
      font-size: 0.8rem;
    }
  
    /* --- HERO --- */
    .article-hero {
      position: relative;
      background: var(--color-night);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
    }
  
    .article-hero-bg {
      position: absolute;
      inset: 0;
    }
  
    .article-hero-content {
      position: relative;
      z-index: 1;
      padding-top: 8rem;
      padding-bottom: 6rem;
      max-width: 800px;
    }
  
    .article-hero-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
  
    .article-type {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 0.25rem 0.6rem;
    }
  
    .article-type.note {
      background: rgba(48, 88, 140, 0.3);
      color: #a8c4e8;
    }
  
    .article-type.decryptage {
      background: rgba(103, 148, 54, 0.3);
      color: #b8d98a;
    }
  
    .article-hero-date,
    .article-hero-read {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.45);
    }
  
    h1 {
      font-size: clamp(1.8rem, 4vw, 3rem);
      color: white;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      font-weight: 800;
    }
  
    .article-hero-resume {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.65);
      line-height: 1.7;
      margin-bottom: 2.5rem;
      max-width: 600px;
    }
  
    .article-hero-author {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  
    .author-info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
  
    .author-name {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: white;
    }
  
    .author-title {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.4);
      letter-spacing: 0.05em;
    }
  
    /* --- SCROLL INDICATOR --- */
    .scroll-indicator {
      position: absolute;
      bottom: 2.5rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
      opacity: 1;
      transition: opacity 0.4s ease;
    }
  
    .scroll-indicator.hidden {
      opacity: 0;
    }
  
    .scroll-mouse {
      width: 24px;
      height: 38px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      display: flex;
      justify-content: center;
      padding-top: 6px;
    }
  
    .scroll-wheel {
      width: 3px;
      height: 8px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 2px;
      animation: scrollWheel 1.6s ease-in-out infinite;
    }
  
    @keyframes scrollWheel {
      0% { transform: translateY(0); opacity: 1; }
      60% { transform: translateY(8px); opacity: 0; }
      61% { transform: translateY(0); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
  
    .scroll-label {
      font-family: var(--font-mono);
      font-size: 0.55rem;
      color: rgba(255, 255, 255, 0.35);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
  </style>