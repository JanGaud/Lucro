<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import "../app.css";
	import Navigation from '$lib/components/Navigation.svelte';

	console.log($page);
</script>

<svelte:head>
	{#if $page.data}
		<title>{$page.data.meta_title || 'Default Title'}</title>

		{#if $page.data.meta_description}
			<meta name="description" content="{$page.data.meta_description}" />
		{/if}

		{#if $page.data.meta_title}
			<meta name="og:title" content="{$page.data.meta_title}" />
		{/if}

		{#if $page.data.meta_image}
			<meta name="og:image" content="{$page.data.meta_image}" />
			<meta name="twitter:card" content="summary_large_image" />
		{/if}
	{/if}
</svelte:head>

<Navigation />
<main class="">
	<slot />
</main>
<PrismicPreview {repositoryName} />
