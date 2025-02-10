<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import { PrismicLink } from '@prismicio/svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let slice: Content.HeaderSlice;

	// Active index for mobile carousel
	let activeIndex = writable(0);
	let interval: any;

	const images = [
		slice.primary.image_1,
		slice.primary.image_2,
		slice.primary.image_3
	];

	// Auto-slide every 3 seconds
	onMount(() => {
		interval = setInterval(() => {
			activeIndex.update(n => (n + 1) % images.length);
		}, 3000);

		return () => clearInterval(interval);
	});

	// Function to get button styles
	function getButtonClass(index: number) {
		return index === 1 
			? "btn-effect border-2 border-white bg-[#000000cf] backdrop-blur-lg text-white"
			: "btn-effect border-2 border-black bg-[#ffffffcf] backdrop-blur-lg text-black";
	}
</script>

<section
	class="w-full h-[500px] mt-20 relative flex items-center justify-center bg-black text-white"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<!-- Grid Background (Only visible on lg screens) -->
	<div class="hidden lg:grid grid-cols-3 w-full h-full absolute inset-0">
		{#each images as image (image.id)}
			<div class="relative overflow-hidden opacity-30 hover:opacity-75 transition-opacity duration-200">
				<PrismicImage field={image} class="w-full h-full object-cover object-center" />
			</div>
		{/each}
	</div>

	<!-- Carousel for Mobile -->
	<div class="lg:hidden absolute inset-0 w-full h-full">
		{#each images as image, i (image.id)}
			<PrismicImage
				field={image}
				class="w-full h-full object-cover object-center absolute transition-opacity duration-700 opacity-30 hover:opacity-75"
				style="opacity: {i === $activeIndex ? 0.3 : 0};"
			/>
		{/each}
	</div>

	<!-- Text Content -->
	<div
		class="z-10 text-center space-y-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
		 px-4 sm:px-8 md:px-12 lg:px-16 w-full max-w-screen-lg pointer-events-none"
	>
		<h1 class="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider shadow-lg opacity-80">{slice.primary.titre}</h1>
		<h2 class="text-4xl md:text-5xl lg:text-7xl tracking-wide shadow-lg">{slice.primary.sous_titre}</h2>
		<p class="text-xl lg:text-2xl">{slice.primary.slogan}</p>

		<!-- Buttons with Hover Effect -->
		<div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 pt-8 pointer-events-auto">
			{#each slice.primary.btn as link, i (link.key)}
				<PrismicLink field={link}>
					<button class={getButtonClass(i)}>
						<span>{link.text || 'Click Me'}</span>
					</button>
				</PrismicLink>
			{/each}
		</div>
	</div>
</section>
