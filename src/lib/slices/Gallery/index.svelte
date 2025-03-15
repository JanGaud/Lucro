<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { PrismicImage } from '@prismicio/svelte';
	import { openLightbox } from '$lib/stores/lightbox';
	import type { Content } from '@prismicio/client';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let slice: Content.GallerySlice;

	$: pageData = $page?.data ?? {};
	$: oeuvres = pageData?.oeuvres ?? [];
	$: currentPage = pageData?.currentPage ?? 1;
	$: totalPages = pageData?.totalPages ?? 1;

	let hideNav = false;
	let bottomObserver: Element;
	let lastScrollY = 0;
	let scrollingDown = false;

	// Detect when the user reaches the bottom
	function observeBottom() {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						hideNav = true;
					}
				});
			},
			{
				root: null,
				threshold: 0.2, // Adjust as needed
			}
		);

		if (bottomObserver) {
			observer.observe(bottomObserver);
		}
	}

	// Track scroll direction
	function handleScroll() {
		let currentScrollY = window.scrollY;
		scrollingDown = currentScrollY > lastScrollY; // True if scrolling down
		lastScrollY = currentScrollY;

		// Only show nav if scrolling up and not at the bottom
		if (!scrollingDown) {
			hideNav = false;
		}
	}

	onMount(() => {
		observeBottom();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function changePage(pageNumber: number) {
		goto(`?page=${pageNumber}`, { invalidateAll: true });
	}

	function getGridClass(image: { dimensions: { width: any; height: any } }) {
		if (!image?.dimensions) return '';
		const { width, height } = image.dimensions;
		const aspectRatio = width / height;

		if (aspectRatio > 1.5) {
			return 'md:col-span-2 md:row-span-1';
		} else if (aspectRatio < 0.7) {
			return 'md:row-span-2 md:col-span-1';
		} else {
			return 'md:col-span-1 md:row-span-1';
		}
	}

	function pageNumbers(totalPages: number, currentPage: number) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}
</script>

<style>
	/* Hide navigation when at the bottom */
	.nav-hidden {
		transform: translateY(100%);
		opacity: 0;
		pointer-events: none;
		transition: transform 0.3s ease-out, opacity 0.3s ease-out;
	}

	/* Force the nav to stay at the bottom even when browser UI changes */
	.fixed-nav {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0; /* Stick it to the bottom */
		width: 100%;
		z-index: 50;
	}

	@media (max-width: 768px) {
		.fixed-nav {
			bottom: env(safe-area-inset-bottom, 0); /* For iPhones with notch */
		}
	}
</style>

<section class="relative mt-10 px-6 md:px-16 lg:px-38 py-22 md:py-26">
	<h1 class="text-5xl md:text-6xl text-center mb-10">{slice.primary.titre}</h1>

	<!-- Bento Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-24 auto-rows-auto md:auto-rows-[200px] lg:auto-rows-[250px] mb-32">
		{#if oeuvres.length > 0}
			{#each oeuvres as oeuvre}
				<div class={`relative border bg-black shadow-md cursor-pointer ${getGridClass(oeuvre.data.image)}`}
					role="button"
					tabindex="0"
					aria-label="Afficher l’image en plein écran"
					on:click={() => openLightbox(oeuvre.data.image)}
					on:keydown={(event) =>
						(event.key === 'Enter' || event.key === ' ') && openLightbox(oeuvre.data.image)}
				>
					<PrismicImage field={oeuvre.data.image} class="w-full h-auto md:h-full object-cover" />

					<!-- Info Bubble -->
					<div class="absolute border bottom-[-75px] left-4 right-4 bg-[#ffffff56] backdrop-blur-lg text-black p-2 rounded-lg shadow-lg flex flex-col gap-1">
						<h3 class="text-xl tracking-wider font-bold drop-shadow-md">{oeuvre.data.titre}</h3>
						<p class="text-sm drop-shadow-md">{oeuvre.data.dimensions}</p>
						<p class="text-md mt-1 drop-shadow-md">{oeuvre.typeDetails?.titre}</p>

						{#if oeuvre.data.vendue}
							<span class="mt-2 inline-block w-fit px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
								Vendue
							</span>
						{/if}
					</div>
				</div>
			{/each}
		{:else}
			<p class="text-center text-gray-500">Aucune œuvre disponible</p>
		{/if}
	</div>

	<!-- Pagination Navigation Bar -->
	<div class={`fixed-nav flex justify-center py-2 px-4 transition-transform duration-300 ${hideNav ? 'nav-hidden' : ''}`}>
		<div class="w-fit flex justify-between border-2 bg-[#ffffffcf] backdrop-blur-lg shadow-lg rounded-full p-2">
			{#if currentPage > 1}
				<button on:click={() => changePage(currentPage - 1)}
					class="p-4 text-black border shadow hover:bg-pink-200 rounded-full transition">
					<Icon icon="icon-park-outline:left" width="20" height="20" />
				</button>
			{/if}

			{#each pageNumbers(totalPages, currentPage) as page}
				<button class={`px-4 py-2 ${page === currentPage ? 'text-pink-500' : 'text-black'} transition`}
					on:click={() => changePage(page)}>
					{page}
				</button>
			{/each}

			{#if currentPage < totalPages}
				<button on:click={() => changePage(currentPage + 1)}
					class="p-4 text-black border shadow hover:bg-pink-200 rounded-full transition">
					<Icon icon="icon-park-outline:right" width="20" height="20" />
				</button>
			{/if}
		</div>
	</div>

	<!-- Invisible Observer at the bottom -->
	<div bind:this={bottomObserver} class="h-32 w-full"></div>
</section>
