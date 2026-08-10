<svelte:head>
  <link rel="preload" href="/isometric.webp" as="image" type="image/svg+xml">
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import '$lib/styles/global.css';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import ChatWidget from '$lib/components/chat/ChatWidget.svelte';
  import { locale } from '$lib/i18n';

  injectAnalytics({ mode: dev ? 'development' : 'production' });
  injectSpeedInsights();

  onMount(() => {
    document.documentElement.lang = $locale;
  });
</script>

    <Header />
    <slot />
    <Footer />
    <ChatWidget />