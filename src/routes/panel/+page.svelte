<script lang='ts'>
	import type { PageData } from './$types'
	import { formatDistanceToNow } from 'date-fns'
	import { tr } from 'date-fns/locale'

	export let data: PageData

	function timeAgo(date: string | Date): string {
		return formatDistanceToNow(new Date(date), { addSuffix: true, locale: tr })
	}
</script>

<div class='space-y-6'>
	<header>
		<h1 class='text-2xl lg:text-3xl font-semibold'>Genel Bakış</h1>
		<p class='text-base-content/60 text-sm mt-1'>Hizmetlerinizin özet durumu</p>
	</header>

	{#if data.error}
		<div role='alert' class='alert alert-error'>
			<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
				<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
			</svg>
			<span>Backend ile bağlantı kurulamadı: {data.error}</span>
		</div>
	{:else}
		<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			<div class='card bg-base-200 shadow'>
				<div class='card-body flex-row items-center gap-4'>
					<div class='bg-primary/10 text-primary rounded-xl p-3'>
						<svg xmlns='http://www.w3.org/2000/svg' class='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
						</svg>
					</div>
					<div>
						<p class='text-base-content/60 text-sm'>Kategori</p>
						<p class='text-3xl font-bold'>{data.stats.length}</p>
					</div>
				</div>
			</div>
			<div class='card bg-base-200 shadow'>
				<div class='card-body flex-row items-center gap-4'>
					<div class='bg-secondary/10 text-secondary rounded-xl p-3'>
						<svg xmlns='http://www.w3.org/2000/svg' class='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' />
						</svg>
					</div>
					<div>
						<p class='text-base-content/60 text-sm'>Toplam Hizmet</p>
						<p class='text-3xl font-bold'>{data.totalServices}</p>
					</div>
				</div>
			</div>
		</div>

		<div class='card bg-base-200 shadow overflow-hidden'>
			<div class='flex items-center justify-between px-5 py-4 border-b border-base-300'>
				<h2 class='font-medium'>Kategoriler</h2>
				<a href='/panel/kategoriler' class='btn btn-ghost btn-sm'>Tümünü yönet →</a>
			</div>
			<ul class='divide-y divide-base-300'>
				{#each data.stats as cat}
					<li class='px-5 py-4 flex items-center gap-4 hover:bg-base-300/30 transition-colors'>
						{#if cat.foto}
							<img
								src={cat.foto}
								alt={cat.kategori}
								class='w-10 h-10 rounded-lg object-cover bg-base-300 shrink-0'
							/>
						{:else}
							<div class='w-10 h-10 rounded-lg bg-base-300 shrink-0 flex items-center justify-center'>
								<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-base-content/30' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
									<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
								</svg>
							</div>
						{/if}
						<div class='flex-1 min-w-0'>
							<a href='/panel/kategoriler/{cat.id}' class='font-medium hover:underline truncate block'>
								{cat.kategori}
							</a>
							<p class='text-xs text-base-content/50 mt-0.5 truncate'>
								/{cat.slug} · {timeAgo(cat.updatedAt)}
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
