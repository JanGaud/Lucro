<script lang="ts">
    import type { Content } from '@prismicio/client';
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import { PrismicImage, PrismicLink } from '@prismicio/svelte';

    export let slice: Content.EventsSlice;

    let events = $page.data.events;

    // ✅ Function to format a single date in French
    const formatDate = (dateString: string, includeYear = true): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            ...(includeYear ? { year: 'numeric' } : {})
        }).format(date);
    };

    // ✅ Function to format event dates
    const formatEventDates = (event: { data: { dates: any; duree_prolonge: any } }): string => {
        const dates = event.data.dates;
        const isExtended = event.data.duree_prolonge;

        let firstDate = new Date(dates[0].date);
        let firstMonth = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(firstDate);
        let year = new Intl.DateTimeFormat('fr-FR', { year: 'numeric' }).format(firstDate);

        if (isExtended && dates.length >= 2) {
            let startDate = formatDate(dates[0].date, false);
            let endDate = formatDate(dates[dates.length - 1].date);
            return `Du ${startDate} au ${endDate}`;
        } else {
            let groupedDays = dates.map((d: { date: string }) => new Date(d.date).getDate()).join(', ');
            return `Le ${groupedDays} ${firstMonth} ${year}`;
        }
    };

    // ✅ Extract earliest event date for sorting
    let processedEvents = events.map((event: { data: { dates: any[] } }) => {
        let dates = event.data.dates.map((d: { date: string | number | Date }) => new Date(d.date));
        let earliestDate =
            dates.length > 0
                ? new Date(Math.min(...dates.map((d: { getTime: () => any }) => d.getTime())))
                : null;
        return { ...event, earliestDate };
    });

    // ✅ Sort events by earliest date (newest first)
    let sortedEvents = processedEvents
        .filter((event: { earliestDate: any }) => event.earliestDate)
        .sort((a: { earliestDate: any }, b: { earliestDate: any }) => b.earliestDate!.getTime() - a.earliestDate!.getTime());

    // ✅ Extract unique years for filtering
    let years = [...new Set(sortedEvents.map((event: { earliestDate: any; }) => event.earliestDate!.getFullYear().toString()))].sort((a, b) => Number(b) - Number(a));

    // ✅ Selected year for filtering
    let selectedYear: string = (years[0] as string) || ""; // Ensure default is not undefined

    // ✅ REACTIVE FILTERING
    $: filteredEvents = sortedEvents.filter((event: { earliestDate: any; }) => event.earliestDate!.getFullYear().toString() === selectedYear);
</script>

<!-- ✅ Display Filtered Events -->
<section class="mt-10 px-6 md:px-16 lg:px-38 py-22 md:py-26"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}>
    <h1 class="text-5xl md:text-6xl text-center mb-10">Événements</h1>

	<!-- ✅ Year Filter Dropdown -->
    <div class="flex justify-center items-center mb-8">
        <label for="year-select" class="text-lg mr-3">Filtrer par année:</label>
        <select
            id="year-select"
            bind:value={selectedYear}
            class="border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm cursor-pointer text-gray-700"
        >
            {#each years as year}
                <option value={year}>{year}</option>
            {/each}
        </select>
    </div>

    {#if filteredEvents.length > 0}
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredEvents as event}
                <li class="bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <!-- ✅ Event Image / Logo -->
                    <div class="h-[250px] w-full flex justify-center items-center bg-gray-50 border-b border-gray-200">
                        {#if event.data.logo?.url}
                            <PrismicImage field={event.data.logo} class="w-3/4 h-3/4 object-contain" />
                        {:else}
                            <Icon icon="fxemoji:artistpalette" class="text-gray-400 w-20 h-20" />
                        {/if}
                    </div>

                    <!-- ✅ Event Details -->
                    <div class="p-6 flex flex-col flex-grow text-center text-balance">
                        <h3 class="text-2xl font-semibold text-gray-900">{event.data.lieu}</h3>
                        <small class="text-gray-600 text-md">{formatEventDates(event)}</small>

                        <!-- ✅ Call-to-action (Link Button always at bottom) -->
                        {#if event.data.lien?.url}
                            <div class="mt-auto pt-4 flex justify-center">
                                <PrismicLink
                                    field={event.data.lien}
                                    class="btn-effect border-2 border-black bg-[#ffffffcf] backdrop-blur-lg text-black"
                                >
                                    <span>Voir le site</span>
                                </PrismicLink>
                            </div>
                        {/if}
                    </div>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-center text-gray-500 text-lg mt-6">Aucun événement pour cette année.</p>
    {/if}
</section>
