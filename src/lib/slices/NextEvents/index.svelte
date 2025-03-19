<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let slice: Content.NextEventsSlice;

	let events = $page.data.closestEvents;
	let duplicateEvents = [...events, ...events];

	// Function to format a single date in French format
	const formatDate = (dateString: string, includeYear = true): string => {
		const date = new Date(`${dateString}T00:00:00Z`); // Ensures UTC interpretation
		const day = date.getUTCDate(); // Extracts UTC day to prevent shifts
		const month = new Intl.DateTimeFormat('fr-FR', { month: 'long', timeZone: 'UTC' }).format(date);
		const year = date.getUTCFullYear();

		return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
	};

	// Function to determine how to display event dates
	const formatEventDates = (event: { data: { dates: any; duree_prolonge: any } }): string => {
		if (!event.data.dates || event.data.dates.length === 0) return 'Date inconnue';

		const dates = event.data.dates.filter((d: { date: any; }) => d.date); // Remove invalid entries
		const isExtended = event.data.duree_prolonge;

		if (dates.length === 0) return 'Date inconnue';

		if (isExtended && dates.length >= 2 && dates[1]?.date) {
			let startDate = formatDate(dates[0].date, false);
			let endDate = formatDate(dates[1].date);
			return `Du ${startDate} au ${endDate}`;
		} else {
			let groupedDays = dates
				.map((d: { date: string; }) => {
					return formatDate(d.date, false).split(' ')[0]; // Extract only the day
				})
				.join(', ');

			let firstMonth = new Intl.DateTimeFormat('fr-FR', { month: 'long', timeZone: 'UTC' }).format(
				new Date(dates[0].date)
			);
			let year = new Date(dates[0].date).getUTCFullYear();

			return `Le ${groupedDays} ${firstMonth} ${year}`;
		}
	};
</script>

<section
	class="relative w-full overflow-hidden py-12"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="text-right mb-8 px-4 md:px-16 lg:px-38">
		<PrismicLink
			class="hover:text-pink-400 transition-colors duration-300 uppercase"
			field={slice.primary.voir_plus}
		/>
	</div>

	<div class="scroll-wrapper">
		<ul class="scroll-content">
			{#each duplicateEvents as event}
				<li
					class="w-[325px] md:w-[400px] flex border-2 border-gray-100 shadow-md hover:border-pink-400 rounded-lg transition-colors duration-300"
				>
					<div class="w-full h-full flex justify-between rounded-lg">
						<div
							class="h-auto w-1/3 bg-gray-50 flex items-center justify-center rounded-lg overflow-hidden border-r border-gray-100 p-1"
						>
							{#if event.data.logo?.url}
								<PrismicImage
									field={event.data.logo}
									class="h-full w-full object-contain drop-shadow-md"
								/>
							{:else}
								<Icon class="h-20 w-20 drop-shadow-md" icon="fxemoji:artistpalette" />
							{/if}
						</div>
						<div class="ml-4 w-2/3 flex flex-col justify-center gap-4 p-1">
							<h3 class="text-xl md:text-2xl font-semibold text-black">{event.data.lieu}</h3>
							<small class="text-gray-700">{formatEventDates(event)}</small>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.scroll-wrapper {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.scroll-content {
		display: flex;
		gap: 2rem;
		width: max-content;
		animation: infinite-scroll 50s linear infinite; /* Slower speed */
	}

	@keyframes infinite-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
