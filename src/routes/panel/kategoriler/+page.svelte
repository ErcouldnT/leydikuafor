<script lang='ts'>
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData

	let showCreate = false
</script>

<div class='max-w-5xl mx-auto space-y-6'>
	<header class='flex items-start justify-between gap-4 flex-wrap'>
		<div>
			<h1 class='text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-900'>Kategoriler</h1>
			<p class='text-sm text-zinc-500 mt-1'>Hizmet kategorilerini yönet</p>
		</div>
		<button
			type='button'
			on:click={() => (showCreate = !showCreate)}
			class='inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-zinc-800'
		>
			{showCreate ? 'Vazgeç' : '+ Yeni kategori'}
		</button>
	</header>

	{#if data.error}
		<div class='p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-sm'>{data.error}</div>
	{/if}

	{#if showCreate}
		<form
			method='POST'
			action='?/create'
			use:enhance
			class='bg-white border border-zinc-200 rounded-2xl p-5 lg:p-6 space-y-4'
		>
			<h2 class='font-medium text-zinc-900'>Yeni Kategori</h2>

			{#if form?.create?.message}
				<div class='text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg'>{form.create.message}</div>
			{/if}

			<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<div>
					<label for='kategori' class='block text-sm font-medium text-zinc-700 mb-1.5'>Kategori adı</label>
					<input id='kategori' name='kategori' required value={form?.create?.values?.kategori ?? ''} class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
				</div>
				<div>
					<label for='slug' class='block text-sm font-medium text-zinc-700 mb-1.5'>Slug</label>
					<input id='slug' name='slug' required pattern='[a-z0-9-]+' placeholder='ornek-kategori' value={form?.create?.values?.slug ?? ''} class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
				</div>
				<div>
					<label for='foto' class='block text-sm font-medium text-zinc-700 mb-1.5'>Görsel yolu</label>
					<input id='foto' name='foto' required placeholder='/images/gelin.jpg' value={form?.create?.values?.foto ?? '/images/gelin.jpg'} class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
				</div>
				<div>
					<label for='fotoYon' class='block text-sm font-medium text-zinc-700 mb-1.5'>Görsel konumu</label>
					<select id='fotoYon' name='fotoYon' required class='block w-full px-3 py-2 rounded-lg border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500'>
						<option value='sol'>Sol</option>
						<option value='sağ'>Sağ</option>
					</select>
				</div>
				<div class='sm:col-span-2'>
					<label for='aciklama' class='block text-sm font-medium text-zinc-700 mb-1.5'>Açıklama (opsiyonel)</label>
					<input id='aciklama' name='aciklama' class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
				</div>
				<div>
					<label for='sira' class='block text-sm font-medium text-zinc-700 mb-1.5'>Sıra</label>
					<input id='sira' name='sira' type='number' min='0' value='0' class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
				</div>
			</div>

			<div class='flex justify-end gap-2'>
				<button type='button' on:click={() => (showCreate = false)} class='px-4 py-2 rounded-lg text-sm font-medium border border-zinc-300 text-zinc-700 hover:bg-zinc-50'>İptal</button>
				<button type='submit' class='px-4 py-2 rounded-lg text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800'>Kaydet</button>
			</div>
		</form>
	{/if}

	{#if form?.delete?.message}
		<div class='text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg'>{form.delete.message}</div>
	{/if}

	<div class='bg-white border border-zinc-200 rounded-2xl overflow-hidden'>
		<table class='hidden md:table w-full text-sm'>
			<thead class='bg-zinc-50 border-b border-zinc-200 text-left text-zinc-600 uppercase text-xs tracking-wider'>
				<tr>
					<th class='px-5 py-3 font-medium'>Kategori</th>
					<th class='px-5 py-3 font-medium'>Slug</th>
					<th class='px-5 py-3 font-medium'>Görsel</th>
					<th class='px-5 py-3 font-medium'>Konum</th>
					<th class='px-5 py-3 font-medium'>Sıra</th>
					<th class='px-5 py-3 font-medium text-right'>İşlem</th>
				</tr>
			</thead>
			<tbody class='divide-y divide-zinc-200'>
				{#each data.categories as cat}
					<tr>
						<td class='px-5 py-3 font-medium text-zinc-900'>{cat.kategori}</td>
						<td class='px-5 py-3 text-zinc-600'>{cat.slug}</td>
						<td class='px-5 py-3 text-zinc-600 truncate max-w-[200px]'>{cat.foto}</td>
						<td class='px-5 py-3 text-zinc-600'>{cat.fotoYon}</td>
						<td class='px-5 py-3 text-zinc-600'>{cat.sira}</td>
						<td class='px-5 py-3 text-right space-x-2 whitespace-nowrap'>
							<a href='/panel/kategoriler/{cat.id}' class='inline-flex px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-300 text-zinc-700 hover:bg-zinc-50'>Düzenle</a>
							<form method='POST' action='?/delete' use:enhance class='inline'>
								<input type='hidden' name='id' value={cat.id}/>
								<button
									type='submit'
									class='inline-flex px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-600 text-white hover:bg-rose-700'
									on:click={(e) => { if (!confirm(`"${cat.kategori}" silinsin mi? Tüm hizmetleri de silinecek.`)) e.preventDefault() }}
								>Sil</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr><td colspan='6' class='px-5 py-8 text-center text-zinc-500'>Henüz kategori yok.</td></tr>
				{/each}
			</tbody>
		</table>

		<ul class='md:hidden divide-y divide-zinc-200'>
			{#each data.categories as cat}
				<li class='p-5 space-y-3'>
					<div class='flex items-start justify-between gap-3'>
						<div class='min-w-0'>
							<p class='font-medium text-zinc-900 truncate'>{cat.kategori}</p>
							<p class='text-xs text-zinc-500 truncate'>{cat.slug} · {cat.fotoYon} · sıra {cat.sira}</p>
						</div>
						<span class='shrink-0 inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-xs'>{cat.foto}</span>
					</div>
					<div class='flex gap-2'>
						<a href='/panel/kategoriler/{cat.id}' class='flex-1 text-center px-3 py-2 rounded-lg text-xs font-medium border border-zinc-300 text-zinc-700 hover:bg-zinc-50'>Düzenle</a>
						<form method='POST' action='?/delete' use:enhance class='flex-1'>
							<input type='hidden' name='id' value={cat.id}/>
							<button
								type='submit'
								class='w-full px-3 py-2 rounded-lg text-xs font-medium bg-rose-600 text-white hover:bg-rose-700'
								on:click={(e) => { if (!confirm(`"${cat.kategori}" silinsin mi?`)) e.preventDefault() }}
							>Sil</button>
						</form>
					</div>
				</li>
			{:else}
				<li class='p-8 text-center text-sm text-zinc-500'>Henüz kategori yok.</li>
			{/each}
		</ul>
	</div>
</div>
