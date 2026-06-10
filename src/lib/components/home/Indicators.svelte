<script lang="ts">
  import { indicators } from '$lib/data/vision';
  import { onMount, onDestroy, tick } from 'svelte';
  import { browser } from '$app/environment';

  export let showSectionHeader = true;

  type ChartInstance = { destroy: () => void };
  let charts: Record<string, ChartInstance> = {};
  let canvases: Record<string, HTMLCanvasElement> = {};
  let saheliaLottieCanvas: HTMLCanvasElement | undefined;
  let saheliaDotLottie: { destroy: () => void } | undefined;

  function openChatWidget() {
    const toggle = document.querySelector('.chat-toggle') as HTMLElement | null;
    toggle?.click();
  }

  function annualGrowth(ind: typeof indicators[0]): { value: number; label: string } | null {
    const t2033 = ind.targets[2033];
    if (!t2033) return null;
    const years = 2033 - ind.baselineYear;
    if (years <= 0) return null;
    const value = (t2033 - ind.baseline) / years;
    const unit = ind.unit === '%' ? ' pts/an' : ` ${ind.unit}/an`;
    return { value, label: unit };
  }

  function buildChartData(ind: typeof indicators[0]) {
    const points: { x: number; y: number }[] = [];
    points.push({ x: ind.baselineYear, y: ind.baseline });
    if (ind.targets[2033]) points.push({ x: 2033, y: ind.targets[2033] });
    points.push({ x: 2063, y: ind.targets[2063] });
    return points;
  }

  function formatYear(value: number): string {
    return String(Math.round(value));
  }

  function formatValue(val: number, unit: string): string {
    const formatted = Math.abs(val) >= 1000
      ? val.toLocaleString('fr-FR', { maximumFractionDigits: 0 })
      : val % 1 === 0 ? String(val) : val.toFixed(1);
    return unit === '%' ? `${formatted}%` : `${formatted} ${unit}`;
  }

  async function initCharts() {
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    for (const ind of indicators) {
      const canvas = canvases[ind.label];
      if (!canvas) continue;

      const data = buildChartData(ind);
      const isDecreasing = ind.targets[2063] < ind.baseline;
      const lineColor = isDecreasing ? '#c45c5c' : '#3C6FAB';

      const labels = data.map(p => p.x);
      const values = data.map(p => p.y);

      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      const gradient = ctx.createLinearGradient(0, 0, 0, 80);
      gradient.addColorStop(0, isDecreasing ? 'rgba(196, 92, 92, 0.07)' : 'rgba(60, 111, 171, 0.07)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      charts[ind.label] = new Chart(canvas, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data: values,
            borderColor: lineColor,
            borderWidth: 1.5,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: lineColor,
            pointBorderWidth: 1.5,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: lineColor,
            pointHoverBorderWidth: 2,
            fill: true,
            backgroundColor: gradient,
            tension: 0.2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#ffffff',
              borderColor: 'rgba(0,0,0,0.08)',
              borderWidth: 1,
              titleColor: '#666666',
              bodyColor: '#111111',
              titleFont: { family: 'Inter', size: 10 },
              bodyFont: { family: 'Inter', size: 11, weight: 'bold' },
              padding: 8,
              callbacks: {
                title: (items) => {
                  const year = items[0].parsed.x ?? items[0].label;
                  return `Année ${formatYear(Number(year))}`;
                },
                label: (item) => {
                  const y = item.parsed.y;
                  if (y == null) return '';
                  return ` ${formatValue(y, ind.unit)}`;
                }
              }
            }
          },
          scales: {
            x: {
              type: 'linear',
              min: ind.baselineYear - 1,
              max: 2064,
              ticks: {
                color: '#aaaaaa',
                font: { family: 'Inter', size: 9 },
                maxTicksLimit: 4,
                precision: 0,
                callback: (v) => formatYear(Number(v))
              },
              grid: { display: false },
              border: { display: false }
            },
            y: {
              ticks: {
                color: '#aaaaaa',
                font: { family: 'Inter', size: 9 },
                maxTicksLimit: 4,
                callback: (v) => ind.unit === '%' ? `${v}%` : String(v)
              },
              grid: {
                color: 'rgba(0,0,0,0.05)',
              },
              border: { display: false }
            }
          }
        }
      });
    }
  }

  onMount(() => {
    initCharts();

    let cancelled = false;

    void (async () => {
      if (!browser) return;
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
    Object.values(charts).forEach(c => c.destroy());
    saheliaDotLottie?.destroy();
  });
</script>

<section class="indicators section" class:indicators--embedded={!showSectionHeader}>
  <div class="container">

    {#if showSectionHeader}
      <div class="section-header">
        <p class="label">Trajectoire de la Vision</p>
        <h3>Indicateurs clés</h3>
        <p class="section-desc">
          Les engagements de la Vision Mali 2063 sont mesurables.
          Trajectoires officielles — baseline, cible 2033 et cible 2063.
        </p>
      </div>
    {/if}

    <div class="indicators-grid">
      {#each indicators as indicator}
        {@const growth = annualGrowth(indicator)}
        {@const isDecreasing = indicator.targets[2063] < indicator.baseline}
        {@const has2033 = !!indicator.targets[2033]}
        {@const accentColor = isDecreasing ? '#c45c5c' : '#3C6FAB'}

        <div class="indicator-card">

          <div class="indicator-card-header">
            <p class="indicator-label">{indicator.label}</p>
            {#if growth}
              <span class="ind-growth-badge" class:negative={isDecreasing}>
                {growth.value > 0 ? '+' : ''}{Math.abs(growth.value) < 1 ? growth.value.toFixed(2) : growth.value.toFixed(1)}{growth.label}
              </span>
            {/if}
          </div>

          <div class="indicator-card-body">
            <div class="ind-chart-wrap">
              <canvas
                bind:this={canvases[indicator.label]}
                aria-label={`Trajectoire ${indicator.label}`}
              ></canvas>
            </div>

            {#if growth}
              <p class="ind-du-stat">
                {isDecreasing ? 'Réduire de' : 'Augmenter de'}
                <strong>{Math.abs(growth.value) < 1 ? Math.abs(growth.value).toFixed(2) : Math.abs(growth.value).toFixed(1)}{growth.label.replace('/an', '')}</strong>
                par an jusqu'en 2033
              </p>
            {/if}
          </div>

          <div class="indicator-card-footer" style="border-top: 2px solid {accentColor}">
            <div class="indicator-values">
              <div class="ind-value-group">
                <span class="ind-val-number">
                  {indicator.baseline}{indicator.unit === '%' ? '%' : ''}
                </span>
                <span class="ind-value-meta">{indicator.baselineYear}</span>
              </div>

              {#if has2033}
                <span class="indicator-arrow-icon" style="color: {accentColor}">→</span>
                <div class="ind-value-group">
                  <span class="ind-val-number ind-val-2033">
                    {indicator.targets[2033]}{indicator.unit === '%' ? '%' : ''}
                  </span>
                  <span class="ind-value-meta">2033</span>
                </div>
              {/if}

              <span class="indicator-arrow-icon" style="color: {accentColor}">→</span>
              <div class="ind-value-group">
                <span class="ind-val-number ind-val-target">
                  {indicator.targets[2063]}{indicator.unit === '%' ? '%' : ''}
                </span>
                <span class="ind-value-meta">2063</span>
              </div>

              {#if indicator.unit !== '%'}
                <span class="ind-unit">{indicator.unit}</span>
              {/if}
            </div>
          </div>

        </div>
      {/each}

      <div class="sahelia-card">
        <div class="sahelia-icon">
          <canvas bind:this={saheliaLottieCanvas} class="sahelia-lottie" aria-label="SaheL'IA"></canvas>
        </div>
        <h3 class="sahelia-title">Des questions sur les indicateurs ?</h3>
        <p class="sahelia-desc">
          SaheL'IA peut répondre à vos questions sur les trajectoires, les cibles 2033 et 2063,
          et l'ensemble de la Vision Mali 2063.
        </p>
        <button type="button" class="sahelia-btn" on:click={openChatWidget}>
          Poser une question →
        </button>
      </div>
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

  /* --- CARD --- */
  .indicator-card {
    border: 1px solid rgba(0, 0, 0, 0.07);
    display: flex;
    flex-direction: column;
    background: #ffffff;
    transition: box-shadow 0.2s;
  }

  .indicator-card:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  }

  /* --- HEADER --- */
  .indicator-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .indicator-label {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-night-mid);
    line-height: 1.3;
    margin: 0;
    flex: 1;
  }

  .ind-growth-badge {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #2d7a4f;
    background: rgba(45, 122, 79, 0.08);
    padding: 0.15rem 0.4rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .ind-growth-badge.negative {
    color: #c45c5c;
    background: rgba(196, 92, 92, 0.08);
  }

  /* --- BODY --- */
  .indicator-card-body {
    padding: 1rem 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ind-chart-wrap {
    width: 100%;
    height: 80px;
    position: relative;
  }

  .ind-du-stat {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    color: #888888;
    line-height: 1.5;
    margin: 0;
    letter-spacing: 0.02em;
  }

  .ind-du-stat strong {
    color: #333333;
    font-weight: 700;
  }

  /* --- FOOTER --- */
  .indicator-card-footer {
    padding: 0.85rem 1.25rem;
    background: #fafafa;
  }

  .indicator-values {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .ind-value-group {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .ind-val-number {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 700;
    color: #666666;
    line-height: 1;
  }

  .ind-val-2033 {
    color: #3C6FAB;
  }

  .ind-val-target {
    color: #2d7a4f;
  }

  .indicator-arrow-icon {
    font-weight: 400;
    font-size: 0.75rem;
    color: #cccccc;
  }

  .ind-value-meta {
    font-family: var(--font-mono);
    font-size: 0.48rem;
    color: #aaaaaa;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 1;
  }

  .ind-unit {
    font-family: var(--font-mono);
    font-size: 0.55rem;
    color: #aaaaaa;
    font-style: italic;
    margin-left: auto;
  }

  /* --- SAHELIA CARD --- */
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

  /* --- RESPONSIVE --- */
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