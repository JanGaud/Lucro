<script>
	import { page } from '$app/stores';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';

	const footerData = $page.data.footer.data;
</script>

<!-- component -->
<footer class="w-full flex items-center justify-center bg-white border-t-2 border-gray-600 pt-4">
	<div class="md:w-2/3 w-full px-4 text-black flex flex-col text-center md:text-left">
		<div class="w-full text-6xl md:text-7xl font-bold">
			<h1 class="w-full md:w-2/3">{footerData.slogan}</h1>
		</div>
		<div class="flex mt-8 flex-col md:flex-row md:justify-between">
			<p class="w-full md:w-2/3 text-gray-700">
				{footerData.sous_slogan}
			</p>
			<div class="w-full flex justify-center md:justify-end my-4 pt-6 md:pt-0">
				<PrismicLink field={footerData.btn}>
					<button
						type="submit"
						class="btn-effect border-2 border-black bg-[#ffffffcf] backdrop-blur-lg text-black"
						><span>{footerData.btn.text}</span></button
					>
				</PrismicLink>
			</div>
		</div>
		<div class="flex flex-col pt-10 md:pt-12">
			<div
				class="flex flex-row flex-wrap justify-center md:w-full md:flex-row md:justify-between gap-4 py-4"
			>
				{#each footerData.policy_links as lien}
					<PrismicLink
						field={lien}
						class="block cursor-pointer text-gray-700 hover:text-black uppercase"
					/>
				{/each}
			</div>
			<hr class="border-gray-600" />
			<div class="my-12 flex flex-col items-center md:flex-row md:items-baseline justify-center gap-4">
				<!-- Logo -->
				<a href="/" class="w-24 md:w-20 h-fit overflow-hidden">
					<PrismicImage field={footerData.logo} class="w-28 h-auto" />
				</a>
				<p class="w-full text-center text-gray-700">{footerData.droits}</p>
			</div>
		</div>
	</div>
</footer>
