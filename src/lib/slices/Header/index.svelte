<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.HeaderSlice;
</script>

<section
	class="w-full h-screen relative flex items-center justify-center"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="flex justify-center items-center relative gap-x-20">
		<!-- Text Content -->
		<hgroup class="z-10 text-left space-y-4">
			<h1 class="text-8xl font-bold tracking-wider">{slice.primary.titre}</h1>
			<h2 class="text-7xl">{slice.primary.sous_titre}</h2>
			<p class="text-2xl">{slice.primary.slogan}</p>
		</hgroup>

		<!-- Portrait Image Container -->
		<div class="relative z-10 w-[400px] border-2 border-black">
			<!-- Blurred Animated Shapes Behind -->
			<div
				class="absolute -top-10 -left-16 w-56 h-56 rounded-full bg-pink-400 filter blur-2xl opacity-90 mix-blend-multiply shape"
			></div>
			<div
				class="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-yellow-400 filter blur-2xl opacity-90 mix-blend-multiply shape animation-delay-2000"
			></div>
			<div
				class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-56 h-56 rounded-full bg-violet-400 filter blur-2xl opacity-90 mix-blend-multiply shape animation-delay-4000"
			></div>

			<!-- Image -->
			<PrismicImage class="w-full h-auto relative z-10" field={slice.primary.portrait} />
		</div>
	</div>
</section>

<style>
	.shape {
		animation: blob 10s infinite linear;
		position: absolute;
		will-change: transform;
	}

	@keyframes blob {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(30px, -50px) scale(1.1);
		}
		50% {
			transform: translate(-30px, 40px) scale(1.05);
		}
		75% {
			transform: translate(20px, -20px) scale(0.95);
		}
	}

	.animation-delay-2000 {
		animation-delay: -2s;
	}

	.animation-delay-4000 {
		animation-delay: -4s;
	}
</style>
