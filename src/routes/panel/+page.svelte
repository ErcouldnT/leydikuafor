<script lang='ts'>
	import type { PageData } from './$types'
	import { formatDistanceToNow } from 'date-fns'
	import { tr } from 'date-fns/locale'
	import { AlertCircle, Tags, Scissors, Image as ImageIcon } from '@lucide/svelte'

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
			<AlertCircle size={20} class='shrink-0' />
			<span>Backend ile bağlantı kurulamadı: {data.error}</span>
		</div>
	{:else}
		<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			<div class='card bg-base-200 shadow'>
				<div class='card-body flex-row items-center gap-4'>
					<div class='bg-primary/10 rounded-xl p-3'>
						<Tags size={28} style='color: var(--p) !important;' />
					</div>
					<div>
						<p class='text-base-content/60 text-sm'>Kategori</p>
						<p class='text-3xl font-bold'>{data.stats.length}</p>
					</div>
				</div>
			</div>
			<div class='card bg-base-200 shadow'>
				<div class='card-body flex-row items-center gap-4'>
					<div class='bg-primary/10 rounded-xl p-3'>
						<Scissors size={28} style='color: var(--p) !important;' />
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
								<ImageIcon size={20} style='color: var(--p) !important; opacity: 0.4;' />
							</div>
						{/if}
						<div class='flex-1 min-w-0'>
							<a href='/panel/kategoriler/{cat.id}' class='font-medium hover:underline truncate block'>
								{cat.kategori}
							</a>
							<p class='text-xs text-base-content/50 mt-0.5 truncate'>
								{timeAgo(cat.updatedAt)}
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
