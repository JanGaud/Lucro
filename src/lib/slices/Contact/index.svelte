<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Content } from '@prismicio/client';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	export let slice: Content.ContactSlice;
	let acheter: boolean = false;
	let oeuvresDisponibles: any[] = [];
	let oeuvresSelectionnees: any[] = [];
	let prenom = '';
	let nom = '';
	let email = '';
	let telephone = '';
	let message = '';

	onMount(() => {
		oeuvresDisponibles = page.data.oeuvres.filter(
			(oeuvre: { data: { vendue: boolean } }) => !oeuvre.data.vendue
		);
	});

	function ajouterOeuvre(event: Event) {
		const target = event.target as HTMLSelectElement;
		const selectedId = target.value;
		if (selectedId && !oeuvresSelectionnees.some((o) => o.id === selectedId)) {
			const selectedOeuvre = oeuvresDisponibles.find((o) => o.id === selectedId);
			if (selectedOeuvre) {
				oeuvresSelectionnees = [...oeuvresSelectionnees, selectedOeuvre];
			}
		}
		target.value = '';
	}

	function supprimerOeuvre(id: string) {
		oeuvresSelectionnees = oeuvresSelectionnees.filter((o) => o.id !== id);
	}

	async function envoyerFormulaire() {
		const data = {
			prenom,
			nom,
			email,
			telephone,
			acheter,
			oeuvres: oeuvresSelectionnees.map((oeuvre) => ({
				id: oeuvre.id,
				titre: oeuvre.data.titre
			})),
			message
		};

		try {
			const response = await fetch('/api/mail', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			if (response.ok) {
				alert('Message envoyé avec succès !');
			} else {
				const errorText = await response.text();
				alert(`Erreur lors de l'envoi: ${errorText}`);
			}
		} catch (error) {
			console.error('Erreur:', error);
			alert('Impossible d’envoyer le message.');
		}
	}
</script>

<section class="mt-10 px-6 md:px-16 lg:px-38 py-22 md:py-26 relative">
	<div class="text-center text-lg md:text-xl space-y-4">
		<h1 class="text-5xl md:text-6xl">{slice.primary.titre}</h1>
		<p>{slice.primary.description}</p>
	</div>

	<form class="relative">
		<!-- Colored Bubbles -->
		<div
			class="absolute pointer-events-none -top-10 -left-16 w-56 h-56 rounded-full bg-pink-400 filter blur-3xl opacity-80 mix-blend-multiply shape animate-pulse"
		></div>
		<div
			class="absolute pointer-events-none -top-16 -right-12 w-56 h-56 rounded-full bg-yellow-400 filter blur-3xl opacity-80 mix-blend-multiply shape animate-bounce"
		></div>
		<div
			class="absolute pointer-events-none -bottom-5 left-1/2 transform -translate-x-1/2 w-56 h-56 rounded-full bg-violet-400 filter blur-3xl opacity-80 mix-blend-multiply shape animate-spin"
		></div>

		<div class="flex flex-col md:grid md:grid-cols-2 gap-6 mt-10">
			<div>
				<input
					type="text"
					id="prenom"
					bind:value={prenom}
					placeholder="Prénom"
					required
					class="w-full p-2 border-2 border-black shadow bg-white focus:border-pink-400 focus:ring-pink-400"
				/>
			</div>
			<div>
				<input
					type="text"
					id="nom"
					bind:value={nom}
					placeholder="Nom"
					required
					class="w-full p-2 border-2 border-black shadow bg-white focus:border-pink-400 focus:ring-pink-400"
				/>
			</div>
			<div>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="Email"
					required
					class="w-full p-2 border-2 border-black shadow bg-white focus:border-pink-400 focus:ring-pink-400"
				/>
			</div>
			<div>
				<input
					type="tel"
					id="telephone"
					bind:value={telephone}
					placeholder="Téléphone"
					class="w-full p-2 border-2 border-black shadow bg-white focus:border-pink-400 focus:ring-pink-400"
				/>
			</div>

			<!-- Achat d'une œuvre (Fixed Radio Selection) -->
			<div>
				<fieldset class="z-10">
					<legend class="text-lg">Voulez-vous acheter une œuvre ?</legend>
					<div class="flex items-center gap-4 mt-2">
						<label class="flex items-center gap-2 cursor-pointer">
							<input type="radio" bind:group={acheter} value={true} class="hidden peer" />
							<span class="text-gray-700 font-medium peer-checked:text-pink-500">Oui</span>
						</label>
						<label class="flex items-center gap-2 cursor-pointer">
							<input type="radio" bind:group={acheter} value={false} checked class="hidden peer" />
							<span class="text-gray-700 font-medium peer-checked:text-pink-500">Non</span>
						</label>
					</div>
				</fieldset>
			</div>

			<!-- Œuvres Disponibles (Fixed Greyed Out Effect) -->
			<div>
				<select
					id="oeuvreSelection"
					on:change={ajouterOeuvre}
					disabled={!acheter}
					class="w-full p-2 border-2 border-black shadow bg-white transition-all
						{acheter ? '' : 'opacity-50 cursor-not-allowed'}"
				>
					<option value="">-- Choisissez une œuvre --</option>
					{#each oeuvresDisponibles as oeuvre}
						<option value={oeuvre.id}>{oeuvre.data.titre}</option>
					{/each}
				</select>

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
			<textarea
				id="message"
				bind:value={message}
				placeholder="Message"
				class="w-full min-h-44 p-2 border-2 border-black shadow bg-white resize-none focus:border-pink-400 focus:ring-pink-400"
			></textarea>
		</div>

		<!-- Submit Button -->
		<div class="w-full flex justify-center my-4">
			<button
				type="button"
				on:click={envoyerFormulaire}
				class="btn-effect border-2 border-black bg-white backdrop-blur-lg text-black"
			>
				<span>Envoyer</span>
			</button>
		</div>
	</form>
</section>

