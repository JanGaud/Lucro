<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.ContactSlice;
</script>

<section class="mt-10 px-6 md:px-16 lg:px-38 py-20 lg:py-36">
	<div class="text-center text-lg md:text-xl space-y-4">
		<h1 class="text-5xl md:text-6xl">{slice.primary.titre}</h1>
		<p>{slice.primary.description}</p>
	</div>
	<form action="">
		<div class="grid md:grid-cols-2 gap-6 mt-10">
			<div>
				<input
					type="text"
					id="prenom"
					name="prenom"
					placeholder="Prénom"
					class="w-full p-2 border border-gray-300 rounded-md shadow placeholder-gray-500"
				/>
			</div>
			<div>
				<input
					type="text"
					id="nom"
					name="nom"
					placeholder="Nom"
					class="w-full p-2 border border-gray-300 rounded-md shadow placeholder-gray-500"
				/>
			</div>
			<div>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					class="w-full p-2 border border-gray-300 rounded-md shadow placeholder-gray-500"
				/>
			</div>
			<div>
				<input
					type="tel"
					id="telephone"
					name="telephone"
					placeholder="Téléphone"
					class="w-full p-2 border border-gray-300 rounded-md shadow placeholder-gray-500"
				/>
			</div>
			<div class="col-span-2">
				<textarea 
					id="message" 
					name="message" 
					placeholder="Message"
					class="w-full min-h-44 p-2 border border-gray-300 rounded-md shadow placeholder-gray-500 resize-none"
				></textarea>
			</div>
		</div>
		<button type="submit" class="mt-6 bg-primary text-white py-2 px-4 rounded-md">Envoyer</button>
	</form>
</section>
