<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { page } from '$app/state';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { openLightbox } from '$lib/stores/lightbox';
	export let slice: Content.ShowcaseSlice;

	let oeuvres = page.data.oeuvres;

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

<section
	class="px-4 md:px-16 lg:px-38 pb-22 md:pb-26"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<!-- Title & Button Row -->
	<div class="w-full flex gap-4 flex-col justify-center items-center md:flex-row md:justify-between mb-14">
		<h2 class="text-5xl md:text-6xl">{slice.primary.titre}</h2>
		<PrismicLink field={slice.primary.more}>
			<button class="btn-effect border-2 border-black bg-[#ffffffcf] backdrop-blur-lg text-black">
				<span>{slice.primary.more.text || 'Click Me'}</span>
			</button>
		</PrismicLink>
	</div>

	<!-- Bento Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-24 auto-rows-auto md:auto-rows-[200px] lg:auto-rows-[250px]">
		{#each oeuvres as oeuvre}
			<!-- Clickable Image Container -->
			<div
				class={`relative border bg-black shadow-md cursor-pointer ${getGridClass(oeuvre.data.image)}`}
				role="button"
				tabindex="0"
				aria-label="Afficher l’image en plein écran"
				on:click={() => openLightbox(oeuvre.data.image)}
				on:keydown={(event) =>
					(event.key === 'Enter' || event.key === ' ') && openLightbox(oeuvre.data.image)
				}
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
					<p class="text-md mt-1 drop-shadow-md">{oeuvre.typeDetails?.titre}</p>

					{#if oeuvre.data.vendue}
						<span class="mt-2 inline-block w-fit px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
							Vendue
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>
