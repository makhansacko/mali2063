<script lang="ts">
  import { t } from '$lib/i18n';
  import type { Indicator } from '$lib/data/vision';
  import IndicatorChart from '$lib/components/indicators/IndicatorChart.svelte';
  import { formatCompactValue } from '$lib/components/indicators/format';

  export let indicator: Indicator;

  function annualGrowth(ind: Indicator): { value: number; label: string } | null {
    const t2033 = ind.targets[2033];
    if (!t2033) return null;
    const years = 2033 - ind.baselineYear;
    if (years <= 0) return null;
    const value = (t2033 - ind.baseline) / years;
    const unit = ind.unit === '%' ? $t('indicators.growthPts') : ` ${ind.unit}${$t('indicators.growthPerYear')}`;
    return { value, label: unit };
  }

  $: growth = annualGrowth(indicator);
  $: isDecreasing = indicator.targets[2063] < indicator.baseline;
  $: has2033 = !!indicator.targets[2033];
  $: accentColor = isDecreasing ? '#c45c5c' : '#3C6FAB';
</script>

<div class="indicator-card">
  <div class="indicator-card-header">
    <p class="indicator-label">{indicator.label}</p>
    <div class="indicator-header-meta">
      {#if growth}
        <span class="ind-growth-badge" class:negative={isDecreasing}>
          {growth.value > 0 ? '+' : ''}{Math.abs(growth.value) < 1 ? growth.value.toFixed(2) : growth.value.toFixed(1)}{growth.label}
        </span>
      {/if}
    </div>
  </div>

  <div class="indicator-card-body">
    <IndicatorChart {indicator} />

    {#if growth}
      <p class="ind-du-stat">
        {isDecreasing ? $t('indicators.reduceBy') : $t('indicators.increaseBy')}
        <strong>{Math.abs(growth.value) < 1 ? Math.abs(growth.value).toFixed(2) : Math.abs(growth.value).toFixed(1)}{growth.label.replace($t('indicators.growthPerYear'), '')}</strong>
        {$t('indicators.perYearUntil2033')}
      </p>
    {/if}
  </div>

  <div class="indicator-card-footer" style="border-top: 2px solid {accentColor}">
    <div class="indicator-values">
      <div class="ind-value-group">
        <span class="ind-val-number">
          {formatCompactValue(indicator.baseline, indicator.unit)}
        </span>
        <span class="ind-value-meta">{indicator.baselineYear}</span>
      </div>

      {#if has2033}
        <span class="indicator-arrow-icon" style="color: {accentColor}">→</span>
        <div class="ind-value-group">
          <span class="ind-val-number ind-val-2033">
            {formatCompactValue(indicator.targets[2033], indicator.unit)}
          </span>
          <span class="ind-value-meta">2033</span>
        </div>
      {/if}

      <span class="indicator-arrow-icon" style="color: {accentColor}">→</span>
      <div class="ind-value-group">
        <span class="ind-val-number ind-val-target">
          {formatCompactValue(indicator.targets[2063], indicator.unit)}
        </span>
        <span class="ind-value-meta">2063</span>
      </div>

      {#if indicator.unit !== '%'}
        <span class="ind-unit">{indicator.unit}</span>
      {/if}
    </div>
  </div>
</div>

<style>
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

  .indicator-header-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.35rem;
    flex-shrink: 0;
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

  .indicator-card-body {
    padding: 1rem 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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
</style>
