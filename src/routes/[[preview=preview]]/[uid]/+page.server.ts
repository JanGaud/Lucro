import { asText, predicate as prismicPredicate } from '@prismicio/client';
import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch, cookies, url }: {
	params: { uid: string };
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
	cookies: any;
	url: URL;
}) {
	const client = createClient({ fetch, cookies });

	// Get the current page number from the query string safely
	const currentPage = Number(url.searchParams.get('page')) || 1;
	const pageSize = 20;

	try {
		if (!params.uid) {
			throw error(400, "Missing UID parameter");
		}

		const page = await client.getByUID('page', params.uid).catch(err => {
			return null;
		});

		// Fetch oeuvre types and build a map for quick lookup
		const oeuvreTypes = await client.getAllByType('oeuvres_type');
		const oeuvreTypeMap = new Map(oeuvreTypes.map(type => [type.id, type]));

		const oeuvresResponse = await client.get({
			predicates: [prismicPredicate.at('document.type', 'oeuvres')],
			pageSize,
			page: currentPage,
		});

		const oeuvresWithTypes = oeuvresResponse.results.map(oeuvre => {
			const typeDetails = oeuvreTypeMap.get((oeuvre.data as any).type.id); // Ensure this ID corresponds correctly
			return {
				...oeuvre,
				typeDetails: typeDetails ? {
					titre: typeDetails.data.titre,
					description: typeDetails.data.description 
				} : undefined
			};
		});

		if (!page || !page.data) {
			throw error(404, `Page "${params.uid}" not found`);
		}

		return {
			page,
			oeuvres: oeuvresWithTypes,
			totalPages: oeuvresResponse.total_pages ?? 1,
			currentPage,
			nextPage: currentPage < (oeuvresResponse.total_pages ?? 1) ? currentPage + 1 : null,
			prevPage: currentPage > 1 ? currentPage - 1 : null,
			title: asText(page.data?.title) ?? '',
			meta_description: page.data?.meta_description ?? '',
			meta_title: page.data?.meta_title ?? '',
			meta_image: page.data?.meta_image?.url ?? ''
		};
	} catch (err) {
		throw error(500, "Failed to load data");
	}
}
