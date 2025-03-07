import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '$lib/prismicio';

export const GET: RequestHandler = async ({ request }) => {
    const headers = {
        'Content-Type': 'application/xml'
    };

    const client = createClient();
    let nav;

    try {
        nav = await client.getSingle('navigation');
    } catch (error) {
        console.error('Failed to fetch navigation:', error);
        nav = null;
    }

    // Your site's base URL (remove the trailing slash to avoid double slashes in the URL concatenation)
    const baseUrl = 'https://lucro-seven.vercel.app';

    // Default static routes
    const staticRoutes = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
    ];

    // Dynamic routes from Prismic navigation (ensure to handle the leading slash in URLs)
    let dynamicRoutes = nav ? nav.data.lien.map((link: any) => ({
        url: link.url,
        priority: '0.7',
        changefreq: 'monthly'
    })) : [];

    // Filter out the dynamic home page if it's identical to the static entry
    dynamicRoutes = dynamicRoutes.filter(route => route.url !== '/');

    // Combine static and dynamic routes
    const routes = [...staticRoutes, ...dynamicRoutes];

    // Generate XML content
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
    <url>
        <loc>${baseUrl}${route.url.startsWith('/') ? route.url : '/' + route.url}</loc>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>`).join('')}
</urlset>`;

    return new Response(sitemap, { headers });
};
