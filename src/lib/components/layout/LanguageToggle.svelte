<script lang="ts">
  import { locale, setLocale } from '$lib/i18n';
  import { t } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

  function toggleLocale() {
    const next: Locale = $locale === 'fr' ? 'en' : 'fr';
    setLocale(next, { persist: true });
  }
</script>

<button
  type="button"
  class="lang-toggle"
  on:click={toggleLocale}
  aria-label={$t('lang.switchAria')}
  title={$t('lang.switchAria')}
>
  <span class="lang-current">{$t('lang.current')}</span>
  <span class="lang-separator">|</span>
  <span class="lang-switch">{$t('lang.switch')}</span>
</button>

<style>
  .lang-toggle {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    background: none;
    border: 1px solid rgba(115, 101, 85, 0.2);
    padding: 0.3rem 0.45rem;
    cursor: pointer;
    color: var(--color-brown);
    transition: border-color 0.2s, color 0.2s;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .lang-toggle:hover {
    border-color: var(--color-blue-deep);
    color: var(--color-night);
  }

  .lang-current {
    color: var(--color-blue-deep);
    font-weight: 700;
  }

  .lang-separator {
    margin: 0 0.35rem;
    opacity: 0.35;
  }

  .lang-switch {
    opacity: 0.65;
  }

  @media (min-width: 769px) {
    .lang-toggle {
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      padding: 0.35rem 0.65rem;
    }
  }
</style>
