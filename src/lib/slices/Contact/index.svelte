<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.ContactSlice;
</script>

<section class="mt-10 px-6 md:px-16 lg:px-38 py-22 md:py-26">
	<div class="text-center text-lg md:text-xl space-y-4">
		<h1 class="text-5xl md:text-6xl">{slice.primary.titre}</h1>
		<p>{slice.primary.description}</p>
	</div>
	<form action="" class="relative">
		<!-- Background Color Blobs -->
		<div class="absolute inset-0 flex justify-center items-center -z-10">
			<div
				class="absolute -top-10 -left-16 w-56 h-56 rounded-full bg-pink-400 filter blur-3xl opacity-80 mix-blend-multiply shape"
			></div>
			<div
				class="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-yellow-400 filter blur-3xl opacity-80 mix-blend-multiply shape animation-delay-2000"
			></div>
			<div
				class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-56 h-56 rounded-full bg-violet-400 filter blur-3xl opacity-80 mix-blend-multiply shape animation-delay-4000"
			></div>
		</div>
		<div class="flex flex-col md:grid md:grid-cols-2 gap-6 mt-10">
			<div>
				<input
					type="text"
					id="prenom"
					name="prenom"
					placeholder="Prénom"
					class="w-full p-2 border-2 border-black  shadow placeholder-gray-500 bg-[#ffffffcf] backdrop-blur-lg outline-none focus:outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
				/>
			</div>
			<div>
				<input
					type="text"
					id="nom"
					name="nom"
					placeholder="Nom"
					class="w-full p-2 border-2 border-black  shadow placeholder-gray-500 bg-[#ffffffcf] backdrop-blur-lg outline-none focus:outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
				/>
			</div>
			<div>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					class="w-full p-2 border-2 border-black  shadow placeholder-gray-500 bg-[#ffffffcf] backdrop-blur-lg outline-none focus:outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
				/>
			</div>
			<div>
				<input
					type="tel"
					id="telephone"
					name="telephone"
					placeholder="Téléphone"
					class="w-full p-2 border-2 border-black  shadow placeholder-gray-500 bg-[#ffffffcf] backdrop-blur-lg outline-none focus:outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
				/>
			</div>
			<div class="col-span-2">
				<textarea
					id="message"
					name="message"
					placeholder="Message"
					class="w-full min-h-44 p-2 border-2 border-black  shadow placeholder-gray-500 bg-[#ffffffcf] backdrop-blur-lg resize-none outline-none focus:outline-none focus:border-pink-400 focus:ring focus:ring-pink-400"
				></textarea>
			</div>
		</div>
		<div class="w-full flex justify-center my-4">
			<button
				type="submit"
				class="btn-effect border-2 border-black bg-[#ffffffcf] backdrop-blur-lg text-black"
				><span>Envoyer</span></button
			>
		</div>
	</form>
</section>
