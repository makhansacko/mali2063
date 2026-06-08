<script lang="ts">
  import ArticleHero from '$lib/components/articles/ArticleHero.svelte';
</script>

<svelte:head>
  <title>FARAFINNA JIGINƐ : les agropoles comme levier de souveraineté alimentaire — Sahel Analytics</title>
</svelte:head>

<article class="article-page">

  <ArticleHero
    titre="FARAFINNA JIGINƐ : les agropoles comme levier de souveraineté alimentaire"
    auteur="Sahel Analytics"
    auteurTitre="Équipe de recherche"
    date="2026-02-15"
    lecture={10}
    type="decryptage"
    gradientColor="rgba(217, 162, 115, 0.3)"
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