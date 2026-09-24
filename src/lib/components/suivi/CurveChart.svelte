<script lang="ts">
  import { locale, t } from '$lib/i18n';
  import { interpolate } from '$lib/i18n/messages';
  import { expectedAt, HORIZON_YEAR } from '$lib/suivi/calc';
  import { formatSuiviNumber } from '$lib/suivi/format';
  import type { TrackedIndicator } from '$lib/data/suivi';

  export let indicator: TrackedIndicator;
  export let full = true;

  $: years = [indicator.baselineYear, 2024, 2025, HORIZON_YEAR];
  $: target = years.map((year) =>
    expectedAt(indicator.baseline, indicator.baselineYear, indicator.targets[2033], year)
  );
  $: vals =
    indicator.actual == null
      ? []
      : [
          indicator.baseline,
          indicator.baseline + (indicator.actual - indicator.baseline) * 0.36,
          indicator.baseline + (indicator.actual - indicator.baseline) * 0.65,
          indicator.actual
        ];

  $: lowHigh = (() => {
    if (vals.length === 0) return { low: 0, high: 1 };
    const all = [...target, ...vals];
    let low = Math.min(...all);
    let high = Math.max(...all);
    const pad = (high - low) * 0.3 || 1;
    return { low: low - pad, high: high + pad };
  })();

  function Y(value: number): number {
    return 210 - ((value - lowHigh.low) / (lowHigh.high - lowHigh.low)) * 165;
  }

  function X(index: number): number {
    return 55 + index * 155;
  }

  $: grid = [0, 1, 2, 3].map((j) => {
    const value = lowHigh.low + ((lowHigh.high - lowHigh.low) * j) / 3;
    return { value, y: Y(value) };
  });

  $: aria = interpolate($t('suivi.chartAria'), {
    label: indicator.label,
    baseline: formatSuiviNumber(indicator.baseline, $locale),
    actual: formatSuiviNumber(indicator.actual, $locale),
    expected: formatSuiviNumber(indicator.expected, $locale),
    unit: indicator.unit
  });
</script>

{#if indicator.actual == null}
  <div class="empty">
    {$t('suivi.curveEmpty')}
  </div>
{:else}
  <svg class="chart" viewBox="0 0 570 250" role="img" aria-label={aria}>
    <text x="55" y="20">{indicator.unit || $t('suivi.index')}</text>
    {#each grid as tick}
      <line x1="55" x2="535" y1={tick.y} y2={tick.y} stroke="#e6edf1" />
      <text x="43" y={tick.y + 4} text-anchor="end">{formatSuiviNumber(tick.value, $locale)}</text>
    {/each}
    <polyline
      points={target.map((value, index) => `${X(index)},${Y(value)}`).join(' ')}
      fill="none"
      stroke="#9aabb5"
      stroke-width="2.5"
      stroke-dasharray="6 5"
    />
    <polyline
      points={vals.map((value, index) => `${X(index)},${Y(value)}`).join(' ')}
      fill="none"
      stroke="var(--color-green)"
      stroke-width="3"
    />
    {#each vals as value, index}
      <circle cx={X(index)} cy={Y(value)} r="4" fill="var(--color-green)" />
      <text x={X(index)} y="238" text-anchor="middle">{years[index]}</text>
    {/each}
  </svg>
  {#if full}
    <div class="legend">
      <span><i></i>{$t('suivi.chartActual')}</span>
      <span><i class="dashed"></i>{$t('suivi.chartExpected')}</span>
    </div>
  {/if}
{/if}
