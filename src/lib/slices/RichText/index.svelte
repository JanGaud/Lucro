<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import Label from './Label.svelte';
	import { page } from '$app/stores';

	export let slice: Content.RichTextSlice;
</script>

<section class="mt-10 px-6 md:px-16 lg:px-38 py-22 md:py-26 text-balance">
	<h1 class="text-5xl md:text-6xl text-center mb-10">{$page.data.title}</h1>
	<PrismicRichText
		field={slice.primary.content}
		components={{
			label: Label
		}}
	/>
</section>

