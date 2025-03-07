import { asText } from '@prismicio/client';
import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies }: { fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, cookies: any }) {
	const client = createClient({ fetch, cookies });

	// Fetch the page, navigation, types, and oeuvres
	const page = await client.getByUID('page', 'accueil');
	const oeuvreTypes = await client.getAllByType('oeuvres_type');
	const selectionSlice = page.data.slices.find((slice) => slice.slice_type === 'showcase');
	const oeuvreIDs = selectionSlice?.slice_type === 'showcase' ? selectionSlice.primary.selection.map((item) => item.selection.id) : [];

	let oeuvres: any[] = [];

	if (oeuvreIDs.length > 0) {
		const oeuvresQuery = await client.getByIDs(oeuvreIDs);
		oeuvres = oeuvresQuery.results;
	}

	// Map types by their ID for quick lookup
	const typesById: { [key: string]: any } = oeuvreTypes.reduce((acc: { [key: string]: any }, type: any) => {
		acc[type.id] = type;
		return acc;
	}, {});

	const enrichedOeuvres = oeuvres.map(oeuvre => {
		const typeId = oeuvre.data && oeuvre.data.type ? oeuvre.data.type.id : null; // Correct path to access type ID
		const typeData = typeId ? typesById[typeId] : undefined;

		return {
			...oeuvre,
			typeDetails: typeData ? {
				titre: typeData.data.titre,
				description: typeData.data.description
			} : { titre: "Unknown Type", description: "No description available" }
		};
	});
	

	return {
		page,
		oeuvres: enrichedOeuvres,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}
