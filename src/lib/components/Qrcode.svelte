<script lang="ts">
    import { onMount } from 'svelte';
    import QRCode from 'qrcode';

    export let url = 'https://www.lucierochon-lucro.com'; 
    let canvas: HTMLCanvasElement;

    onMount(() => {
        QRCode.toCanvas(canvas, url, {
            errorCorrectionLevel: 'H',
            scale: 10
        }, (error) => {
            if (error) console.error('QR Code generation failed:', error);
            else console.log('QR code generated!');
        });
    });

    function downloadQR() {
        const link = document.createElement('a');
        link.download = 'QRCode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
</script>

<canvas bind:this={canvas}></canvas>
<button on:click={downloadQR}>Download QR Code</button>
