<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { writable } from 'svelte/store';

	const navData = $page.data.nav.data;
	let isOpen = writable(false); // Mobile menu toggle state

	function toggleMenu() {
		isOpen.update((n) => !n);
	}

	function closeMenu() {
		isOpen.set(false);
	}
</script>

<!-- Navigation Bar -->
<nav
	class="fixed top-0 left-0 w-full h-22 flex justify-between items-center px-6 md:px-20 bg-[#ffffffcf] backdrop-blur-lg shadow-md z-50 uppercase"
>
	<!-- Logo -->
	<a href="/" class="w-24 h-fit overflow-hidden">
		<PrismicImage field={navData.logo} class="w-28 h-auto" />
	</a>

	<!-- Desktop Navigation -->
	<div class="hidden h-full lg:flex items-center space-x-6 text-md font-bold tracking-wider">
		{#each navData.lien as lien}
			<PrismicLink
				field={lien}
				class="relative h-full flex items-center text-black hover:text-pink-400 transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-pink-400 after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
			/>
		{/each}
	{#each navData.social_media as link (link.key)}
		<PrismicLink
			field="{link}"
			target="_blank"
			class="text-black hover:text-pink-400 transition-colors duration-200 pl-6"
		>
			<Icon icon={link.text} width="24" height="24" />
		</PrismicLink>
	{/each}
	</div>
	<!-- Mobile Hamburger Button -->
	<button
		class="lg:hidden focus:outline-none active:text-pink-400 transition-colors duration-200"
		on:click={toggleMenu}
	>
		<svg
			class="w-8 h-8"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
		</svg>
	</button>
</nav>

<!-- Mobile Slide-in Menu (Takes up half the screen width on md screens) -->
<div
	class="fixed top-0 right-0 w-64 md:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 p-6 flex flex-col space-y-6 text-lg font-bold tracking-wider z-50"
	class:translate-x-full={!$isOpen}
>
	<!-- Close Button -->
	<button
		class="self-end text-black focus:outline-none active:text-pink-400 transition-colors duration-200"
		on:click={closeMenu}
	>
		<svg
			class="w-8 h-8"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
		</svg>
	</button>

	<!-- Mobile Navigation Links -->
	{#each navData.lien as lien}
		<PrismicLink
			on:click={toggleMenu}
			field={lien}
			class="block text-black active:text-pink-400 transition-colors duration-200 uppercase"
		/>
	{/each}
	{#each navData.social_media as link (link.key)}
		<PrismicLink
			field="{link}"
			target="_blank"
			class="text-black hover:text-pink-400 transition-colors duration-200"
		>
			<Icon icon={link.text} width="24" height="24" />
		</PrismicLink>
	{/each}
</div>
