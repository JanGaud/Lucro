<script>
    export let message = '';
    export let show = false;

    // Auto-hide the popup after a few seconds
    $: if (show) {
        setTimeout(() => {
            show = false;
        }, 3000); // Display the popup for 3 seconds
    }
</script>

{#if show}
    <div class={`fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-4 border border-black rounded-lg shadow-lg text-center text-sm md:text-lg z-50 ${show ? 'show' : 'hidden'}`}>
        {message}
    </div>
{/if}


<style>
    .show {
        visibility: visible; 
    }
</style>