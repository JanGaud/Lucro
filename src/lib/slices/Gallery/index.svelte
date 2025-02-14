<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { PrismicImage } from '@prismicio/svelte';
	import { openLightbox } from '$lib/stores/lightbox';
	import type { Content } from '@prismicio/client';

	
	export let slice: Content.GallerySlice;

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
	function getGridClass(image: { dimensions: { width: any; height: any } }) {
		if (!image?.dimensions) return '';
		const { width, height } = image.dimensions;
		const aspectRatio = width / height;

		if (aspectRatio > 1.5) {
			return 'md:col-span-2 md:row-span-1';
		} else if (aspectRatio < 0.7) {
			return 'md:row-span-2 md:col-span-1';
		} else {
			return 'md:col-span-1 md:row-span-1';
		}
	}
</script>

<section class="mt-10 px-6 md:px-16 lg:px-38 py-20 lg:py-36">
	<h1 class="text-5xl md:text-6xl text-center mb-10">{slice.primary.titre}</h1>
	<!-- Bento Grid -->
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[200px] lg:auto-rows-[250px]"
	>
		{#if oeuvres.length > 0}
			{#each oeuvres as oeuvre}
				<!-- Image Container with Adaptive Grid Span -->
				<div
					class={`relative border overflow-hidden bg-black shadow-md cursor-pointer ${getGridClass(oeuvre.data.image)}`}
					role="button"
					tabindex="0"
					aria-label="Afficher l’image en plein écran"
					on:click={() => openLightbox(oeuvre.data.image)}
					on:keydown={(event) =>
						(event.key === 'Enter' || event.key === ' ') && openLightbox(oeuvre.data.image)}
				>
					<!-- Image -->
					<PrismicImage
						field={oeuvre.data.image}
						class="w-full h-auto md:h-full object-cover transition-transform duration-300 hover:scale-105"
					/>

					<!-- Gradient Overlay (Now Clickable) -->
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent text-white p-4 flex flex-col justify-end transition-opacity duration-300 opacity-100 hover:opacity-0"
					>
						<h2 class="text-lg lg:text-2xl tracking-wider font-bold drop-shadow-md">
							{oeuvre.data.titre}
						</h2>
						<p class="text-sm drop-shadow-md">{oeuvre.data.dimensions}</p>
						<p class="text-md mt-1 drop-shadow-md">{oeuvre.data.type?.uid}</p>

						{#if oeuvre.data.vendue}
							<span
								class="mt-2 inline-block px-3 py-1 w-fit text-xs font-semibold text-white bg-red-500 rounded-full"
							>
								Vendue
							</span>
						{/if}
					</div>
				</div>
			{/each}
		{:else}
			<p class="text-center text-gray-500">Aucune œuvre disponible</p>
		{/if}
	</div>

	<!-- Pagination Controls -->
	<div class="mt-6 flex flex-col md:flex-row items-center justify-center gap-2">
		{#if currentPage > 1}
			<button
				on:click={() => changePage(currentPage - 1)}
				class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-gray-200 transition"
			>
				← Page précédente
			</button>
		{/if}

		<p class="text-gray-700 font-medium">Page {currentPage} sur {totalPages}</p>

		{#if currentPage < totalPages}
			<button
				on:click={() => changePage(currentPage + 1)}
				class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-gray-200 transition"
			>
				Page suivante →
			</button>
		{/if}
	</div>
</section>
