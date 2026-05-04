<script lang="ts">
</script>

<section class="intro section" id="intro">
  <div class="container intro-inner">

    <!-- LEFT — Vision Mali 2063 -->
    <div class="intro-col">
      <p class="label">Le cadre de référence</p>
      <h2>Vision Mali 2063</h2>
      <div class="divider"></div>

      <div class="intro-col-inner">
        <!-- Cover image -->
        <div class="intro-cover">
          <img 
            src="/visionCover.webp"
            alt="Vision Mali Kura 2063 — couverture officielle"
            class="intro-cover-img"
          />
        </div>

        <!-- Text -->
        <div class="intro-col-text">
          <p>
            En décembre 2024, le gouvernement du Mali a publié la Vision Mali Kura 
            2063 (MALI KURA NƐTAASIRA KA BƐN SAN 2063 MA) - un cadre de développement national sur quarante ans, organisé 
            autour de 4 phases décennales et 11 projets structurants couvrant 
            l'ensemble du territoire malien.
          </p>
          <p style="margin-top: 1rem">
            Ce cadre fixe les ambitions du Mali à l'horizon 2063 : réduire la 
            pauvreté de 43,9% à 10%, porter l'accès à l'électricité à 100%, 
            construire 3 000 km de voies ferrées, et faire du secteur manufacturier 
            26% du PIB national.
          </p>
        </div>
      </div>
    </div>

    <!-- DIVIDER -->
    <div class="intro-divider"></div>

    <!-- RIGHT — SNEDD 2024-2033 -->
    <div class="intro-col">
      <p class="label">La stratégie opérationnelle</p>
      <h2>SNEDD 2024–2033</h2>
      <div class="divider"></div>
      <p>
        La Stratégie Nationale de Développement Durable 2024-2033 est le cadre 
        opérationnel de la première décennie de la Vision Mali 2063. Elle traduit 
        les ambitions de long terme en objectifs mesurables et en actions concrètes 
        pour les dix prochaines années.
      </p>
      <p style="margin-top: 1rem">
        La SNEDD est organisée autour de 5 axes stratégiques, 13 objectifs globaux 
        et 38 objectifs spécifiques - chacun assorti d'indicateurs de suivi avec 
        des valeurs de référence et des cibles à l'horizon 2033.
      </p>

      <!-- 3 key numbers -->
      <div class="snedd-numbers">
        <div class="snedd-number">
          <span class="snedd-n">5</span>
          <span class="snedd-l">Axes stratégiques</span>
        </div>
        <div class="snedd-number">
          <span class="snedd-n">13</span>
          <span class="snedd-l">Objectifs globaux</span>
        </div>
        <div class="snedd-number">
          <span class="snedd-n">38</span>
          <span class="snedd-l">Objectifs spécifiques</span>
        </div>
      </div>

      <p style="margin-top: 1.5rem; font-size: 0.85rem; color: var(--color-blue-deep); font-weight: 600">
        ↓ Les 5 axes stratégiques de la SNEDD sont présentés ci-dessous.
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

  /* One body size for both columns (avoids 0.9rem vs 0.890rem mismatch, esp. landscape) */
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

  /* Phone / small tablet landscape: width can exceed 768px but two columns stay cramped */
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

  /* Short landscape viewports: body <p> matches the 0.85rem callout ("Les 5 axes…", etc.) */
  @media (orientation: landscape) and (max-height: 720px) and (max-width: 1200px) {
    .intro-col p {
      font-size: 0.85rem;
      line-height: 1.6;
    }
  }
</style>