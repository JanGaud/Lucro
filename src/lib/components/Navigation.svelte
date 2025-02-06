<script>
    import { page } from '$app/stores';
    import { PrismicImage, PrismicLink } from '@prismicio/svelte';

    const navData = $page.data.nav.data;
</script>

<nav class="fixed top-0 left-0 w-full flex justify-between items-center px-20 bg-[#ffffffcf] backdrop-blur-lg shadow-sm z-50 border-b-2 border-black">
    <div class="w-24 h-fit overflow-hidden">
        <PrismicImage field={navData.logo} class="w-28 h-auto" />
    </div>
    <div class="flex space-x-6 text-md font-bold tracking-wider">
        {#each navData.lien as lien}
            <PrismicLink field={lien} />
        {/each}
    </div>
</nav>