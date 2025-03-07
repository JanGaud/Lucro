export const prerender = false;
export const ssr = true;
import { createClient } from '$lib/prismicio';
import "../app.css";

export async function load({ fetch }: { fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> }) {
    const client = createClient({ fetch });

    let nav;
    let footer;
    let events: any[] = [];

    try {
        nav = await client.getSingle('navigation');
    } catch (error) {
        nav = null;
    }
    
    try {
        footer = await client.getSingle('footer');
    } catch (error) {
        footer = null;
    }

    try {
        events = (await client.getAllByType('evennement')) || [];
    } catch (error) {
        events = [];
    }

    // Get today's date normalized to start of the day
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Process and sort the 10 closest events (past or future)
    const closestEvents = events
        .map(event => {
            if (!event.data || !Array.isArray(event.data.dates) || event.data.dates.length === 0) {
                return null;
            }

            const firstDateObj = event.data.dates[0]; // Extract first date object
            if (!firstDateObj || typeof firstDateObj.date !== 'string') {
                return null;
            }

            // Parse date properly
            const eventDate = new Date(firstDateObj.date);
            eventDate.setUTCHours(0, 0, 0, 0); // Normalize time

            if (isNaN(eventDate.getTime())) {
                return null;
            }

            return { ...event, eventDate };
        })
        .filter(event => event !== null)
        .sort((a, b) => Math.abs(a!.eventDate.getTime() - today.getTime()) - Math.abs(b!.eventDate.getTime() - today.getTime())) // Sort by closest date
        .slice(0, 10);

    return {
        nav,
        footer,
        events,
        closestEvents
    };
}
