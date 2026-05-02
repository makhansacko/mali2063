<script lang="ts">
    import { indicators } from '$lib/data/vision';
  </script>
  
<section class="indicators section">
    <div class="container">
  
      <div class="section-header">
        <p class="label">Là où en est le Mali</p>
        <h2>Indicateurs Clés</h2>
        <p class="section-desc">
          Les engagements de la Vision Mali 2063 sont mesurables. 
          Voici où se situe le Mali aujourd'hui par rapport à ses cibles.
        </p>
      </div>
  
      <div class="indicators-grid">
        {#each indicators as indicator}
          <div class="indicator-card">
            <p class="ind-label">{indicator.label}</p>
            
            <!-- Progress bar -->
            <div class="ind-progress-track">
              <div 
                class="ind-progress-fill"
                style="width: {Math.min(
                  ((indicator.baseline - (indicator.targets[2063] < indicator.baseline ? indicator.targets[2063] : 0)) / 
                  (indicator.targets[2063] > indicator.baseline ? indicator.targets[2063] : indicator.baseline)) * 100, 
                  100
                )}%"
              ></div>
            </div>
  
            <!-- Values -->
            <div class="ind-values">
              <div class="ind-value-block">
                <span class="ind-value-number">
                  {indicator.baseline}{indicator.unit === '%' ? '%' : ''}
                </span>
                <span class="ind-value-meta">
                  Aujourd'hui ({indicator.baselineYear})
                </span>
              </div>
              <div class="ind-value-block ind-value-right">
                <span class="ind-value-number ind-value-target">
                  {indicator.targets[2063]}{indicator.unit === '%' ? '%' : ''}
                </span>
                <span class="ind-value-meta">
                  Cible 2063
                </span>
              </div>
            </div>
  
            {#if indicator.unit !== '%'}
              <p class="ind-unit">{indicator.unit}</p>
            {/if}
  
          </div>
        {/each}
      </div>
  
    </div>
  </section>

 <style>
.indicators {
  background: var(--color-night);
}

.indicators .section-header .label {
  color: var(--color-sand);
  opacity: 0.7;
}

.indicators .section-header h2 {
  color: white;
}

.indicators .section-desc {
  color: rgba(242, 224, 204, 0.7);
}

.indicators-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.indicator-card {
  background: var(--color-night);
  padding: 1.5rem;
  transition: background 0.2s;
}

.indicator-card:hover {
  background: var(--color-night-mid);
}

.ind-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-sand);
  opacity: 0.7;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.ind-progress-track {
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
}

.ind-progress-fill {
  height: 100%;
  background: var(--color-sand);
  transition: width 0.6s ease;
}

.ind-values {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.ind-value-block {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ind-value-right {
  text-align: right;
}

.ind-value-number {
  font-family: var(--font-mono);
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.ind-value-target {
  color: var(--color-green);
}

.ind-value-meta {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.05em;
}

.ind-unit {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 0.5rem;
  font-style: italic;
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