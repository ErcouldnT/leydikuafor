<script lang='ts'>
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class='space-y-6'>
	<header>
		<h1 class='text-2xl lg:text-3xl font-semibold'>Genel Bakış</h1>
		<p class='text-base-content/60 text-sm mt-1'>Hizmetlerinizin özet durumu</p>
	</header>

	{#if data.error}
		<div role='alert' class='alert alert-error'>
			<span>Backend ile bağlantı kurulamadı: {data.error}</span>
		</div>
	{:else}
		<div class='stats stats-vertical sm:stats-horizontal shadow w-full bg-base-200'>
			<div class='stat'>
				<div class='stat-title'>Kategori</div>
				<div class='stat-value'>{data.stats.length}</div>
			</div>
			<div class='stat'>
				<div class='stat-title'>Toplam Hizmet</div>
				<div class='stat-value'>{data.totalServices}</div>
			</div>
		</div>

		<div class='card bg-base-200 shadow overflow-hidden'>
			<div class='flex items-center justify-between px-5 py-4 border-b border-base-300'>
				<h2 class='font-medium'>Kategoriler</h2>
				<a href='/panel/kategoriler' class='btn btn-ghost btn-sm'>Tümünü yönet →</a>
			</div>
			<ul class='divide-y divide-base-300'>
				{#each data.stats as cat}
					<li class='px-5 py-4 flex items-center justify-between gap-4'>
						<div class='min-w-0'>
							<a href='/panel/kategoriler/{cat.id}' class='font-medium hover:underline truncate block'>
								{cat.kategori}
							</a>
							<p class='text-xs text-base-content/50 mt-0.5 truncate'>
								/{cat.slug} · son güncelleme {cat.updatedAt}
							</p>
						</div>
						<div class='badge badge-neutral shrink-0'>{cat.serviceCount} hizmet</div>
					</li>
				{:else}
					<li class='px-5 py-8 text-center text-sm text-base-content/50'>Henüz kategori yok.</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
