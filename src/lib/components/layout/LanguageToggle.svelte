<script lang="ts">
  import { locale, setLocale } from '$lib/i18n';
  import { t } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

  function toggleLocale() {
    const next: Locale = $locale === 'fr' ? 'en' : 'fr';
    setLocale(next);
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
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    background: none;
    border: 1px solid rgba(115, 101, 85, 0.2);
    padding: 0.35rem 0.65rem;
    cursor: pointer;
    color: var(--color-brown);
    transition: border-color 0.2s, color 0.2s;
    flex-shrink: 0;
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
</style>
