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
    <!-- Lightbox Background -->
    <div 
        class="fixed inset-0 bg-[#000000d8] backdrop-blur-lg flex justify-center items-center z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
    >
        <!-- Clickable Overlay (Now a Button) -->
        <button 
            class="absolute inset-0 bg-transparent"
            on:click={closeLightbox}
            aria-label="Fermer la boîte de dialogue"
            type="button"
        ></button>

        <!-- Lightbox Content (Prevents Click Propagation) -->
        <div 
            class="relative p-4 max-w-full max-h-full shadow-2xl"
            role="button"
            on:click|stopPropagation
            on:keydown={(event) => event.key === 'Enter' && event.stopPropagation()}
            tabindex="0"
        >
            <img src={selectedImage.url} alt="Artwork" class="max-w-full max-h-[90vh] pointer-events-none object-contain" />

            <!-- Close Button -->
            <button 
                class="absolute top-0 right-0 text-white active:text-red-600 text-5xl focus:outline-none"
                on:click={closeLightbox}
                aria-label="Fermer la boîte de dialogue"
            >
                &times;
            </button>
        </div>
    </div>
{/if}
