<script lang="ts">
    import { lightbox, closeLightbox } from '$lib/stores/lightbox';
    import { onMount } from 'svelte';

    let selectedImage = null;
    $: selectedImage = $lightbox;

    // Close lightbox when pressing "Escape"
    onMount(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeLightbox();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });
</script>

{#if selectedImage}
    <!-- Lightbox Background (Improved Accessibility) -->
    <div 
        class="fixed inset-0 bg-[#000000d8] backdrop-blur-lg flex justify-center items-center z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
    >
        <!-- Lightbox Content (Auto-focus) -->
        <!-- svelte-ignore a11y-autofocus -->
        <div class="relative p-4 max-w-full max-h-full" autofocus>
            <img src={selectedImage.url} alt="Artwork" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-lg" />

            <!-- Close Button (Now Properly Interactive) -->
            <button 
                class="absolute top-2 right-2 text-white text-3xl focus:outline-none"
                on:click={closeLightbox}
                aria-label="Fermer la boîte de dialogue"
            >
                &times;
            </button>
        </div>
    </div>
{/if}
