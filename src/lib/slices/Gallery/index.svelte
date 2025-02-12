<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { PrismicImage } from '@prismicio/svelte';

	// Use optional chaining to avoid errors if $page is undefined
	$: pageData = $page?.data ?? {};  
	$: oeuvres = pageData?.oeuvres ?? [];
	$: currentPage = pageData?.currentPage ?? 1;
	$: totalPages = pageData?.totalPages ?? 1;

	// Function to navigate pages
	function changePage(pageNumber: number) {
		goto(`?page=${pageNumber}`, { invalidateAll: true });
	}
</script>

<section class="mt-40 px-6 md:px-16 lg:px-38 py-20 lg:py-36">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#if oeuvres.length > 0}
			{#each oeuvres as oeuvre}
				<div class="border p-4 rounded-lg shadow-lg">
					<h2 class="text-xl font-bold">{oeuvre.data.titre}</h2>
					<PrismicImage field={oeuvre.data.image} class="w-full h-auto rounded-lg mt-2"/>
					<p class="text-sm text-gray-600">{oeuvre.data.dimensions}</p>
					<p class="text-md mt-2">{oeuvre.data.vendue ? "Vendue" : "Disponible"}</p>
				</div>
			{/each}
		{:else}
			<p class="text-center text-gray-500">Aucune œuvre disponible</p>
		{/if}
	</div>

	<!-- Pagination Controls -->
	<div class="mt-6 flex justify-center space-x-4">
		{#if currentPage > 1}
			<button on:click={() => changePage(currentPage - 1)} class="px-4 py-2 bg-gray-200 rounded">
				← Page précédente
			</button>
		{/if}

		<p>Page {currentPage} sur {totalPages}</p>

		{#if currentPage < totalPages}
			<button on:click={() => changePage(currentPage + 1)} class="px-4 py-2 bg-gray-200 rounded">
				Page suivante →
			</button>
		{/if}
	</div>
</section>
