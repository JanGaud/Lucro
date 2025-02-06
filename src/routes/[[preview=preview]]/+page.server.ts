import { asText } from '@prismicio/client';

import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies }: { fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, cookies: any }) {
	const client = createClient({ fetch, cookies });

	const page = await client.getByUID('page', 'accueil');
	const nav = await client.getSingle('navigation');

	return {
		page,
		nav,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}

export function entries() {
	return [{}];
}
