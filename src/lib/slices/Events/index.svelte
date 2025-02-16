<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte'; // ✅ Import placeholder icon
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';

	export let slice: Content.EventsSlice;

	let events = $page.data.events;

	// ✅ Function to format a single date in French
	const formatDate = (dateString: string, includeYear = true): string => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('fr-FR', {
			day: 'numeric',
			month: 'long',
			...(includeYear ? { year: 'numeric' } : {}) // Include year only when needed
		}).format(date);
	};

	// ✅ Function to format event dates
	const formatEventDates = (event: { data: { dates: any; duree_prolonge: any } }): string => {
		const dates = event.data.dates;
		const isExtended = event.data.duree_prolonge;

		// Extract first date month & year
		let firstDate = new Date(dates[0].date);
		let firstMonth = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(firstDate);
		let year = new Intl.DateTimeFormat('fr-FR', { year: 'numeric' }).format(firstDate);

		if (isExtended && dates.length >= 2) {
			// Example: "Du 21 octobre au 13 novembre"
			let startDate = formatDate(dates[0].date, false);
			let endDate = formatDate(dates[dates.length - 1].date);
			return `Du ${startDate} au ${endDate}`;
		} else {
			// Example: "Le 5, 6, 7 octobre"
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
		.sort(
			(a: { earliestDate: any }, b: { earliestDate: any }) =>
				b.earliestDate!.getTime() - a.earliestDate!.getTime()
		);

	// ✅ Group events by year
	let groupedEvents: Record<string, typeof sortedEvents> = {};

	sortedEvents.forEach((event: { earliestDate: any }) => {
		let year = event.earliestDate!.getFullYear().toString();
		if (!groupedEvents[year]) {
			groupedEvents[year] = [];
		}
		groupedEvents[year].push(event);
	});

	console.log('Grouped Events:', groupedEvents);
</script>

<!-- ✅ Display Events Grouped by Year -->
<section
	class="px-6 md:px-16 lg:px-38 py-20 lg:py-36"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<h1 class="text-5xl md:text-6xl font-bold mb-6 text-center">Événements</h1>

	{#each Object.keys(groupedEvents).sort((a, b) => Number(b) - Number(a)) as year}
		<h2 class="text-2xl font-bold mt-8 mb-4">{year}</h2>

		<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each groupedEvents[year] as event}
				<li
					class="flex flex-col items-center gap-4 border-2 border-gray-100 hover:border-pink-400 transition-colors duration-300 shadow-md p-1"
				>
					<!-- ✅ Show Logo If Available, Otherwise Show Placeholder Icon -->
					<div
						class="h-[250px] w-[250px] flex justify-center items-center overflow-hidden border-b-2 border-gray-100"
					>
						{#if event.data.logo?.url}
							<PrismicImage
								field={event.data.logo}
								class="w-full h-full object-contain drop-shadow"
							/>
						{:else}
							<Icon icon="fxemoji:artistpalette" class="text-gray-400 w-full h-full p-10" />
						{/if}
					</div>

					<div class="flex flex-col justify-between w-full h-[150px] p-1">
						<div>
							<h3 class="text-xl md:text-2xl font-semibold text-black">{event.data.lieu}</h3>
							<small class="text-gray-600">{formatEventDates(event)}</small>
						</div>

						{#if event.data.lien?.url}
							<PrismicLink
								field={event.data.lien}
								class="hover:text-pink-400 transition-colors duration-300 uppercase flex items-baseline gap-4"
								>Voir le site <Icon icon="bytesize:external" /></PrismicLink
							>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/each}
</section>
