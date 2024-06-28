<script>
	import hizmetler from '$lib/hizmetler';

	import gelin from '$lib/assets/gelin.jpg?enhanced';
	import tesettur from '$lib/assets/tesettur.jpg?enhanced';
	import orgu from '$lib/assets/orgu.jpg?enhanced';

	let enhancedImages = [gelin, tesettur, orgu];

	for (let i = 0; i < hizmetler.length; i++) {
		const hizmet = hizmetler[i];
		hizmet.foto = enhancedImages[i];
	}
</script>

<main>
	<div class="grid grid-cols-1 gap-10 lg:p-10">
		{#each hizmetler as hizmet}
			<div class="grid lg:grid-cols-2 m-auto items-center gap-5">
				<div class="lg:px-20 {hizmet.fotoYön === 'sağ' && 'lg:order-last'} order-first">
					<enhanced:img
						class="lg:rounded-xl lg:max-w-lg"
						src={hizmet.foto}
						loading="lazy"
						alt="Foto"
					/>
				</div>
				<div class="m-auto">
					<div class="mb-5 flex flex-col justify-center items-center">
						<div class="uppercase font-bold text-xl">{hizmet.kategori}</div>
						<p class="text-sm">Fiyat Listesi</p>
					</div>
					<div class="p-5 border rounded-xl m-2 lg:mx-20">
						{#each hizmet.fiyatlar as hizmet}
							<div class="grid grid-cols-3 gap-10">
								<div class="col-span-2">{hizmet.ad}</div>
								<div>{hizmet.fiyat} ₺</div>
							</div>
						{/each}
					</div>
					{#if hizmet.açıklama}
						<div class="text-center p-5 italic text-sm">{hizmet.açıklama}</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</main>
