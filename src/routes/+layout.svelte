<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	injectAnalytics();
</script>

<svelte:head>
	<link rel="canonical" href={$page.url.toString()} />
	{#if $page.data}
		<title>{$page.data.meta_title || 'Default Title'}</title>

		{#if $page.data.meta_description}
			<meta name="description" content={$page.data.meta_description} />
		{/if}

		{#if $page.data.meta_title}
			<meta name="og:title" content={$page.data.meta_title} />
		{/if}

		{#if $page.data.meta_image}
			<meta name="og:image" content={$page.data.meta_image} />
			<meta name="twitter:card" content={$page.data.meta_image} />
		{/if}
	{/if}
</svelte:head>

<Navigation />
<main class="max-w-screen-2xl mx-auto overflow-hidden">
	<slot />
	<Lightbox />
</main>
<Footer />
<PrismicPreview {repositoryName} />
