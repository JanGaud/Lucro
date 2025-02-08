<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import { PrismicLink } from '@prismicio/svelte';

	export let slice: Content.HeaderSlice;
</script>

<section
	class="w-full h-[500px] mt-20 relative flex items-center justify-center bg-black text-white"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<!-- Grid Background -->
	<div class="grid grid-cols-3 w-full h-full absolute inset-0">
		<div class="relative overflow-hidden opacity-30 hover:opacity-75 transition-opacity duration-200">
			<PrismicImage field={slice.primary.image_1} class="w-full h-full object-cover object-center" />
		</div>
		<div class="relative overflow-hidden opacity-30 hover:opacity-75 transition-opacity duration-200">
			<PrismicImage field={slice.primary.image_2} class="w-full h-full object-cover object-center" />
		</div>
		<div class="relative overflow-hidden opacity-30 hover:opacity-75 transition-opacity duration-200">
			<PrismicImage field={slice.primary.image_3} class="w-full h-full object-cover object-center" />
		</div>
	</div>

	<!-- Text Content -->
	<div
		class="z-10 text-center space-y-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
		 px-4 sm:px-8 md:px-12 lg:px-16 w-full max-w-screen-lg pointer-events-none"
	>
		<h1 class="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider shadow-lg">{slice.primary.titre}</h1>
		<h2 class="text-3xl md:text-5xl lg:text-7xl shadow-lg">{slice.primary.sous_titre}</h2>
		<p class="text-xl lg:text-2xl">{slice.primary.slogan}</p>
		<div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 pt-8 pointer-events-auto">
			{#each slice.primary.btn as link (link.key)}
				<PrismicLink
					class="border-2 py-2 px-4 border-black bg-white text-black rounded-3xl uppercase"
					field={link}
				/>
			{/each}
		</div>
	</div>
</section>
