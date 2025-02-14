import { writable } from 'svelte/store';

export const lightbox = writable<{ url: string; width: number; height: number } | null>(null);

export function openLightbox(image: { url: string; dimensions: { width: number; height: number } }) {
    if (image?.url) {
        console.log('Image clicked, opening lightbox:', image.url);
        lightbox.set({
            url: image.url,
            width: image.dimensions.width,
            height: image.dimensions.height
        });
    } else {
        console.warn('Image data is invalid:', image);
    }
}

export function closeLightbox() {
    console.log('Closing lightbox');
    lightbox.set(null);
}
