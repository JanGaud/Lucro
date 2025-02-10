<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { page } from '$app/stores';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	export let slice: Content.ShowcaseSlice;

	let oeuvres = $page.data.oeuvres;
</script>

<section
	class="px-4 md:px-16 lg:px-38 py-10"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div
		class="w-full flex gap-4 flex-col justify-center items-center md:flex-row md:justify-between mb-14"
	>
		<h2 class="text-5xl md:text-6xl">{slice.primary.titre}</h2>
		<PrismicLink field={slice.primary.more}>
			<button class="btn-effect border-2 border-black bg-[#ffffffcf] backdrop-blur-lg text-black">
				<span>{slice.primary.more.text || 'Click Me'}</span>
			</button>
		</PrismicLink>
	</div>
	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6">
		{#each oeuvres as oeuvre}
			<div
				class="relative group overflow-hidden aspect-square shadow-md flex items-center justify-center"
			>
				<PrismicImage
					field={oeuvre.data.image}
					class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
				/>

				<!-- Black Overlay on Hover -->
				<div
					class="absolute text-center inset-0 bg-[#000000b7] backdrop-blur-md bg-opacity-70 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4"
				>
					<h3 class="text-2xl tracking-wider font-semibold pb-2">{oeuvre.data.titre}</h3>
					<p class="text-lg">{oeuvre.data.dimensions}</p>
					<p class="text-md">{oeuvre.data.type?.uid}</p>

					{#if oeuvre.data.vendue}
						<span
							class="mt-2 inline-block px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full"
						>
							Vendue
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>
