<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { get } from 'svelte/store';
  import { locale, t } from '$lib/i18n';
  import { interpolate } from '$lib/i18n/messages';
  import type { Indicator } from '$lib/data/vision';
  import { formatIndicatorValue } from '$lib/components/indicators/format';

  export let indicator: Indicator;

  type ChartInstance = { destroy: () => void };
  let chart: ChartInstance | undefined;
  let canvas: HTMLCanvasElement | undefined;

  function buildChartData(ind: Indicator) {
    const points: { x: number; y: number }[] = [];
    points.push({ x: ind.baselineYear, y: ind.baseline });
    if (ind.targets[2033]) points.push({ x: 2033, y: ind.targets[2033] });
    points.push({ x: 2063, y: ind.targets[2063] });
    return points;
  }

  function formatYear(value: number): string {
    return String(Math.round(value));
  }

  async function initChart() {
    if (!canvas) return;
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const data = buildChartData(indicator);
    const isDecreasing = indicator.targets[2063] < indicator.baseline;
    const lineColor = isDecreasing ? '#c45c5c' : '#3C6FAB';
    const labels = data.map((p) => p.x);
    const values = data.map((p) => p.y);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 80);
    gradient.addColorStop(0, isDecreasing ? 'rgba(196, 92, 92, 0.07)' : 'rgba(60, 111, 171, 0.07)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
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
            tension: 0.2
          }
        ]
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
                return `${$t('indicators.year')} ${formatYear(Number(year))}`;
              },
              label: (item) => {
                const y = item.parsed.y;
                if (y == null) return '';
                return ` ${formatIndicatorValue(y, indicator.unit)}`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            min: indicator.baselineYear - 1,
            max: 2064,
            ticks: {
              color: '#aaaaaa',
              font: { family: 'Inter', size: 9 },
              maxTicksLimit: 4,
              precision: 0,
              callback: (v: string | number) => formatYear(Number(v))
            },
            grid: { display: false },
            border: { display: false }
          },
          y: {
            ticks: {
              color: '#aaaaaa',
              font: { family: 'Inter', size: 9 },
              maxTicksLimit: 4,
              callback: (v: string | number) =>
                indicator.unit === '%' ? `${v}%` : String(v)
            },
            grid: { color: 'rgba(0,0,0,0.05)' },
            border: { display: false }
          }
        }
      }
    });
  }

  async function refreshChart() {
    chart?.destroy();
    chart = undefined;
    await tick();
    await initChart();
  }

  onMount(() => {
    let previousLocale = get(locale);
    void refreshChart();
    const unsubscribe = locale.subscribe((loc) => {
      if (loc === previousLocale) return;
      previousLocale = loc;
      void refreshChart();
    });
    return unsubscribe;
  });

  onDestroy(() => {
    chart?.destroy();
  });

  $: trajectory = buildChartData(indicator);
</script>

<div class="ind-chart-wrap">
  <canvas
    bind:this={canvas}
    aria-label={interpolate($t('indicators.chartAria'), { label: indicator.label })}
  ></canvas>
  <table class="chart-alt">
    <caption>
      {interpolate($t('indicators.chartTableCaption'), { label: indicator.label })}
    </caption>
    <thead>
      <tr>
        <th>{$t('indicators.year')}</th>
        <th>{$t('indicators.chartOfficial')}</th>
      </tr>
    </thead>
    <tbody>
      {#each trajectory as point}
        <tr>
          <td>{point.x}</td>
          <td>{formatIndicatorValue(point.y, indicator.unit)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .ind-chart-wrap {
    width: 100%;
    height: 80px;
    position: relative;
  }

  .chart-alt {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
