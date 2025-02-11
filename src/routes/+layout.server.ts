import { createClient } from '$lib/prismicio';

export const prerender = 'auto';

export async function load() {
    const client = createClient();

    try {
        const nav = await client.getSingle('navigation');
        return { nav };
    } catch (error) {
        console.error('Error fetching navigation:', error);
        return { nav: null };
    }
}
