export const prerender = false;
export const ssr = true;
import { createClient } from '$lib/prismicio';
import "../app.css";

export async function load({ fetch }: { fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> }) {
    const client = createClient({ fetch });

    let nav;

    try {
        nav = await client.getSingle('navigation');
    } catch (error) {
        console.error('Failed to fetch navigation data from Prismic:', error);
        nav = null;
    }

    return {
        nav,
    };
}
