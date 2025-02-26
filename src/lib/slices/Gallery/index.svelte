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

<section class="mt-10 px-6 md:px-16 lg:px-38 py-22 md:py-26">
	<h1 class="text-5xl md:text-6xl text-center mb-10">{slice.primary.titre}</h1>
	<!-- Bento Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-24 auto-rows-auto md:auto-rows-[200px] lg:auto-rows-[250px] mb-32">
		{#if oeuvres.length > 0}
			{#each oeuvres as oeuvre}
				<!-- Image Container with Adaptive Grid Span -->
				<div
					class={`relative border bg-black shadow-md cursor-pointer ${getGridClass(oeuvre.data.image)}`}
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
						class="w-full h-auto md:h-full object-cover"
					/>

					<!-- Info Bubble positioned just below and overlapping the image -->
					<div
						class="absolute border bottom-[-75px] left-4 right-4 bg-[#ffffff56] backdrop-blur-lg text-black p-2 rounded-lg shadow-lg flex flex-col gap-1"
					>
						<h3 class="text-xl tracking-wider font-bold drop-shadow-md">
							{oeuvre.data.titre}
						</h3>
						<p class="text-sm drop-shadow-md">{oeuvre.data.dimensions}</p>
						<p class="text-md mt-1 drop-shadow-md">{oeuvre.data.type?.uid}</p>

						{#if oeuvre.data.vendue}
							<span class="mt-2 inline-block w-fit px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
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
	<div class="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
		{#if currentPage > 1}
			<button
				on:click={() => changePage(currentPage - 1)}
				class="px-6 py-2 bg-pink-300 text-black shadow border hover:bg-pink-400 rounded-full transition"
			>
				← Page précédente
			</button>
		{/if}

		<p class="text-gray-700 font-medium">
			Page {currentPage} sur {totalPages}
		</p>

		{#if currentPage < totalPages}
			<button
				on:click={() => changePage(currentPage + 1)}
				class="px-6 py-2 bg-pink-300 text-black shadow border hover:bg-pink-400 rounded-full transition"
			>
				Page suivante →
			</button>
		{/if}
	</div>
</section>
