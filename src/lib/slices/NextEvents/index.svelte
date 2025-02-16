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
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('fr-FR', {
			day: 'numeric',
			month: 'long',
			...(includeYear ? { year: 'numeric' } : {}) // Include year only when needed
		}).format(date);
	};

	// Function to determine how to display event dates
	const formatEventDates = (event: { data: { dates: any; duree_prolonge: any } }): string => {
		const dates = event.data.dates;
		const isExtended = event.data.duree_prolonge;

		// Extract month and year from the first date
		let firstDate = new Date(dates[0].date);
		let firstMonth = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(firstDate);
		let year = new Intl.DateTimeFormat('fr-FR', { year: 'numeric' }).format(firstDate);

		if (isExtended && dates.length >= 2) {
			// Display "Du 21 octobre au 13 novembre"
			let startDate = formatDate(dates[0].date, false); // Day + Month
			let endDate = formatDate(dates[1].date); // Day + Month + Year
			return `Du ${startDate} au ${endDate}`;
		} else {
			// Display "Le 5, 6, 7 octobre"
			let groupedDays = dates
				.map((d: { date: string | number | Date }) => new Date(d.date).getDate())
				.join(', ');
			return `Le ${groupedDays} ${firstMonth} ${year}`;
		}
	};

	console.log(slice.primary.voir_plus.text);
</script>

<section
	class="relative w-full overflow-hidden py-12"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="text-right mb-8 px-4 md:px-16 lg:px-38">
		<PrismicLink class="hover:text-pink-400 transition-colors duration-300 uppercase" field={slice.primary.voir_plus} />
	</div>

	<div class="scroll-wrapper">
		<ul class="scroll-content">
			{#each duplicateEvents as event}
				<li
					class="w-[325px] md:w-[400px] flex border-2 border-gray-100 shadow-md hover:border-pink-400 transition-colors duration-300"
				>
					<PrismicLink field={event.data.lien} class="w-full h-full flex justify-between">
						<div
							class="h-auto w-1/3 flex items-center justify-center overflow-hidden border-r border-gray-100 p-1"
						>
							{#if event.data.logo?.url}
								<PrismicImage field={event.data.logo} class="h-full w-full object-contain drop-shadow-md" />
							{:else}
								<Icon class="h-20 w-20 drop-shadow-md" icon="fxemoji:artistpalette" />
							{/if}
						</div>
						<div class="ml-4 w-2/3 flex flex-col justify-center gap-4 p-1">
							<h3 class="text-xl md:text-2xl font-semibold text-black">{event.data.lieu}</h3>
							<small class="text-gray-700">{formatEventDates(event)}</small>
						</div>
					</PrismicLink>
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
		animation: infinite-scroll 40s linear infinite; /* Slower speed */
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
