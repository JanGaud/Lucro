<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import Label from './Label.svelte';
	import { page } from '$app/state';

	export let slice: Content.RichTextSlice;
</script>

<section class="mt-10 px-6 md:px-16 lg:px-38 py-22 md:py-26 text-balance">
	<h1 class="text-5xl md:text-6xl text-center mb-10">{page.data.title}</h1>
	<div class="relative">
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
		<PrismicRichText
			field={slice.primary.content}
			components={{
				label: Label
			}}
		/>
	</div>
</section>
