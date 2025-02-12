import { asText } from '@prismicio/client';
import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies }: { fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, cookies: any }) {
	const client = createClient({ fetch, cookies });

	// Fetch the page and navigation
	const page = await client.getByUID('page', 'accueil');
	const nav = await client.getSingle('navigation');

	// Extract œuvre IDs from the slice (assuming they are stored in a `selection` array)
	const selectionSlice = page.data.slices.find((slice) => slice.slice_type === 'showcase');

	const oeuvreIDs = selectionSlice?.slice_type === 'showcase' ? selectionSlice.primary.selection.map((item) => item.selection.id) : [];

	let oeuvres;

	if (oeuvreIDs.length > 0) {
		// Fetch only the selected œuvres
		const oeuvresQuery = await client.getByIDs(oeuvreIDs);
		oeuvres = oeuvresQuery.results;
	}

	return {
		page,
		nav,
		oeuvres,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image?.url
	};
}