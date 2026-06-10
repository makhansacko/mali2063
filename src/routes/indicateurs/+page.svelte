<script lang="ts">
  import Indicators from '$lib/components/home/Indicators.svelte';
</script>

<svelte:head>
  <title>Indicateurs — mali2063.org</title>
</svelte:head>

<div class="indicateurs-page">
  <div class="indicateurs-hero">
    <div class="container">
      <h1>Indicateurs clés</h1>
      <p class="indicateurs-desc">
        Les engagements de la Vision Mali 2063 sont mesurables.
          Trajectoires officielles - baseline, cible 2033 et cible 2063 de quelques indicateurs clés.
      </p>
    </div>
  </div>

  <Indicators showSectionHeader={false} />
</div>

<style>
  .indicateurs-hero {
    background: var(--color-night);
    padding: 5rem 0 3rem;
    border-bottom: 1px solid rgba(115, 101, 85, 0.15);
  }

  .indicateurs-hero h1 {
    color: white;
    font-size: 3rem;
    margin: 0.5rem 0 1rem;
  }

  .indicateurs-hero .label {
    color: var(--color-sand);
    opacity: 1;
  }

  .indicateurs-desc {
    color: rgba(255, 255, 255, 0.65);
    font-size: 1rem;
    line-height: 1.7;
    max-width: 600px;
    margin: 0;
  }

  @media (max-width: 600px) {
    .indicateurs-hero h1 {
      font-size: 2rem;
    }
  }
</style>
