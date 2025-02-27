<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Content } from '@prismicio/client';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	export let slice: Content.ContactSlice;
	let acheter: boolean = false;
	let oeuvresDisponibles: any[] = [];
	let oeuvresSelectionnees: any[] = [];

	// Load available artworks
	onMount(() => {
		oeuvresDisponibles = page.data.oeuvres.filter(
			(oeuvre: { data: { vendue: boolean } }) => !oeuvre.data.vendue
		);
	});

	// Add selected artwork
	function ajouterOeuvre(event: Event) {
		const target = event.target as HTMLSelectElement;
		const selectedId = target.value;
		if (selectedId && !oeuvresSelectionnees.some((o) => o.id === selectedId)) {
			const selectedOeuvre = oeuvresDisponibles.find((o) => o.id === selectedId);
			if (selectedOeuvre) {
				oeuvresSelectionnees = [...oeuvresSelectionnees, selectedOeuvre];
			}
		}
		target.value = ''; // Reset selection
	}

	// Remove selected artwork
	function supprimerOeuvre(id: string) {
		oeuvresSelectionnees = oeuvresSelectionnees.filter((o) => o.id !== id);
	}
</script>

<section
	class="mt-10 px-6 md:px-16 lg:px-38 py-22 md:py-26 relative"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="text-center text-lg md:text-xl space-y-4">
		<h1 class="text-5xl md:text-6xl">{slice.primary.titre}</h1>
		<p>{slice.primary.description}</p>
	</div>

	<form action="" class="relative">
		<!-- Pastilles animées -->
		<div
			class="absolute -top-10 -left-16 w-56 h-56 rounded-full bg-pink-400 filter blur-3xl opacity-80 mix-blend-multiply shape animate-pulse"
		></div>
		<div
			class="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-yellow-400 filter blur-3xl opacity-80 mix-blend-multiply shape animate-bounce"
		></div>
		<div
			class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-56 h-56 rounded-full bg-violet-400 filter blur-3xl opacity-80 mix-blend-multiply shape animate-spin"
		></div>

		<div class="flex flex-col md:grid md:grid-cols-2 gap-6 mt-10">
			<!-- Prénom -->
			<div>
				<label for="prenom" class="sr-only">Prénom</label>
				<input
					type="text"
					id="prenom"
					name="prenom"
					placeholder="Prénom"
					class="w-full p-2 border-2 border-black shadow placeholder-gray-500 bg-white backdrop-blur-lg outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
				/>
			</div>

			<!-- Nom -->
			<div>
				<label for="nom" class="sr-only">Nom</label>
				<input
					type="text"
					id="nom"
					name="nom"
					placeholder="Nom"
					class="w-full p-2 border-2 border-black shadow placeholder-gray-500 bg-white backdrop-blur-lg outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
				/>
			</div>

			<!-- Email -->
			<div>
				<label for="email" class="sr-only">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					class="w-full p-2 border-2 border-black shadow placeholder-gray-500 bg-white backdrop-blur-lg outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
				/>
			</div>

			<!-- Téléphone -->
			<div>
				<label for="telephone" class="sr-only">Téléphone</label>
				<input
					type="tel"
					id="telephone"
					name="telephone"
					placeholder="Téléphone"
					class="w-full p-2 border-2 border-black shadow placeholder-gray-500 bg-white backdrop-blur-lg outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
				/>
			</div>

			<!-- Achat d'une œuvre -->
			<div>
				<fieldset>
					<legend class="text-lg">Voulez-vous acheter une œuvre ?</legend>
					<div class="flex items-center gap-4 mt-2">
						<label for="acheterOui" class="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								id="acheterOui"
								name="acheter"
								bind:group={acheter}
								value={true}
								class="hidden peer"
							/>
							<div
								class="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center transition-all peer-checked:border-pink-500 peer-checked:bg-pink-500 peer-checked:ring-2 peer-checked:ring-pink-300"
							>
								<div
									class="w-3 h-3 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"
								></div>
							</div>
							<span class="text-gray-700 font-medium peer-checked:text-pink-500">Oui</span>
						</label>

						<label for="acheterNon" class="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								id="acheterNon"
								name="acheter"
								bind:group={acheter}
								value={false}
								checked
								class="hidden peer"
							/>
							<div
								class="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center transition-all peer-checked:border-pink-500 peer-checked:bg-pink-500 peer-checked:ring-2 peer-checked:ring-pink-300"
							>
								<div
									class="w-3 h-3 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"
								></div>
							</div>
							<span class="text-gray-700 font-medium peer-checked:text-pink-500">Non</span>
						</label>
					</div>
				</fieldset>
			</div>

			<!-- Sélecteur des œuvres disponibles -->
			<div>
				<select
					id="oeuvreSelection"
					name="oeuvreSelection"
					on:change={ajouterOeuvre}
					class="w-full p-2 border-2 border-black shadow bg-white backdrop-blur-lg outline-none focus:border-pink-400 focus:ring focus:ring-pink-400 transition-all duration-300
						{acheter ? '' : 'opacity-50 cursor-not-allowed'}"
					disabled={!acheter}
				>
					<option value="">-- Choisissez une œuvre --</option>
					{#each oeuvresDisponibles as oeuvre}
						<option value={oeuvre.id}>{oeuvre.data.titre}</option>
					{/each}
				</select>

				<!-- Affichage des œuvres sélectionnées sous forme de bulles -->
				{#if oeuvresSelectionnees.length > 0}
					<div class="flex flex-wrap gap-2 mt-4">
						{#each oeuvresSelectionnees as oeuvre}
							<div class="flex items-center bg-pink-200 px-3 py-1 rounded-full shadow">
								<span>{oeuvre.data.titre}</span>
								<button
									type="button"
									on:click={() => supprimerOeuvre(oeuvre.id)}
									class="ml-2 text-red-600 hover:text-red-800"
								>
									<Icon icon="mdi:close" />
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<!-- Message -->
		<div class="col-span-2 mt-4">
			<label for="message" class="sr-only">Message</label>
			<textarea
				id="message"
				name="message"
				placeholder="Message"
				class="w-full min-h-44 p-2 border-2 border-black shadow placeholder-gray-500 bg-white backdrop-blur-lg resize-none outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
			></textarea>
		</div>

		<!-- Bouton d'envoi -->
		<div class="w-full flex justify-center my-4">
			<button
				type="submit"
				class="btn-effect border-2 border-black bg-white backdrop-blur-lg text-black"
			>
				<span>Envoyer</span>
			</button>
		</div>
	</form>
</section>
