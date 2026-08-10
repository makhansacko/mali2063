<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { locale, t } from '$lib/i18n';
  import { getAxes } from '$lib/data/vision-i18n';

  $: axes = getAxes($locale);

  let activeAxe: string | null = null;
  let showingSpecificObjectives: Record<string, boolean> = {};

  function toggle(id: string) {
    const next = activeAxe === id ? null : id;
    if (next !== id) {
      showingSpecificObjectives[id] = false;
    }
    activeAxe = next;
  }

  function toggleSpecificObjectives(axeId: string) {
    showingSpecificObjectives[axeId] = !showingSpecificObjectives[axeId];
    showingSpecificObjectives = { ...showingSpecificObjectives };
  }

  function getSpecificObjectives(axeId: string) {
    const selectedAxe = axes.find((axe) => axe.id === axeId);
    if (!selectedAxe) return [];
    return selectedAxe.globalObjectives.flatMap((globalObjective, globalIndex) =>
      globalObjective.specificObjectives.map((specificObjective, specificIndex) => ({
        id: specificObjective.id,
        number: `${selectedAxe.number}.${globalIndex + 1}.${specificIndex + 1}`,
        label: specificObjective.label
      }))
    );
  }

  function splitGlobalObjectiveLabel(label: string) {
    const match = label.match(/^(\d+\.\d+\.?)\s*(.*)$/);
    if (!match) return { number: '', text: label };
    return { number: match[1], text: match[2] };
  }

  async function applyHashFromUrl() {
    if (typeof window === 'undefined') return;
    const raw = window.location.hash.replace(/^#/, '');
    if (!raw) return;
    const match = axes.find((a) => a.id === raw);
    if (!match) return;
    activeAxe = match.id;
    showingSpecificObjectives[match.id] = true;
    showingSpecificObjectives = { ...showingSpecificObjectives };
    await tick();
    requestAnimationFrame(() => {
      document.getElementById('axes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  onMount(() => {
    void applyHashFromUrl();
    const onHash = () => void applyHashFromUrl();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  });

  afterNavigate(() => void applyHashFromUrl());
</script>

<section class="axes section" id="axes">
  <div class="container">
    <div class="section-header">
      <p class="label">{$t('axes.label')}</p>
      <h3>{$t('axes.title')}</h3>
    </div>
  </div>

  <div class="axes-accordion">
    {#each axes as axe (axe.id)}
      {@const isActive = activeAxe === axe.id}
      {@const isSpecificView = !!showingSpecificObjectives[axe.id]}

      <button
        id={axe.id}
        class="axe-panel"
        class:active={isActive}
        style="--axe-color: {axe.color}"
        on:click={() => toggle(axe.id)}
        aria-expanded={isActive}
      >
        <!-- Background -->
        <div class="axe-panel-bg"></div>

        <!-- COLLAPSED STATE — always visible -->
        <div class="axe-panel-collapsed">
          <span class="axe-number">0{axe.number}</span>
          <span class="axe-label-vertical">{axe.label}</span>
        </div>

        <!-- EXPANDED STATE — visible when active -->
        {#if isActive}
          <div class="axe-panel-expanded">
            <div class="axe-expanded-header">
              <h3 class="axe-expanded-label">{axe.label}</h3>
            </div>

            <div class="axe-expanded-stats">
              <div class="axe-stat">
                <span class="axe-stat-n">{axe.globalObjectives.length}</span>
                <span class="axe-stat-l">{$t('axes.globalObjectives')}</span>
              </div>
              <div class="axe-stat">
                <span class="axe-stat-n">
                  {axe.globalObjectives.reduce((acc, o) => acc + o.specificObjectives.length, 0)}
                </span>
                <span class="axe-stat-l">{$t('axes.specificObjectives')}</span>
              </div>
            </div>

            <div class="axe-expanded-objectives">
              <div class="axe-objectives-view" class:active={!isSpecificView}>
                {#each axe.globalObjectives as obj}
                  {@const parsedObjective = splitGlobalObjectiveLabel(obj.label)}
                  <p class="axe-objective">
                    {#if parsedObjective.number}
                      <span class="axe-objective-number">{parsedObjective.number}</span>
                    {/if}
                    {parsedObjective.text}
                  </p>
                {/each}
              </div>

              <div class="axe-objectives-view axe-objectives-specific" class:active={isSpecificView}>
                {#each getSpecificObjectives(axe.id) as objective}
                  <p class="axe-objective axe-objective-specific">
                    <span class="axe-objective-number">{objective.number}</span>
                    {objective.label}
                  </p>
                {/each}
              </div>
            </div>

            <span
              role="button"
              tabindex="0"
              class="axe-expanded-cta"
              on:click|stopPropagation={() => toggleSpecificObjectives(axe.id)}
              on:keydown|stopPropagation={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggleSpecificObjectives(axe.id);
                }
              }}
            >
              {isSpecificView ? $t('axes.viewGlobal') : $t('axes.viewSpecific')} →
            </span>
          </div>
        {/if}

      </button>
    {/each}
  </div>

</section>

<style>
  /* Bat le padding de .section (4rem bas) qui créait un grand vide avant Isometric */
  section.axes.section {
    padding-top: var(--space-3xl);
    padding-bottom: 0;
  }

  .axes {
    background: white;
    scroll-margin-top: 5.5rem;
    position: relative;
    z-index: 1;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .section-header h3 {
    color: var(--color-night);
    margin-top: 0.5rem;
  }

  /* --- ACCORDION --- */
  .axes-accordion {
    display: flex;
    flex-direction: row;
    height: 520px;
    border: 1px solid rgba(115, 101, 85, 0.15);
    overflow: hidden;
    min-height: 0;
  }

  /* --- PANEL --- */
  .axe-panel {
    position: relative;
    flex: 1;
    min-width: 60px;
    min-height: 0;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    cursor: pointer;
    border: none;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0;
    text-align: left;
    background: none;
    transition: flex 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .axe-panel:last-child {
    border-right: none;
  }

  .axe-panel.active {
    flex: 5;
  }

  /* --- BACKGROUND --- */
  .axe-panel-bg {
    position: absolute;
    inset: 0;
    background-color: var(--axe-color);
    z-index: 0;
    transition: filter 0.3s ease;
  }

  .axe-panel:hover .axe-panel-bg {
    filter: brightness(1.08);
  }

  /* --- COLLAPSED --- */
  .axe-panel-collapsed {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    min-width: 60px;
    flex-shrink: 0;
  }

  .axe-number {
    font-family: var(--font-mono);
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
    letter-spacing: 0.1em;
  }

  .axe-label-vertical {
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    line-height: 1.3;
    text-align: center;
    white-space: normal;
    max-height: 300px;
    overflow: hidden;
  }

  /* --- EXPANDED --- */
  .axe-panel-expanded {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem 2rem 1.5rem;
    flex: 1;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    animation: fadeIn 0.3s ease forwards;
    border-left: 1px solid rgba(255, 255, 255, 0.15);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(8px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .axe-expanded-header {
    margin-bottom: 1.5rem;
  }

  .axe-expanded-label {
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    line-height: 1.3;
    margin: 0;
  }

  /* --- STATS --- */
  .axe-expanded-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  .axe-stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .axe-stat-n {
    font-family: var(--font-mono);
    font-size: 2rem;
    font-weight: 700;
    color: white;
    line-height: 1;
  }

  .axe-stat-l {
    font-family: var(--font-mono);
    font-size: 0.55rem;
    color: white;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.4;
    white-space: pre-line;
  }

  /* --- OBJECTIVES --- */
  .axe-expanded-objectives {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: block;
    margin-bottom: 1.5rem;
    scrollbar-width: none;
  }

  .axe-expanded-objectives::-webkit-scrollbar {
    display: none;
  }

  .axe-objective {
    font-size: 0.78rem;
    color: white;
    line-height: 1.5;
    margin: 0;
    padding-left: 0.5rem;
    border-left: 2px solid rgba(255, 255, 255, 0.2);
  }

  .axe-objectives-view {
    display: none;
    flex-direction: column;
    gap: 0.5rem;
    opacity: 0;
    transform: translateX(10px);
  }

  .axe-objectives-view.active {
    display: flex;
    animation: objectiveViewIn 0.26s ease forwards;
  }

  .axe-objective-specific {
    border-left-color: rgba(255, 255, 255, 0.35);
  }

  .axe-objective-number {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: white;
    margin-right: 0.45rem;
  }

  @keyframes objectiveViewIn {
    from {
      opacity: 0;
      transform: translateX(10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* --- CTA --- */
  .axe-expanded-cta {
    appearance: none;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: white;
    text-decoration: none;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    transition: opacity 0.2s;
    flex-shrink: 0;
  }

  .axe-expanded-cta:hover {
    opacity: 0.7;
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 768px) {
    .axes-accordion {
      flex-direction: column;
      height: auto;
    }

    .axe-panel {
      min-height: 60px;
      flex-direction: column;
      transition: flex 0.4s ease;
    }

    .axe-panel.active {
      flex: 4;
      min-height: 300px;
    }

    .axe-panel-collapsed {
      flex-direction: row;
      padding: 1rem 1.25rem;
      min-width: unset;
    }

    .axe-label-vertical {
      writing-mode: horizontal-tb;
      transform: none;
    }

    .axe-panel-expanded {
      border-left: none;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding: 1.25rem;
    }
  }
</style>