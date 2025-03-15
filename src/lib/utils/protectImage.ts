// src/lib/utils/protectImage.ts

/**
 * Protects an image element by disabling context menu and drag actions and
 * overlaying an 'X' when attempts are made to save the image.
 * @param {HTMLElement} element - The HTML element to protect.
 */
export function protectImage(element: HTMLElement): void {
    element.classList.add('image-container');

    function showOverlay(): void {
        element.classList.add('disable-saving');
        setTimeout(() => element.classList.remove('disable-saving'), 2000);
    }

    element.addEventListener('contextmenu', (event: MouseEvent) => {
        event.preventDefault();
        showOverlay();
    });

    element.addEventListener('dragstart', (event: DragEvent) => {
        event.preventDefault();
        showOverlay();
    });
}
