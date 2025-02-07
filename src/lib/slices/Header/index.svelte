<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.HeaderSlice;
</script>

<section
	class="w-full h-[550px] pt-36 relative flex items-center justify-center bg-black text-white"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<!-- Grid Background -->
	<div class="grid grid-cols-3 w-full h-full absolute inset-0">
		<div
			class="relative overflow-hidden opacity-30 hover:opacity-75 transition-opacity duration-200"
		>
			<PrismicImage field={slice.primary.image_1} class="w-full h-full object-cover" />
		</div>
		<div
			class="relative overflow-hidden opacity-30 hover:opacity-75 transition-opacity duration-200"
		>
			<PrismicImage field={slice.primary.image_2} class="w-full h-full object-cover" />
		</div>
		<div
			class="relative overflow-hidden opacity-30 hover:opacity-75 transition-opacity duration-200"
		>
			<PrismicImage field={slice.primary.image_3} class="w-full h-full object-cover" />
		</div>
	</div>

	<!-- Text Content -->
	<div
		class="z-10 text-center space-y-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
	>
		<h1 class="text-9xl font-bold tracking-wider shadow-lg">{slice.primary.titre}</h1>
		<h2 class="text-7xl shadow-lg">{slice.primary.sous_titre}</h2>
		<p class="text-2xl">{slice.primary.slogan}</p>
		<div class="flex items-center justify-center gap-12 pt-8 pointer-events-auto">
			<button class="border-2 py-2 px-4 border-black bg-white text-black rounded-3xl uppercase">Mes oeuvres</button>
			<button class="border-2 py-2 px-4 border-white bg-black rounded-3xl uppercase">Contactez-moi</button>
		</div>
	</div>
</section>
