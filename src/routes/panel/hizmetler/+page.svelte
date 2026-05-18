<script lang='ts'>
	import type { PageData } from './$types'
	import { AlertCircle, Scissors, Tags } from '@lucide/svelte'

	export let data: PageData
</script>

<div class='space-y-6'>
	<header>
		<h1 class='text-2xl lg:text-3xl font-semibold'>Hizmetler</h1>
		<p class='text-base-content/60 text-sm mt-1'>Tüm kategorilerdeki hizmetlerin özeti</p>
	</header>

	{#if data.error}
		<div role='alert' class='alert alert-error'>
			<AlertCircle size={20} class='shrink-0' />
			<span>{data.error}</span>
		</div>
	{:else}
		<!-- Stats -->
		<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			<div class='card bg-base-200 shadow'>
				<div class='card-body flex-row items-center gap-4 py-4'>
					<div class='bg-primary/10 rounded-xl p-3'>
						<Scissors size={24} style='color: var(--p) !important;' />
					</div>
					<div>
						<p class='text-base-content/60 text-sm'>Toplam Hizmet</p>
						<p class='text-2xl font-bold'>{data.services.length}</p>
					</div>
				</div>
			</div>
			<div class='card bg-base-200 shadow'>
				<div class='card-body flex-row items-center gap-4 py-4'>
					<div class='bg-primary/10 rounded-xl p-3'>
						<Tags size={24} style='color: var(--p) !important;' />
					</div>
					<div>
						<p class='text-base-content/60 text-sm'>Kategori Sayısı</p>
						<p class='text-2xl font-bold'>{data.categories.length}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Services by Category -->
		{#each data.categories as cat}
			{@const catServices = data.services.filter(s => s.categoryId === cat.id)}
			{#if catServices.length > 0}
				<div class='card bg-base-200 shadow overflow-hidden'>
					<div class='flex items-center justify-between px-5 py-4 border-b border-base-300'>
						<h2 class='font-medium flex items-center gap-2'>
							{cat.kategori}
							<span class='badge badge-neutral badge-sm'>{catServices.length}</span>
						</h2>
						<a href='/panel/kategoriler/{cat.id}' class='btn btn-ghost btn-xs'>Düzenle →</a>
					</div>

					<!-- Desktop Table -->
					<div class='overflow-x-auto hidden sm:block'>
						<table class='table w-full'>
							<thead>
								<tr>
									<th>Hizmet Adı</th>
									<th>Fiyat</th>
									<th>Sıra</th>
								</tr>
							</thead>
							<tbody>
								{#each catServices as svc}
									<tr class='hover'>
										<td class='font-medium'>{svc.ad}</td>
										<td>{svc.fiyat} ₺</td>
										<td>{svc.sira}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<!-- Mobile List -->
					<ul class='sm:hidden divide-y divide-base-300'>
						{#each catServices as svc}
							<li class='px-5 py-3 flex items-center justify-between'>
								<span class='font-medium'>{svc.ad}</span>
								<span class='badge badge-neutral'>{svc.fiyat} ₺</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/each}

		{#if data.services.length === 0}
			<div class='card bg-base-200 shadow'>
				<div class='card-body text-center text-base-content/50'>
					<p>Henüz hizmet yok. <a href='/panel/kategoriler' class='link link-primary'>Kategori ekleyerek</a> başlayın.</p>
				</div>
			</div>
		{/if}
	{/if}
</div>
