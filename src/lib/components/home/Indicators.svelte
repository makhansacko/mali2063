<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { browser } from '$app/environment';
  import { locale, t } from '$lib/i18n';
  import { getIndicators } from '$lib/data/vision-i18n';
  import IndicatorCard from '$lib/components/indicators/IndicatorCard.svelte';

  export let showSectionHeader = true;
  export let showSahelia = true;

  $: localizedIndicators = getIndicators($locale);

  let saheliaLottieCanvas: HTMLCanvasElement | undefined;
  let saheliaDotLottie: { destroy: () => void } | undefined;

  function openChatWidget() {
    const toggle = document.querySelector('.chat-toggle') as HTMLElement | null;
    toggle?.click();
  }

  onMount(() => {
    let cancelled = false;

    void (async () => {
      if (!browser || !showSahelia) return;
      await tick();
      if (cancelled || !saheliaLottieCanvas) return;

      const [{ DotLottie }, wasmMod] = await Promise.all([
        import('@lottiefiles/dotlottie-web'),
        import('@lottiefiles/dotlottie-web/dotlottie-player.wasm?url')
      ]);
      if (cancelled || !saheliaLottieCanvas) return;

      DotLottie.setWasmUrl(wasmMod.default);
      saheliaDotLottie = new DotLottie({
        canvas: saheliaLottieCanvas,
        src: '/animations/ai.lottie',
        loop: true,
        autoplay: true,
        layout: { fit: 'contain', align: [0.5, 0.5] },
        backgroundColor: 'transparent',
        renderConfig: { autoResize: true }
      });
    })();

    return () => {
      cancelled = true;
      saheliaDotLottie?.destroy();
      saheliaDotLottie = undefined;
    };
  });

  onDestroy(() => {
    saheliaDotLottie?.destroy();
  });
</script>

<section class="indicators section" class:indicators--embedded={!showSectionHeader}>
  <div class="container">

    {#if showSectionHeader}
      <div class="section-header">
        <p class="label">{$t('indicators.label')}</p>
        <h3>{$t('indicators.title')}</h3>
        <p class="section-desc">
          {$t('indicators.desc')}
        </p>
      </div>
    {/if}

    <div class="indicators-grid">
      {#each localizedIndicators as indicator (indicator.id)}
        <IndicatorCard {indicator} />
      {/each}

      {#if showSahelia}
        <div class="sahelia-card">
          <div class="sahelia-icon">
            <canvas bind:this={saheliaLottieCanvas} class="sahelia-lottie" aria-label="SaheL'IA"></canvas>
          </div>
          <h3 class="sahelia-title">{$t('indicators.saheliaTitle')}</h3>
          <p class="sahelia-desc">
            {$t('indicators.saheliaDesc')}
          </p>
          <button type="button" class="sahelia-btn" on:click={openChatWidget}>
            {$t('indicators.saheliaBtn')}
          </button>
        </div>
      {/if}
    </div>

  </div>
</section>

<style>
  .indicators {
    background: white;
  }

  .indicators.indicators--embedded {
    padding-top: 3rem;
  }

  .indicators .section-header {
    margin-bottom: 2rem;
  }

  .indicators-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .sahelia-card {
    border: 1px solid rgba(48, 88, 140, 0.2);
    background: var(--color-night);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    text-align: center;
    gap: 1rem;
  }

  .sahelia-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    flex-shrink: 0;
  }

  .sahelia-lottie {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 4rem;
    max-height: 4rem;
  }

  .sahelia-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: white;
    line-height: 1.4;
    margin: 0;
  }

  .sahelia-desc {
    font-size: 0.75rem;
    color: white;
    line-height: 1.65;
    margin: 0;
  }

  .sahelia-btn {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-night);
    background: var(--color-sand);
    border: none;
    padding: 0.7rem 1.25rem;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 0.25rem;
  }

  .sahelia-btn:hover {
    background: white;
  }

  @media (max-width: 900px) {
    .indicators-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .indicators-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
