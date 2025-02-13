<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { PrismicImage } from '@prismicio/svelte';

	// Ensure page data is correctly initialized
	$: pageData = $page?.data ?? {};  
	$: oeuvres = pageData?.oeuvres ?? [];
	$: currentPage = pageData?.currentPage ?? 1;
	$: totalPages = pageData?.totalPages ?? 1;

	// Function to navigate pages
	function changePage(pageNumber: number) {
		goto(`?page=${pageNumber}`, { invalidateAll: true });
	}

	// Function to determine grid span classes based on image aspect ratio
	function getGridClass(image: { dimensions: { width: any; height: any; }; }) {
		if (!image?.dimensions) return ''; // Ensure dimensions exist
		const { width, height } = image.dimensions;
		const aspectRatio = width / height;

		if (aspectRatio > 1.5) {
			return 'col-span-2 row-span-1'; // Wide images span 2 columns
		} else if (aspectRatio < 0.7) {
			return 'row-span-2 col-span-1'; // Tall images span 2 rows
		} else {
			return 'col-span-1 row-span-1'; // Square images stay default
		}
	}
</script>

<section class="mt-20 px-6 md:px-16 lg:px-38 py-20 lg:py-36">
	<!-- Bento Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[150px] md:auto-rows-[200px] lg:auto-rows-[250px] grid-auto-flow-dense">
		{#if oeuvres.length > 0}
			{#each oeuvres as oeuvre}
				<!-- Image Container with Adaptive Grid Span -->
				<div class={`relative border overflow-hidden shadow-md ${getGridClass(oeuvre.data.image)}`}>
					<!-- Image -->
					<PrismicImage 
						field={oeuvre.data.image} 
						class="w-full h-full object-cover"
					/>

					<!-- Gradient Overlay (Hidden on Hover) -->
					<div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 transition-opacity duration-300 opacity-100 hover:opacity-0">
						<h2 class="text-lg lg:text-2xl tracking-wider font-bold drop-shadow-md">{oeuvre.data.titre}</h2>
						<p class="text-sm drop-shadow-md">{oeuvre.data.dimensions}</p>
						<p class="text-md mt-1 drop-shadow-md">{oeuvre.data.vendue ? "Vendue" : "Disponible"}</p>
					</div>
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
