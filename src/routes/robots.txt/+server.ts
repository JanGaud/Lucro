// src/routes/robots.txt/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const robotsContent = `User-agent: *
Disallow:
Sitemap: ${protocol}://${host}/sitemap.xml`;

    return new Response(robotsContent, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
};
