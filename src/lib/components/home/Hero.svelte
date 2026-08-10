<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { t } from '$lib/i18n';

  gsap.registerPlugin(ScrollTrigger);
  const heroTitle = 'MALI KURA NƐTAASIRA KA BƐN SAN 2063 MA';
  const heroTitleWords = heroTitle.split(' ').map((word, wordIndex, allWords) => {
    const letters = [...word];
    const previousChars = allWords
      .slice(0, wordIndex)
      .reduce((sum, prevWord) => sum + prevWord.length + 1, 0);
    return { letters, previousChars };
  });

  function scrollToIntro(e: MouseEvent) {
    e.preventDefault();
    const el = document.getElementById('intro');
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  onMount(() => {
    gsap.to('.hero-video', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });
</script>

<section class="hero" id="hero">

  <!-- BACKGROUND VIDEO -->
  <div class="hero-video-wrap">
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
      poster="/hero-poster.webp"
    >
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  </div>

  <!-- OVERLAY -->
  <div class="hero-overlay"></div>

  <h1 class="hero-title" aria-label={heroTitle}>
    {#each heroTitleWords as word, wordIndex}
      <span class="hero-title-word" aria-hidden="true">
        {#each word.letters as letter, letterIndex}
          <span
            class="hero-title-letter"
            style={`animation-delay: ${(word.previousChars + letterIndex) * 0.05}s`}
          >
            {letter}
          </span>
        {/each}
      </span>
      {#if wordIndex < heroTitleWords.length - 1}
        <span class="hero-title-space" aria-hidden="true">&nbsp;</span>
      {/if}
    {/each}
  </h1>

  <p class="hero-subtitle">{$t('hero.subtitle')}</p>


  <!-- SCROLL INDICATOR -->
  <a href="#intro" class="scroll-indicator" aria-label={$t('hero.scroll')} on:click={scrollToIntro}>
    <svg class="scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M19 12l-7 7-7-7"/>
    </svg>
  </a>

</section>

<style>
  .hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* --- VIDEO --- */
  .hero-video-wrap {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* --- OVERLAY --- */
  .hero-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      135deg,
      rgba(26, 46, 74, 0.82) 0%,
      rgba(26, 46, 74, 0.65) 50%,
      rgba(26, 46, 74, 0.40) 100%
    );
  }

  .hero-title {
    position: absolute;
    top: clamp(5.5rem, 12vh, 8.5rem);
    left: clamp(1rem, 4vw, 3rem);
    z-index: 2;
    margin: 0;
    padding: 0;
    max-width: 22ch;
    color: #fff;
    text-align: left;
    line-height: 1.16;
    font-size: clamp(1.35rem, 2.8vw, 2.6rem);
    font-weight: 600;
    letter-spacing: 0.01em;
    font-family: inherit;
    text-wrap: balance;
  }

  .hero-title-word {
    display: inline-block;
    white-space: nowrap;
  }

  .hero-title-letter {
    display: inline-block;
    opacity: 0;
    transform: translateX(-12px);
    animation: revealLetter 0.5s ease forwards;
  }

  .hero-title-space {
    display: inline-block;
    width: 0.35em;
  }

  .hero-subtitle {
    position: absolute;
    top: clamp(12rem, 27vh, 16rem);
    left: clamp(1rem, 4vw, 3rem);
    z-index: 2;
    margin: 0;
    max-width: 34ch;
    color: rgba(227, 230, 236, 0.86);
    font-size: clamp(0.95rem, 1.4vw, 1.2rem);
    line-height: 1.4;
    font-weight: 400;
    font-family: inherit;
    opacity: 0;
    transform: translateY(12px) scale(0.95);
    animation: subtitleEntrance 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 2s forwards;
  }

  /* --- SCROLL INDICATOR --- */
  .scroll-indicator {
    position: absolute;
    bottom: 6rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    color:white;
    animation: bounce 2s ease-in-out infinite;
    transition: color 0.2s;
  }

  .scroll-indicator:hover {
    color: #C4885A;
  }

  .scroll-arrow {
    width: 24px;
    height: 24px;
  }

  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(6px); }
  }

  @keyframes revealLetter {
    from {
      opacity: 0;
      transform: translateX(-12px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes subtitleEntrance {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>