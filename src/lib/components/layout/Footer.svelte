<script lang="ts">
    import { axes } from '$lib/data/vision';
  
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer>
    <div class="container footer-inner">
  
      <!-- COLUMN 1 — About -->
      <div class="footer-col">
        <p class="footer-col-title">Mali 2063</p>
        <p class="footer-desc">
          Une lecture indépendante de la Vision Mali Kura 2063 - 
          pour les citoyens, la diaspora, la société civile et le secteur privé.
        </p>
        <p class="footer-powered">
          Powered by <a href="https://sahelanalytics.com" target="_blank">Sahel Analytics</a>
        </p>
        <p class="footer-logo">
          <a href="https://sahelanalytics.com" target="_blank" class="footer-logo-link">
            <img src="/logo_sahel.png" alt="Sahel Analytics" class="footer-logo" />
          </a>
        </p>
      </div>
  
      <!-- COLUMN 2 — Navigation -->
      <div class="footer-col">
        <p class="footer-col-title">Navigation</p>
        <ul class="footer-links">
          <li>
            <a href="/">La Vision</a>
          </li>
        </ul>
      </div>
  
      <!-- COLUMN 3 — Axes -->
      <div class="footer-col">
        <p class="footer-col-title">Les 5 Axes (SNEDD 2024–2033)</p>
        <ul class="footer-links">
          {#each axes as axe}
            <li>
              <a href="/#{axe.id}">
                <span class="axe-dot" style="background: {axe.color}"></span>
                {axe.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
  
      <!-- COLUMN 4 — Contact -->
      <div class="footer-col">
        <p class="footer-col-title">Contact</p>
        <ul class="footer-links">
          <!--<li><a href="/apropos">À Propos</a></li>-->
         <li><a href="mailto:info@msahelanalytics.com">info@sahelanalytics.com</a></li>
          <!--<li>
            <a href="https://github.com/makhansacko/mali2063" target="_blank">
              GitHub - Code source
            </a>
          </li>-->
        </ul>
      </div>
  
    </div>
  
    <!-- BOTTOM BAR -->
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p class="footer-legal">
          Plateforme indépendante. Non affiliée au Gouvernement du Mali.
        </p>
        <p class="footer-copy">
          © {currentYear} Sahel Analytics · Licence GPL v3 · Open Source
        </p>
      </div>
    </div>
  
  </footer>
  
  <style>
    footer {
      background: var(--color-night);
      border-top: 1px solid rgba(217, 162, 115, 0.15);
    }
  
    .footer-inner {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1.5fr 1fr;
      gap: 3rem;
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
  
    /* --- COLUMNS --- */
    .footer-col-title {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-sand);
      margin-bottom: 1.25rem;
    }
  
    .footer-desc {
      font-size: 0.85rem;
      color: white;
      line-height: 1.7;
      margin-bottom: 1rem;
    }
  
    .footer-powered {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: white;
      letter-spacing: 0.05em;
    }
  
    .footer-powered a {
      color: var(--color-sand);
      text-decoration: none;
      transition: color 0.2s;
    }
  
    .footer-powered a:hover {
      color: white;
    }

    .footer-logo {
      height: 70px;
      width: auto;
      display: block;
      padding-top: 1rem;
    }

    .footer-logo-link {
      display: inline-block;
      opacity: 0.85;
      transition: opacity 0.2s;
    }
    
  
    /* --- LINKS --- */
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
  
    .footer-links a {
      font-size: 0.82rem;
      color: white;
      text-decoration: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  
    .footer-links a:hover {
      color: var(--color-sand);
    }
  
    .axe-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
      display: inline-block;
    }
  
    /* --- BOTTOM BAR --- */
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
  
    .footer-bottom-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
      gap: 1rem;
    }
  
    .footer-legal {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: white;
      letter-spacing: 0.05em;
    }
  
    .footer-copy {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: white;
      letter-spacing: 0.05em;
    }
  
    /* --- RESPONSIVE --- */
    @media (max-width: 900px) {
      .footer-inner {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
    }
  
    @media (max-width: 600px) {
      .footer-inner {
        grid-template-columns: 1fr;
      }
  
      .footer-bottom-inner {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  </style>