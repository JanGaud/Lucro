<script>
	import { SliceZone } from '@prismicio/svelte';
	import { page } from '$app/stores';
	import { components } from '$lib/slices';

	export let data;
</script>

<SliceZone slices={data.page.data.slices} {components} />
