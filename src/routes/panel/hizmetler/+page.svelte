<script lang='ts'>
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class='space-y-6'>
	<header>
		<h1 class='text-2xl lg:text-3xl font-semibold'>Hizmetler</h1>
		<p class='text-base-content/60 text-sm mt-1'>Tüm kategorilerdeki hizmetlerin özeti</p>
	</header>

	{#if data.error}
		<div role='alert' class='alert alert-error'>
			<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
				<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
			</svg>
			<span>{data.error}</span>
		</div>
	{:else}
		<!-- Stats -->
		<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			<div class='card bg-base-200 shadow'>
				<div class='card-body flex-row items-center gap-4 py-4'>
					<div class='bg-secondary/10 text-secondary rounded-xl p-3'>
						<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' />
						</svg>
					</div>
					<div>
						<p class='text-base-content/60 text-sm'>Toplam Hizmet</p>
						<p class='text-2xl font-bold'>{data.services.length}</p>
					</div>
				</div>
			</div>
			<div class='card bg-base-200 shadow'>
				<div class='card-body flex-row items-center gap-4 py-4'>
					<div class='bg-primary/10 text-primary rounded-xl p-3'>
						<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
						</svg>
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
