<script lang="ts">
  import { t } from '$lib/i18n';
  import { interpolate } from '$lib/i18n/messages';

  $: phases = [
    {
      period: '2024–2033',
      name: $t('intro.phase1.name'),
      desc: $t('intro.phase1.desc'),
      color: '#4a9e72'
    },
    {
      period: '2034–2043',
      name: $t('intro.phase2.name'),
      desc: $t('intro.phase2.desc'),
      color: '#91af70'
    },
    {
      period: '2044–2053',
      name: $t('intro.phase3.name'),
      desc: $t('intro.phase3.desc'),
      color: '#d8c06f'
    },
    {
      period: '2054–2063',
      name: $t('intro.phase4.name'),
      desc: $t('intro.phase4.desc'),
      color: '#c45450'
    }
  ];

  let activePhase = 0;

  function setPhase(i: number) {
    activePhase = i;
  }
</script>

<section class="intro section" id="intro">
  <div class="container intro-inner">

    <!-- LEFT — Vision Mali 2063 -->
    <div class="intro-col">
      <p class="label">{$t('intro.referenceLabel')}</p>
      <h2>{$t('intro.visionTitle')}</h2>
      <div class="divider"></div>

      <div class="intro-col-inner">
        <!-- Cover image -->
        <a
          class="intro-cover"
          href="https://finances.ml/sites/default/files/2025-05/VISION-MALI-2063.pdf"
          target="_blank"
          rel="noopener noreferrer"
          referrerpolicy="no-referrer"
        >
          <img
            src="/visionCover.webp"
            alt={$t('intro.visionCoverAlt')}
            class="intro-cover-img"
            draggable="false"
          />
        </a>

        <!-- Text -->
        <div class="intro-col-text">
          <p>
            {$t('intro.visionParagraph')}
          </p>
        </div>
      </div>

      <!-- PHASES CYCLE -->
      <div class="phases-cycle">
        <p class="phases-label">{$t('intro.phasesLabel')}</p>

        <div class="phases-arrow">
          <div class="phases-arrow-stack">
            <svg
              class="phases-arrow-svg"
              viewBox="0 0 240 10"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="intro-phases-mali-gradient"
                  x1="0"
                  y1="0"
                  x2="240"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stop-color="#4a9e72" />
                  <stop offset="44%" stop-color="#d8c06f" />
                  <stop offset="100%" stop-color="#c45450" />
                </linearGradient>
              </defs>
            <line
              x1="1"
              y1="5"
              x2="204"
              y2="5"
              stroke="url(#intro-phases-mali-gradient)"
              stroke-width="2"
              stroke-linecap="round"
            />
            <!-- Pointe à droite (sens du temps) : sommet à x=228, pas à gauche -->
            <path
              d="M 206 1.35 L 228 5 L 206 8.65"
              stroke="url(#intro-phases-mali-gradient)"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            </svg>
            <!-- Halo CSS (SMIL sur linearGradient est peu fiable dans les navigateurs) -->
            <div class="phases-arrow-shimmer" aria-hidden="true"></div>
          </div>
        </div>

        <div class="phases-tabs">
          {#each phases as phase, i}
            <button
              class="phase-tab"
              class:active={i === activePhase}
              style={i === activePhase ? `border-bottom-color: ${phase.color}; color: ${phase.color}` : ''}
              on:click={() => setPhase(i)}
            >
              {phase.period}
            </button>
          {/each}
        </div>

        {#each phases as phase, i}
          {#if i === activePhase}
            <div class="phase-card" style="border-left-color: {phase.color}">
              <div class="phase-card-header">
                <span class="phase-number">0{i + 1}</span>
                <h3 class="phase-name" style="color: {phase.color}">{phase.name}</h3>
              </div>
              <p class="phase-desc">{phase.desc}</p>
            </div>
          {/if}
        {/each}

        <div class="phase-dots">
          {#each phases as _, i}
            <button
              class="phase-dot"
              class:active={i === activePhase}
              style={i === activePhase ? `background: ${phases[i].color}` : ''}
              on:click={() => setPhase(i)}
              aria-label={interpolate($t('intro.phaseAria'), { n: i + 1 })}
            ></button>
          {/each}
        </div>
      </div>
    </div>

    <!-- DIVIDER -->
    <div class="intro-divider"></div>

    <!-- RIGHT — SNEDD 2024-2033 -->
    <div class="intro-col">
      <p class="label">{$t('intro.sneddLabel')}</p>
      <h2>{$t('intro.sneddTitle')}</h2>
      <div class="divider"></div>
      <p>
        {$t('intro.sneddP1')}
      </p>
      <p style="margin-top: 1rem">
        {$t('intro.sneddP2')}
      </p>

      <div class="snedd-numbers">
        <div class="snedd-number">
          <span class="snedd-n">5</span>
          <span class="snedd-l">{$t('intro.sneddAxes')}</span>
        </div>
        <div class="snedd-number">
          <span class="snedd-n">13</span>
          <span class="snedd-l">{$t('intro.sneddGlobal')}</span>
        </div>
        <div class="snedd-number">
          <span class="snedd-n">38</span>
          <span class="snedd-l">{$t('intro.sneddSpecific')}</span>
        </div>
      </div>

      <p style="margin-top: 1.5rem; font-size: 0.85rem; color: var(--color-blue-deep); font-weight: 600">
        {$t('intro.sneddHint')}
      </p>
    </div>

  </div>
</section>

<style>
  .intro {
    background: white;
    border-bottom: 1px solid rgba(115, 101, 85, 0.1);
  }

  .intro-inner {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 0;
    align-items: start;
  }

  .intro-col {
    padding: 0 3rem;
  }

  .intro-col:first-child {
    padding-left: 0;
  }

  .intro-col:last-child {
    padding-right: 0;
  }

  .intro-col h2 {
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    line-height: 1.25;
    color: var(--color-night);
  }

  .intro-col p {
    color: black;
    font-size: var(--text-base);
    line-height: 1.75;
  }

  .intro-col-inner {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 1.25rem;
    align-items: start;
  }

  .intro-cover {
    border: 1px solid rgba(115, 101, 85, 0.15);
    overflow: hidden;
    flex-shrink: 0;
    display: block;
    line-height: 0;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .intro-cover:focus-visible {
    outline: 2px solid var(--color-blue-deep);
    outline-offset: 2px;
  }

  .intro-cover-img {
    width: 100%;
    display: block;
    transition: transform 0.4s ease;
  }

  .intro-cover:hover .intro-cover-img {
    transform: scale(1.02);
  }

  /* --- VERTICAL DIVIDER --- */
  .intro-divider {
    width: 1px;
    background: rgba(115, 101, 85, 0.15);
    align-self: stretch;
    margin: 0;
  }

  /* --- PHASES CYCLE --- */
  .phases-cycle {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(115, 101, 85, 0.12);
  }

  /* --- PHASES ARROW : trait + chevron SVG (plat, pas de “tube”) --- */
  .phases-arrow {
    margin-bottom: 0.65rem;
    width: 100%;
  }

  .phases-arrow-stack {
    position: relative;
    width: 100%;
  }

  .phases-arrow-svg {
    display: block;
    width: 100%;
    height: auto;
    max-height: 18px;
    aspect-ratio: 200 / 10;
    overflow: visible;
  }

  .phases-arrow-shimmer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 999px;
    /* Or chaud : lisible sur vert / or / rouge du trait (screen éclaircit le pigment) */
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 214, 140, 0) 28%,
      rgba(255, 248, 220, 0.72) 46%,
      rgba(255, 228, 160, 0.85) 50%,
      rgba(255, 248, 220, 0.72) 54%,
      rgba(255, 214, 140, 0) 72%,
      transparent 100%
    );
    background-size: 36% 100%;
    background-repeat: no-repeat;
    background-position: -20% 50%;
    mix-blend-mode: screen;
    animation: phases-arrow-shimmer 2.8s ease-in-out infinite;
  }

  @keyframes phases-arrow-shimmer {
    0% {
      background-position: -25% 50%;
    }
    100% {
      background-position: 125% 50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .phases-arrow-shimmer {
      animation: none;
      opacity: 0;
    }
  }

  /* Chaîne plus spécifique que `.intro-col p { color: black }` (le label est un <p>) */
  .intro-col .phases-cycle .phases-label {
    font-family: var(--font-mono);
    font-size: 0.84rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-night);
    margin-bottom: 0.75rem;
    text-align: left;
  }

  .phases-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 1rem;
    border: 1px solid rgba(115, 101, 85, 0.15);
    overflow: hidden;
  }

  .phase-tab {
    flex: 1;
    font-family: var(--font-mono);
    font-size: 0.70rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--color-blue-deep);
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 0.5rem 0.25rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .phase-tab:hover {
    background: rgba(115, 101, 85, 0.05);
    color: var(--color-night);
  }

  .phase-tab.active {
    font-weight: 700;
    background: rgba(115, 101, 85, 0.04);
  }

  .phase-card {
    padding: 1rem 1.25rem;
    background: rgba(115, 101, 85, 0.02);
    border: 1px solid rgba(115, 101, 85, 0.1);
    border-left: 3px solid;
    animation: fadePhase 0.3s ease forwards;
    min-height: 90px;
  }

  @keyframes fadePhase {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .phase-card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .phase-number {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-night);
    line-height: 1;
  }

  .phase-name {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
  }

  .phase-desc {
    font-size: 0.8rem !important;
    color: black;
    line-height: 1.6 !important;
    text-align: left !important;
    margin: 0 !important;
  }

  .phase-dots {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }

  .phase-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(115, 101, 85, 0.2);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.25s;
  }

  .phase-dot.active {
    width: 18px;
    border-radius: 3px;
  }

  /* --- SNEDD NUMBERS --- */
  .snedd-numbers {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(115, 101, 85, 0.12);
  }

  .snedd-number {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .snedd-n {
    font-family: var(--font-mono);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-blue-deep);
    line-height: 1;
  }

  .snedd-l {
    font-size: 0.890rem;
    color: var(--color-brown);
    line-height: 1.3;
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 768px) {
    .intro-inner {
      grid-template-columns: 1fr;
    }

    .intro-divider {
      width: 100%;
      height: 1px;
      margin: 2rem 0;
    }

    .intro-col {
      padding: 0;
    }
  }

  @media (orientation: landscape) and (max-height: 520px) and (max-width: 1024px) {
    .intro-inner {
      grid-template-columns: 1fr;
    }

    .intro-divider {
      width: 100%;
      height: 1px;
      margin: 1.5rem 0;
    }

    .intro-col {
      padding: 0;
    }

    .intro-col h2 {
      font-size: 1.25rem;
    }
  }

  @media (orientation: landscape) and (max-height: 720px) and (max-width: 1200px) {
    .intro-col p {
      font-size: 0.85rem;
      line-height: 1.6;
    }
  }
</style>