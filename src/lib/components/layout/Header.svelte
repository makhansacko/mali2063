<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import LanguageToggle from './LanguageToggle.svelte';

  $: navLinks = [
    { href: '/', label: $t('nav.vision') },
    { href: '/indicateurs', label: $t('nav.indicators') }
  ];

  function isNavActive(href: string, pathname: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }
</script>

<header>
  <div class="container header-inner">

    <!-- LOGO -->
    <a href="/" class="logo">
      <img src="/logo3.png" alt="mali2063" class="logo-img" />
      <span class="logo-text"></span>
    </a>

    <!-- NAV -->
    <nav>
      {#each navLinks as link}
        <a
          href={link.href}
          class="nav-link"
          class:active={isNavActive(link.href, $page.url.pathname)}
        >
          {link.label}
        </a>
      {/each}
    </nav>

  </div>

  <div class="lang-toggle-slot">
    <LanguageToggle />
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: white;
    border-bottom: 1px solid rgba(115, 101, 85, 0.1);
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
  }

  .lang-toggle-slot {
    position: absolute;
    top: 0;
    right: 2rem;
    height: 4rem;
    display: flex;
    align-items: center;
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding-right: 4.5rem;
  }

  /* --- LOGO --- */
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    flex-shrink: 0;
  }

  .logo-img {
    height: 150px;
    width: auto;
  }

  .logo-text {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-night);
    letter-spacing: 0.05em;
  }

  /* --- NAV --- */
  nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link {
    font-family: var(--font-mono);
    font-size: 0.785rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--color-brown);
    text-decoration: none;
    padding: 0.4rem 0.75rem;
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: var(--color-night);
  }

  .nav-link.active {
    color: var(--color-blue-deep);
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .header-inner {
      padding: 0 1rem;
      padding-right: 4.5rem;
    }
  }

  @media (max-width: 520px) {
    .lang-toggle-slot {
      right: 1rem;
    }
  }
</style>
