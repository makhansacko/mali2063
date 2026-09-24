<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import LanguageToggle from './LanguageToggle.svelte';

  $: navLinks = [
    { href: '/', label: $t('nav.vision') }
  ];

  function isNavActive(href: string, pathname: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }
</script>

<header>
  <div class="container header-inner">

    <a href="/" class="logo">
      <img src="/logo3.png" alt="mali2063" class="logo-img" />
    </a>

    <div class="header-actions">
      <nav aria-label="Main">
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
      <LanguageToggle />
    </div>

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
    overflow: visible;
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    min-height: 4rem;
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
  }

  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
    min-width: 0;
  }

  .logo-img {
    height: 2.75rem;
    width: auto;
    display: block;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    flex-shrink: 0;
    margin-left: auto;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 0.1rem;
  }

  .nav-link {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--color-brown);
    text-decoration: none;
    padding: 0.35rem 0.45rem;
    white-space: nowrap;
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: var(--color-night);
  }

  .nav-link.active {
    color: var(--color-blue-deep);
    font-weight: 700;
  }

  @media (min-width: 769px) {
    .header-inner {
      min-height: 5rem;
    }

    .logo-img {
      height: 5rem;
    }

    .header-actions {
      gap: 0.5rem;
    }

    nav {
      gap: 0.25rem;
    }

    .nav-link {
      font-size: 0.785rem;
      padding: 0.4rem 0.75rem;
    }
  }

  @media (min-width: 1024px) {
    .header-inner {
      min-height: 6.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .logo-img {
      height: 150px;
    }
  }

  @media (max-width: 400px) {
    .header-inner {
      gap: 0.5rem;
    }

    .header-actions {
      gap: 0.2rem;
    }

    .nav-link {
      font-size: 0.62rem;
      padding: 0.3rem 0.3rem;
      letter-spacing: 0.03em;
    }
  }
</style>
