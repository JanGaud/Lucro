export const prerender = false;
export const ssr = true;
import { createClient } from '$lib/prismicio';
import "../app.css";

export async function load({ fetch }: { fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> }) {
    const client = createClient({ fetch });

    let nav;
    let footer;

    try {
        nav = await client.getSingle('navigation');
    } catch (error) {
        console.error('Failed to fetch navigation data from Prismic:', error);
        nav = null;
    }

    try {
        footer = await client.getSingle('footer');
    } catch (error) {
        console.error('Failed to fetch footer data from Prismic:', error);
        footer = null;
    }

    return {
        nav,
        footer
    };
}
