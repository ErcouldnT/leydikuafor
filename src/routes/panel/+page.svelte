<script lang='ts'>
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class='max-w-5xl mx-auto space-y-6'>
	<header>
		<h1 class='text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-900'>Genel Bakış</h1>
		<p class='text-sm text-zinc-500 mt-1'>Hizmetlerinizin özet durumu</p>
	</header>

	{#if data.error}
		<div class='p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-sm'>
			Backend ile bağlantı kurulamadı: {data.error}
		</div>
	{:else}
		<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			<div class='p-5 bg-white border border-zinc-200 rounded-2xl'>
				<p class='text-sm text-zinc-500'>Kategori</p>
				<p class='text-3xl font-semibold text-zinc-900 mt-1'>{data.stats.length}</p>
			</div>
			<div class='p-5 bg-white border border-zinc-200 rounded-2xl'>
				<p class='text-sm text-zinc-500'>Toplam Hizmet</p>
				<p class='text-3xl font-semibold text-zinc-900 mt-1'>{data.totalServices}</p>
			</div>
		</div>

		<div class='bg-white border border-zinc-200 rounded-2xl overflow-hidden'>
			<div class='px-5 py-4 border-b border-zinc-200 flex items-center justify-between'>
				<h2 class='font-medium text-zinc-900'>Kategoriler</h2>
				<a href='/panel/kategoriler' class='text-sm font-medium text-zinc-700 hover:text-zinc-900'>Tümünü yönet →</a>
			</div>
			<ul class='divide-y divide-zinc-200'>
				{#each data.stats as cat}
					<li class='px-5 py-4 flex items-center justify-between gap-4'>
						<div class='min-w-0'>
							<a href='/panel/kategoriler/{cat.id}' class='font-medium text-zinc-900 hover:underline truncate block'>{cat.kategori}</a>
							<p class='text-xs text-zinc-500 mt-0.5 truncate'>/{cat.slug} · son güncelleme {cat.updatedAt}</p>
						</div>
						<span class='shrink-0 inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium'>
							{cat.serviceCount} hizmet
						</span>
					</li>
				{:else}
					<li class='px-5 py-8 text-center text-sm text-zinc-500'>Henüz kategori yok.</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
