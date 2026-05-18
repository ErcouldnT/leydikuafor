<script lang='ts'>
	import type { ActionData, PageData } from './$types'
	import { enhance } from '$app/forms'

	export let data: PageData
	export let form: ActionData

	let showCreate = false
</script>

<div class='space-y-6'>
	<header class='flex items-start justify-between gap-4 flex-wrap'>
		<div>
			<h1 class='text-2xl lg:text-3xl font-semibold'>Kategoriler</h1>
			<p class='text-base-content/60 text-sm mt-1'>Hizmet kategorilerini yönet</p>
		</div>
		<button type='button' on:click={() => (showCreate = !showCreate)} class='btn btn-primary btn-sm gap-2'>
			{#if showCreate}
				<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
					<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
				</svg>
				Vazgeç
			{:else}
				<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
					<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4v16m8-8H4' />
				</svg>
				Yeni kategori
			{/if}
		</button>
	</header>

	{#if data.error}
		<div role='alert' class='alert alert-error'>
			<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
				<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
			</svg>
			<span>{data.error}</span>
		</div>
	{/if}

	{#if showCreate}
		<div class='card bg-base-200 shadow'>
			<div class='card-body'>
				<h2 class='card-title text-base'>Yeni Kategori</h2>
				<form method='POST' action='?/create' use:enhance enctype='multipart/form-data' class='space-y-4'>
					{#if form?.create?.message}
						<div role='alert' class='alert alert-error'>
							<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
							</svg>
							<span>{form.create.message}</span>
						</div>
					{/if}

					<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div class='form-control'>
							<label class='label' for='kategori'><span class='label-text'>Kategori adı</span></label>
							<input id='kategori' name='kategori' required value={form?.create?.values?.kategori ?? ''} class='input input-bordered w-full' placeholder='Saç İşlemleri' />
						</div>
						<div class='form-control'>
							<label class='label' for='slug'><span class='label-text'>Slug</span></label>
							<input id='slug' name='slug' required pattern='[a-z0-9-]+' placeholder='sac-islemleri' value={form?.create?.values?.slug ?? ''} class='input input-bordered w-full' />
						</div>
						<div class='form-control'>
							<label class='label' for='foto'><span class='label-text'>Kategori Görseli</span></label>
							<input id='foto' type='file' name='foto' accept='image/*' class='file-input file-input-bordered w-full' />
						</div>
						<div class='form-control'>
							<label class='label' for='fotoYon'><span class='label-text'>Görsel konumu</span></label>
							<select id='fotoYon' name='fotoYon' required class='select select-bordered w-full'>
								<option value='sol'>Sol</option>
								<option value='sağ'>Sağ</option>
							</select>
						</div>
						<div class='form-control sm:col-span-2'>
							<label class='label' for='aciklama'><span class='label-text'>Açıklama (opsiyonel)</span></label>
							<input id='aciklama' name='aciklama' class='input input-bordered w-full' placeholder='Fiyatlar saçın boyuna göre değişebilir...' />
						</div>
						<div class='form-control'>
							<label class='label' for='sira'><span class='label-text'>Sıra</span></label>
							<input id='sira' name='sira' type='number' min='0' value='0' class='input input-bordered w-full' />
						</div>
					</div>

					<div class='card-actions justify-end'>
						<button type='button' on:click={() => (showCreate = false)} class='btn btn-ghost btn-sm'>İptal</button>
						<button type='submit' class='btn btn-primary btn-sm'>Kaydet</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	{#if form?.delete?.message}
		<div role='alert' class='alert alert-error'>
			<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
				<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
			</svg>
			<span>{form.delete.message}</span>
		</div>
	{/if}

	<div class='card bg-base-200 shadow overflow-hidden'>
		<!-- Desktop Table -->
		<div class='overflow-x-auto hidden md:block'>
			<table class='table w-full'>
				<thead>
					<tr>
						<th>Görsel</th>
						<th>Kategori</th>
						<th>Slug</th>
						<th>Konum</th>
						<th>Sıra</th>
						<th class='text-right'>İşlem</th>
					</tr>
				</thead>
				<tbody>
					{#each data.categories as cat}
						<tr class='hover'>
							<td>
								{#if cat.foto}
									<div class='avatar'>
										<div class='w-12 h-12 rounded-lg'>
											<img src={cat.foto} alt={cat.kategori} />
										</div>
									</div>
								{:else}
									<div class='w-12 h-12 rounded-lg bg-base-300 flex items-center justify-center'>
										<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-base-content/30' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
											<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
										</svg>
									</div>
								{/if}
							</td>
							<td class='font-medium'>{cat.kategori}</td>
							<td><span class='text-base-content/60'>/{cat.slug}</span></td>
							<td>
								<span class='badge badge-sm {cat.fotoYon === "sol" ? "badge-info" : "badge-accent"}'>{cat.fotoYon}</span>
							</td>
							<td>{cat.sira}</td>
							<td class='text-right space-x-2 whitespace-nowrap'>
								<a href='/panel/kategoriler/{cat.id}' class='btn btn-outline btn-xs'>Düzenle</a>
								<form method='POST' action='?/delete' use:enhance class='inline'>
									<input type='hidden' name='id' value={cat.id} />
									<button
										type='submit'
										class='btn btn-error btn-xs'
										on:click={(e) => {
											// eslint-disable-next-line no-alert
											if (!confirm(`"${cat.kategori}" silinsin mi? Tüm hizmetleri de silinecek.`))
												e.preventDefault()
										}}
									>Sil</button>
								</form>
							</td>
						</tr>
					{:else}
						<tr><td colspan='6' class='text-center text-base-content/50 py-8'>Henüz kategori yok.</td></tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Mobile Cards -->
		<ul class='md:hidden divide-y divide-base-300'>
			{#each data.categories as cat}
				<li class='p-5 space-y-3'>
					<div class='flex items-center gap-3'>
						{#if cat.foto}
							<img src={cat.foto} alt={cat.kategori} class='w-14 h-14 rounded-lg object-cover bg-base-300 shrink-0' />
						{:else}
							<div class='w-14 h-14 rounded-lg bg-base-300 shrink-0 flex items-center justify-center'>
								<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 text-base-content/30' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
									<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
								</svg>
							</div>
						{/if}
						<div class='flex-1 min-w-0'>
							<p class='font-medium truncate'>{cat.kategori}</p>
							<p class='text-xs text-base-content/50 truncate'>/{cat.slug} · <span class='badge badge-xs {cat.fotoYon === "sol" ? "badge-info" : "badge-accent"}'>{cat.fotoYon}</span> · sıra {cat.sira}</p>
						</div>
					</div>
					<div class='flex gap-2'>
						<a href='/panel/kategoriler/{cat.id}' class='btn btn-outline btn-xs flex-1'>Düzenle</a>
						<form method='POST' action='?/delete' use:enhance class='flex-1'>
							<input type='hidden' name='id' value={cat.id} />
							<button
								type='submit'
								class='btn btn-error btn-xs w-full'
								on:click={(e) => {
									// eslint-disable-next-line no-alert
									if (!confirm(`"${cat.kategori}" silinsin mi?`))
										e.preventDefault()
								}}
							>Sil</button>
						</form>
					</div>
				</li>
			{:else}
				<li class='p-8 text-center text-sm text-base-content/50'>Henüz kategori yok.</li>
			{/each}
		</ul>
	</div>
</div>
