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
	const nav = await client.getSingle('navigation');

	// ✅ Get the current page number from the query string safely
	const currentPage = Number(url.searchParams.get('page')) || 1;
	const pageSize = 20;

	try {
		if (!params.uid) {
			throw error(400, "Missing UID parameter");
		}

		// ✅ Fetch the page from Prismic
		const page = await client.getByUID('page', params.uid).catch(err => {
			return null;
		});

		// ✅ Handle missing page
		if (!page || !page.data) {
			throw error(404, `Page "${params.uid}" not found`);
		}

		// ✅ Fetch œuvres (artworks)
		const oeuvresResponse = await client
			.get({
				predicates: [prismicPredicate.at('document.type', 'oeuvres')],
				pageSize,
				page: currentPage,
			})
			.catch(err => {
				return { results: [], total_pages: 1 }; // Return default data
			});

		return {
			page,
			nav,
			oeuvres: oeuvresResponse.results ?? [],
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
