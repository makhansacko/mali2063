<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { axes, projects } from '$lib/data/vision';

  let currentIndicator: Record<string, number> = Object.fromEntries(
    projects.map(p => [p.id, 0])
  );

  let intervals: ReturnType<typeof setInterval>[] = [];

  onMount(() => {
    projects.forEach(project => {
      if (project.indicators.length > 1) {
        const interval = setInterval(() => {
          currentIndicator[project.id] =
            currentIndicator[project.id] === project.indicators.length - 1
              ? 0
              : currentIndicator[project.id] + 1;
          currentIndicator = { ...currentIndicator };
        }, 3000);
        intervals.push(interval);
      }
    });
  });

  onDestroy(() => {
    intervals.forEach(clearInterval);
  });

  function goTo(projectId: string, index: number) {
    currentIndicator[projectId] = index;
    currentIndicator = { ...currentIndicator };
  }

  function splitDescription(description: string, highlight?: string) {
    if (!highlight) {
      return { before: description, highlighted: '', after: '' };
    }
    const index = description.indexOf(highlight);
    if (index === -1) {
      return { before: description, highlighted: '', after: '' };
    }
    return {
      before: description.slice(0, index),
      highlighted: highlight,
      after: description.slice(index + highlight.length)
    };
  }

  function sortAxeIds(axeIds: string[]) {
    return [...axeIds].sort((a, b) => {
      const aNumber = axes.find((axe) => axe.id === a)?.number ?? Number.MAX_SAFE_INTEGER;
      const bNumber = axes.find((axe) => axe.id === b)?.number ?? Number.MAX_SAFE_INTEGER;
      return aNumber - bNumber;
    });
  }
</script>

