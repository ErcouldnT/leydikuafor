<script>
	import sombre from '$lib/assets/sombre.jpg?enhanced';
	import gelin4 from '$lib/assets/gelin4.jpg?enhanced';
	import ombre from '$lib/assets/ombre.jpg?enhanced';
	import ombre4 from '$lib/assets/ombre4.jpg?enhanced';
</script>

<main class="grid lg:grid-cols-4 gap-1">
	<enhanced:img
		class="h-full w-full aspect-auto hover:opacity-70"
		src={sombre}
		loading="lazy"
		alt="sombre"
	/>
	<enhanced:img
		class="h-full w-full aspect-auto hover:opacity-70"
		src={gelin4}
		loading="lazy"
		alt="gelin4"
	/>
	<enhanced:img
		class="h-full w-full aspect-auto hover:opacity-70"
		src={ombre}
		loading="lazy"
		alt="ombre"
	/>
	<enhanced:img
		class="h-full w-full aspect-auto hover:opacity-70"
		src={ombre4}
		loading="lazy"
		alt="ombre4"
	/>
</main>
