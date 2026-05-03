<section class="isometric-section" id="isometric">
  <div class="isometric-inner">
    <div class="isometric-visual">
      <img
        src="/isometric.webp"
        alt="Vision Mali 2063 — illustration isométrique"
        class="isometric-img"
      />
      <!-- Bouton Contribuer (désactivé)
      <a href="/construire" class="isometric-btn">
        <span class="btn-text">
          Contribuer à l'illustration
          <span class="btn-arrow" aria-hidden="true">→</span>
        </span>
        <span class="btn-scan" aria-hidden="true"></span>
      </a>
      -->
    </div>
  </div>
</section>

<style>
  .isometric-section {
    background: white;
    padding: 0;
    overflow: hidden;
    scroll-margin-top: 5rem;
  }

  .isometric-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
  }

  .isometric-visual {
    position: relative;
    width: 100%;
    animation: float 5s ease-in-out infinite;
  }

  .isometric-img {
    width: 100%;
    height: auto;
    display: block;
    margin-top: -35%
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  /* Bouton Contribuer (désactivé avec le markup)
  .isometric-btn {
    position: absolute;
    bottom: 10.75rem;
    right: 0rem;
    z-index: 2;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    color: white;
    background: var(--color-blue-deep);
    padding: 0.8rem 1.75rem;
    display: inline-block;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    transition: background 0.2s, box-shadow 0.25s ease, transform 0.25s ease;
  }

  .isometric-btn:hover {
    background: var(--color-night);
    box-shadow: 0 8px 24px rgba(48, 88, 140, 0.35);
    transform: translateY(-2px);
  }

  .btn-text {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 0.35em;
  }

  .btn-arrow {
    display: inline-block;
    animation: arrowNudge 1.35s ease-in-out infinite;
  }

  @keyframes arrowNudge {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(6px); }
  }

  .isometric-btn:hover .btn-arrow {
    animation-duration: 0.75s;
  }

  .btn-scan {
    position: absolute;
    top: 0;
    left: -60%;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.15) 50%,
      transparent 100%
    );
    z-index: 1;
    pointer-events: none;
    transform: skewX(-15deg);
    animation: btnScanSweep 6s ease-in-out infinite;
  }

  @keyframes btnScanSweep {
    0%,
    12% {
      transform: skewX(-15deg) translateX(0);
    }
    35% {
      transform: skewX(-15deg) translateX(420%);
    }
    100% {
      transform: skewX(-15deg) translateX(420%);
    }
  }

  @media (max-width: 600px) {
    .isometric-btn {
      bottom: 1.75rem;
      right: 0.75rem;
      padding: 0.65rem 1.1rem;
      font-size: 0.62rem;
    }
  }
  */
</style>
