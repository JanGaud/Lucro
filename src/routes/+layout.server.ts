import { createClient } from '$lib/prismicio';

export const prerender = 'auto';

export async function load() {
    const client = createClient();

    const nav = await client.getSingle('navigation');

    return {
        nav
    };
}