<section class="projects section">
  <div class="container">

    <div class="section-header">
      <p class="label">Mise en œuvre de la vision</p>
      <h3>11 Projets Structurants</h3>
      <p class="section-desc">
        Onze projets intégrateurs et fédérateurs constituent le moteur de la 
        Vision Mali 2063.
        <br><br>
      </p>
    </div>

    <div class="projects-grid">
      {#each projects as project}
        {@const ind = project.indicators[currentIndicator[project.id]]}
        {@const current = currentIndicator[project.id]}
        {@const primaryColor = axes.find(a => a.id === project.primaryAxe)?.color}
        {@const descriptionParts = splitDescription(project.description, project.descriptionHighlight)}

        <div class="project-card">

          <!-- HEADER -->
          <div class="project-card-header">
            <div class="project-number-wrap">
              <span class="project-number">
                {String(project.number).padStart(2, '0')}
              </span>
              <img
                src="/projects/Project{project.number}.svg"
                alt={project.name}
                class="project-icon"
              />
            </div>
            <div class="project-axes-tags">
              {#each sortAxeIds(project.axe) as axeId}
                <span
                  class="project-axe-tag"
                  class:primary={axeId === project.primaryAxe}
                  style="background: {axes.find(a => a.id === axeId)?.color}"
                >
                  Axe {axes.find(a => a.id === axeId)?.number}
                </span>
              {/each}
            </div>
          </div>

          <!-- BODY -->
          <div class="project-card-body">
            <h3 class="project-name">{project.name}</h3>
            <p class="project-name-fr">{project.nameFr}</p>
            <p class="project-desc">
              {descriptionParts.before}
              {#if descriptionParts.highlighted}
                <strong>{descriptionParts.highlighted}</strong>
              {/if}
              {descriptionParts.after}
            </p>
          </div>

          <!-- INDICATOR CAROUSEL -->
          <div class="project-card-indicator" style="border-top: 2px solid {primaryColor}">

            <div class="indicator-top">
              <div class="ind-dots">
                {#each project.indicators as _, i}
                  <button
                    class="ind-dot"
                    class:active={i === current}
                    style={i === current ? `background: ${primaryColor}` : ''}
                    on:click={() => goTo(project.id, i)}
                    aria-label="Indicateur {i + 1}"
                  ></button>
                {/each}
              </div>
              <p class="indicator-label">{ind.label}</p>
            </div>

            <div class="indicator-values">
              <span class="ind-val-number">{ind.baseline}{ind.unit === '%' ? '%' : ''}</span>
              <span class="indicator-arrow-icon" style="color: {primaryColor}">→</span>
              <span class="ind-val-number ind-val-target">{ind.targets[2063]}{ind.unit === '%' ? '%' : ''}</span>
              {#if ind.unit !== '%'}
                <span class="ind-unit">{ind.unit}</span>
              {/if}
            </div>

          </div>

        </div>
        
      {/each}
          <!-- SAHELIA CARD -->
<div class="sahelia-card">
  <div class="sahelia-icon">
    <img src="/logo_sahelIA2.png" alt="Sahelia" class="sahelia-svg" />
  </div>
  <h3 class="sahelia-title">Des questions sur les projets structurants ?</h3>
  <p class="sahelia-desc">
    SaheL'IA peut répondre à vos questions sur les 11 projets, 
    les 5 axes stratégiques et l'ensemble de la Vision Mali Kura 2063.
  </p>
  <button class="sahelia-btn" on:click={() => {
    const toggle = document.querySelector('.chat-toggle') as HTMLElement;
    if (toggle) toggle.click();
  }}>
    Poser une question →
  </button>
</div>
</div>
    </div>

</section>

<style>
  .projects {
    background: white;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  /* --- CARD --- */
  .project-card {
    border: 1px solid rgba(115, 101, 85, 0.12);
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
    background: var(--color-sand-pale);
  }

  .project-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }

  /* --- HEADER --- */
  .project-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(115, 101, 85, 0.1);
  }

  .project-number-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .project-number {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-night);
    letter-spacing: 0.1em;
  }

  .project-icon {
    width: 25px;
    height: 25px;
    filter: brightness(0);
    opacity: 0.7;
  }

  .project-axes-tags {
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
  }

  .project-axe-tag {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: white;
    padding: 0.2rem 0.5rem;
    opacity: 1;
  }

  .project-axe-tag.primary {
    opacity: 1;
  }

  /* --- BODY --- */
  .project-card-body {
    padding: 1.25rem;
    flex: 1;
  }

  .project-name {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--color-night-mid);
    margin-bottom: 0.35rem;
    text-transform: uppercase;
  }

  .project-name-fr {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-blue-deep);
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  .project-desc {
    font-size: 0.82rem;
    color: var(--color-night-mid);
    line-height: 1.65;
  }

  /* --- INDICATOR CAROUSEL --- */
  .project-card-indicator {
    padding: 0.85rem 1.25rem;
    background: white;
  }

  .indicator-top {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.5rem;
  }

  .indicator-label {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-brown);
    opacity: 0.7;
    line-height: 1.3;
    transition: opacity 0.3s ease;
  }

  /* --- VALUES --- */
  .indicator-values {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: opacity 0.3s ease;
  }

  .ind-val-number {
    font-family: var(--font-mono);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-brown);
    line-height: 1;
  }

  .ind-val-target {
    color: var(--color-green);
  }

  .indicator-arrow-icon {
    font-weight: 700;
    font-size: 0.85rem;
  }

  .ind-unit {
    font-family: var(--font-mono);
    font-size: 0.55rem;
    color: var(--color-brown);
    opacity: 0.5;
    font-style: italic;
  }

  /* --- DOTS --- */
  .ind-dots {
    display: flex;
    gap: 0.3rem;
    flex-shrink: 0;
  }

  .ind-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(115, 101, 85, 0.2);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s;
  }

  .ind-dot.active {
    width: 14px;
    border-radius: 3px;
  }

  /*-- SAHELIA CARD --*/
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

.sahelia-svg {
  display: block;
  max-width: 2.2rem;
  max-height: 2.2rem;
  width: auto;
  height: auto;
  object-fit: contain;
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
  color:white;
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
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>