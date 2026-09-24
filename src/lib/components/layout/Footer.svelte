<script lang="ts">
  import { locale, t } from '$lib/i18n';
  import { interpolate } from '$lib/i18n/messages';
  import { getAxes } from '$lib/data/vision-i18n';

  const currentYear = new Date().getFullYear();

  $: localizedAxes = getAxes($locale);

  let email = '';
  let subscribed = false;

  async function subscribe() {
    if (!email.trim()) return;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        subscribed = true;
        email = '';
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error('Newsletter error', error);
    }
  }
</script>

<footer>
  <div class="container footer-inner">

    <!-- COLUMN 1 — About -->
    <div class="footer-col">
      <p class="footer-col-title">{$t('footer.aboutTitle')}</p>
      <p class="footer-desc">
        {$t('footer.aboutDesc')}
      </p>
      <div class="footer-powered">
        <p class="footer-powered-label">{$t('footer.poweredBy')}</p>
        <a href="https://sahelanalytics.com" target="_blank" class="footer-logo-link">
          <img src="/logo_sahel.png" alt="Sahel Analytics" class="footer-logo-img" />
        </a>
      </div>
    </div>

    <!-- COLUMN 2 — Navigation -->
    <div class="footer-col">
      <p class="footer-col-title">{$t('footer.navTitle')}</p>
      <ul class="footer-links">
        <li><a href="/">{$t('footer.home')}</a></li>
      </ul>
    </div>

    <!-- COLUMN 3 — Axes -->
    <div class="footer-col">
      <p class="footer-col-title">{$t('footer.axesTitle')}</p>
      <ul class="footer-links">
        {#each localizedAxes as axe}
          <li>
            <a href="/#{axe.id}">
              <span class="axe-dot" style="background: {axe.color}"></span>
              {axe.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <!-- COLUMN 4 — Newsletter + Contact -->
    <div class="footer-col">
      <p class="footer-col-title">{$t('footer.newsletterTitle')}</p>
      {#if subscribed}
        <p class="subscribe-confirm">
          {$t('footer.newsletterConfirm')}
        </p>
      {:else}
        <p class="footer-newsletter-desc">
          {$t('footer.newsletterDesc')}
        </p>
        <div class="footer-subscribe">
          <input
            type="email"
            bind:value={email}
            placeholder={$t('footer.newsletterPlaceholder')}
            class="footer-email-input"
          />
          <button class="footer-subscribe-btn" on:click={subscribe}>
            →
          </button>
        </div>
      {/if}

      <p class="footer-col-title" style="margin-top: 1.5rem;">{$t('footer.contactTitle')}</p>
      <ul class="footer-links">
        <li>
          <a href="mailto:info@sahelanalytics.com">info@sahelanalytics.com</a>
        </li>
      </ul>
    </div>

  </div>

  <!-- BOTTOM BAR -->
  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p class="footer-legal">
        {$t('footer.legal')}
      </p>
      <p class="footer-copy">
        {interpolate($t('footer.copy'), { year: currentYear })}
      </p>
    </div>
  </div>

</footer>

<style>
  footer {
    background: var(--color-night);
    border-top: 1px solid rgba(217, 162, 115, 0.15);
    /* Fill iPhone home-indicator band so body sand doesn’t read as a “gap” under the footer */
    padding-bottom: env(safe-area-inset-bottom, 0px);
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
    margin-bottom: 1.25rem;
  }

  /* --- POWERED BY --- */
  .footer-powered {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-powered-label {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.05em;
    margin: 0;
  }

  .footer-logo-link {
    display: inline-block;
    opacity: 0.85;
    transition: opacity 0.2s;
  }

  .footer-logo-link:hover {
    opacity: 1;
  }

  .footer-logo-img {
    height: 36px;
    width: auto;
    display: block;
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
    color: rgba(255, 255, 255, 0.7);
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

  /* --- NEWSLETTER --- */
  .footer-newsletter-desc {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }

  .footer-subscribe {
    display: flex;
    gap: 0;
    margin-bottom: 0.5rem;
  }

  .footer-email-input {
    flex: 1;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-right: none;
    padding: 0.6rem 0.75rem;
    font-family: var(--font-body);
    font-size: 0.78rem;
    color: white;
    outline: none;
    transition: border-color 0.2s;
  }

  .footer-email-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .footer-email-input:focus {
    border-color: var(--color-sand);
  }

  .footer-subscribe-btn {
    background: var(--color-sand);
    color: var(--color-night);
    border: none;
    padding: 0.6rem 1rem;
    font-weight: 700;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .footer-subscribe-btn:hover {
    background: white;
  }

  .subscribe-confirm {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--color-sand);
    line-height: 1.5;
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
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.05em;
  }

  .footer-copy {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.4);
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
