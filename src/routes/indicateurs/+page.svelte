<script lang="ts">
  import Indicators from '$lib/components/home/Indicators.svelte';
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>{$t('indicateursPage.metaTitle')}</title>
</svelte:head>

<div class="indicateurs-page">
  <div class="indicateurs-hero">
    <div class="container">
      <h1>{$t('indicateursPage.title')}</h1>
      <p class="indicateurs-desc">
        {$t('indicateursPage.desc')}
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
