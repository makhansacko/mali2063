<svelte:head>
  <link rel="preload" href="/isometric.webp" as="image" type="image/svg+xml">
</svelte:head>

<script>
  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import '$lib/styles/global.css';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import ChatWidget from '$lib/components/chat/ChatWidget.svelte';
  

  injectAnalytics({ mode: dev ? 'development' : 'production' });
  injectSpeedInsights();
</script>

    <Header />
    <slot />
    <Footer />
    <ChatWidget />