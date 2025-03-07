<script>
  import { onMount } from 'svelte';
  import { SliceZone } from '@prismicio/svelte';
  import { components } from '$lib/slices';

  export let data;

  let jsonLd = '';

  onMount(() => {
    const protocol = window.location.protocol.replace(':', '');
    const host = window.location.host;
    jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sainte-Julie"
      },
      "email": "mailto:lrochon661@gmail.com",
      "jobTitle": "Artiste peintre",
      "name": "Lucie Rochon",
      "telephone": "(514) 592-7695",
      "url": `${protocol}://${host}`
    });
  });
</script>


<svelte:head>
  <script type="application/ld+json">
    {@html jsonLd}
  </script>
</svelte:head>

<SliceZone slices={data.page.data.slices} {components} />
