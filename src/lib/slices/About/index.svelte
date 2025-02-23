<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.AboutSlice;
</script>

<section
	class="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-1 items-center gap-8 lg:gap-12 px-6 md:px-16 lg:px-38 py-20 lg:py-36"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<!-- Text Content -->
	<div class="text-center lg:text-left">
		<hgroup class="space-y-4">
			<h2 class="text-5xl md:text-6xl">{slice.primary.titre}</h2>
			<h3 class="text-3xl md:text-4xl">{slice.primary.sous_titre}</h3>
		</hgroup>
		<p class="pt-8 text-lg">{slice.primary.description}</p>
	</div>

	<!-- Image Container (Aligned to Bottom) -->
	<div class="relative w-full h-auto flex items-end justify-center border border-gray-700 shadow">
		<!-- Background Color Blobs -->
		<div class="absolute inset-0 flex justify-center items-center -z-10">
			<div
				class="absolute -top-10 -left-16 w-56 h-56 rounded-full bg-pink-400 filter blur-3xl opacity-80 mix-blend-multiply shape"
			></div>
			<div
				class="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-yellow-400 filter blur-3xl opacity-80 mix-blend-multiply shape animation-delay-2000"
			></div>
			<div
				class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-56 h-56 rounded-full bg-violet-400 filter blur-3xl opacity-80 mix-blend-multiply shape animation-delay-4000"
			></div>
		</div>

		<!-- Image -->
		<div class="relative w-full z-10 self-end bg-[#ffffffa7] backdrop-blur">
			<PrismicImage field={slice.primary.portrait} class="w-full h-auto" />
		</div>
	</div>
</section>
