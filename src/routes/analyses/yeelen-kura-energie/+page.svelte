<script lang="ts">
    import ArticleHero from '$lib/components/articles/ArticleHero.svelte';
  import Dice_2 from 'lucide-svelte/icons/dice-2';
  </script>
  
  <svelte:head>
    <title>YEELEN KURA : décrypter le pari énergétique du Mali — Sahel Analytics</title>
  </svelte:head>
  
  <article class="article-page">
  
    <ArticleHero
      titre="YEELEN KURA : décrypter le pari énergétique du Mali"
      auteur="Sahel Analytics"
      auteurTitre="Équipe de recherche"
      date="2026-03-01"
      lecture={8}
      type="decryptage"
      gradientColor="rgba(103, 148, 54, 0.3)"
    />
  
    <div class="container article-body">
      <div class="article-content">
        <p class="article-coming">Article en cours de rédaction.</p>
      </div>
    </div>
  
  </article>
  
  <style>
    .article-body {
      padding-top: 4rem;
      padding-bottom: 6rem;
    }
  
    .article-content {
      max-width: 680px;
      margin: 0 auto;
    }
  
    .article-coming {
      font-size: 1rem;
      color: var(--color-brown);
      font-style: italic;
      opacity: 0.6;
      text-align: center;
      padding: 4rem 0;
      border: 1px dashed rgba(115, 101, 85, 0.2);
    }
  </style>