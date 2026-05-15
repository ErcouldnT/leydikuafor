<script lang='ts'>
	import gelin from '$lib/assets/gelin.jpg?enhanced'
	import orgu from '$lib/assets/orgu.jpg?enhanced'
	import tesettur from '$lib/assets/tesettur.jpg?enhanced'
	import Spinner from '$lib/components/Spinner.svelte'
	import type { PageData } from './$types'

	export let data: PageData

	type EnhancedImage = typeof gelin
	const enhancedByPath: Record<string, EnhancedImage> = {
		'/images/gelin.jpg': gelin,
		'/images/tesettur.jpg': tesettur,
		'/images/orgu.jpg': orgu,
	}
</script>

<main>
	{#await data.hizmetlerPromise}
		<div class='flex justify-center items-center min-h-[50vh]'>
			<Spinner size='lg' label='Hizmetler yükleniyor' />
		</div>
	{:then result}
		{#if result.fallback}
			<div
				class='mx-4 lg:mx-10 mt-6 p-4 border border-amber-300 bg-amber-50 text-amber-900 rounded-xl text-center text-sm lg:text-base'
				role='alert'
			>
				⚠ Bu fiyatlar eski olabilir, güncel fiyatlar için Kazım Cömert'e danışınız.
			</div>
		{/if}
		<div class='grid grid-cols-1 gap-10 lg:p-10'>
			{#each result.data as hizmet}
				{@const enhanced = enhancedByPath[hizmet.foto]}
				<div class='grid lg:grid-cols-2 m-auto items-center gap-5'>
					<div class='lg:px-20 {hizmet.fotoYön === "sağ" ? "lg:order-last" : ""} order-first'>
						{#if enhanced}
							<enhanced:img
								class='lg:rounded-xl lg:max-w-lg'
								src={enhanced}
								loading='lazy'
								alt={hizmet.kategori}
							/>
						{:else}
							<img
								class='lg:rounded-xl lg:max-w-lg'
								src={hizmet.foto}
								loading='lazy'
								alt={hizmet.kategori}
							/>
						{/if}
					</div>
					<div class='m-auto'>
						<div class='mb-5 flex flex-col justify-center items-center'>
							<div class='uppercase font-bold text-xl'>{hizmet.kategori}</div>
							<p class='text-sm'>Fiyat Listesi</p>
						</div>
						<div class='p-5 border rounded-xl m-2 lg:mx-20'>
							{#each hizmet.fiyatlar as fiyat}
								<div class='grid grid-cols-3 gap-10'>
									<div class='col-span-2'>{fiyat.ad}</div>
									<div>{fiyat.fiyat} ₺</div>
								</div>
							{/each}
						</div>
						{#if hizmet.açıklama}
							<div class='text-center p-5 italic text-sm'>{hizmet.açıklama}</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:catch error}
		<div class='flex justify-center items-center min-h-[50vh] text-center p-6'>
			<p class='text-rose-700'>Bir hata oluştu: {error instanceof Error ? error.message : 'bilinmeyen'}</p>
		</div>
	{/await}
</main>
