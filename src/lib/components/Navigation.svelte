<script>
    import { page } from '$app/stores';
    import { PrismicImage, PrismicLink } from '@prismicio/svelte';
    import { writable } from 'svelte/store';

    const navData = $page.data.nav.data;
    let isOpen = writable(false); // Mobile menu toggle state

    function toggleMenu() {
        isOpen.update(n => !n);
    }

    function closeMenu() {
        isOpen.set(false);
    }
</script>

<!-- Navigation Bar -->
<nav class="fixed top-0 left-0 w-full h-22 flex justify-between items-center px-6 md:px-20 bg-[#ffffffcf] backdrop-blur-lg shadow-md z-50 uppercase">
    <!-- Logo -->
    <div class="w-24 h-fit overflow-hidden">
        <PrismicImage field={navData.logo} class="w-28 h-auto" />
    </div>

    <!-- Desktop Navigation -->
    <div class="hidden lg:flex space-x-6 text-md font-bold tracking-wider">
        {#each navData.lien as lien}
            <PrismicLink field={lien} class="hover:text-gray-700 transition-colors duration-200" />
        {/each}
    </div>

    <!-- Mobile Hamburger Button -->
    <button class="lg:hidden focus:outline-none" on:click={toggleMenu}>
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
    </button>
</nav>

<!-- Mobile Slide-in Menu (Takes up half the screen width on md screens) -->
<div class="fixed top-0 right-0 w-64 md:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 p-6 flex flex-col space-y-6 text-lg font-bold tracking-wider z-50"
    class:translate-x-full={!$isOpen}>
    
    <!-- Close Button -->
    <button class="self-end text-black focus:outline-none" on:click={closeMenu}>
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>

    <!-- Mobile Navigation Links -->
    {#each navData.lien as lien}
        <PrismicLink field={lien} class="block text-black hover:text-gray-700 transition-colors duration-200" />
    {/each}
</div>
