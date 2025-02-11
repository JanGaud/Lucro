<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.GallerySlice;
</script>

<section 
class="mt-40"
data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	Placeholder component for {slice.slice_type} (variation: {slice.variation}) Slices
</section>
