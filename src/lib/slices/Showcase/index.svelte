<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.ShowcaseSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<span>test</span>
</section>
