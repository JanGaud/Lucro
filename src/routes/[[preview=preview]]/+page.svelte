<script>
  import { onMount } from 'svelte';
  import { SliceZone } from '@prismicio/svelte';
  import { components } from '$lib/slices';

  export let data;

  let protocol = '';
  let host = '';
  let jsonLd = '';

  onMount(() => {
    protocol = window.location.protocol.replace(':', '');
    host = window.location.host;
    jsonLd = `<script type="application/ld+json">{
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
      "url": "${protocol}://${host}/"
    }</scr` + `ipt>`;
  });
</script>

<SliceZone slices={data.page.data.slices} {components} />

{@html jsonLd}
