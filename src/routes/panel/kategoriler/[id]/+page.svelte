<script lang='ts'>
	import type { ActionData, PageData } from './$types'
	import { enhance } from '$app/forms'

	export let data: PageData
	export let form: ActionData
</script>

<div class='space-y-6'>
	<nav class='text-sm text-base-content/60'>
		<a href='/panel/kategoriler' class='hover:text-base-content inline-flex items-center gap-1'>
			<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
				<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 19l-7-7 7-7' />
			</svg>
			Kategoriler
		</a>
	</nav>

	<header class='flex items-start justify-between gap-4 flex-wrap'>
		<div>
			<h1 class='text-2xl lg:text-3xl font-semibold'>{data.category.kategori}</h1>
			<p class='text-base-content/60 text-sm mt-1'>/{data.category.slug}</p>
		</div>
		<form method='POST' action='?/deleteCategory' use:enhance>
			<button
				type='submit'
				class='btn btn-error btn-sm gap-2'
				on:click={(e) => {
					// eslint-disable-next-line no-alert
					if (!confirm(`"${data.category.kategori}" ve tüm hizmetleri silinsin mi?`))
						e.preventDefault()
				}}
			>
				<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
					<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
				</svg>
				Kategoriyi sil
			</button>
		</form>
	</header>

	<!-- Kategori Bilgileri -->
	<div class='card bg-base-200 shadow'>
		<div class='card-body'>
			<h2 class='card-title text-base'>Kategori bilgileri</h2>

			{#if form?.updateCategory?.message}
				<div role='alert' class='alert alert-error'>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
					</svg>
					<span>{form.updateCategory.message}</span>
				</div>
			{:else if form?.updateCategory?.ok}
				<div role='alert' class='alert alert-success'>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
					</svg>
					<span>Kategori güncellendi.</span>
				</div>
			{/if}

			<form method='POST' action='?/updateCategory' use:enhance enctype='multipart/form-data' class='space-y-4'>
				<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div class='form-control'>
						<label class='label' for='kategori'><span class='label-text'>Kategori adı</span></label>
						<input id='kategori' name='kategori' required value={data.category.kategori} class='input input-bordered w-full' />
					</div>
					<div class='form-control'>
						<label class='label' for='slug'><span class='label-text'>Slug</span></label>
						<input id='slug' name='slug' required pattern='[a-z0-9-]+' value={data.category.slug} class='input input-bordered w-full' />
					</div>
					<div class='form-control sm:col-span-2'>
						<label class='label' for='foto'><span class='label-text'>Kategori Görseli</span></label>
						<div class='flex flex-col sm:flex-row items-start gap-4'>
							{#if data.category.foto}
								<div class='relative group'>
									<img
										src={data.category.foto}
										alt='Mevcut Fotoğraf'
										class='w-24 h-24 object-cover rounded-xl shadow bg-base-300 shrink-0'
									/>
									<div class='absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
										<span class='text-white text-xs'>Değiştir</span>
									</div>
								</div>
							{:else}
								<div class='w-24 h-24 rounded-xl bg-base-300 shrink-0 flex items-center justify-center'>
									<svg xmlns='http://www.w3.org/2000/svg' class='h-8 w-8 text-base-content/30' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
										<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
									</svg>
								</div>
							{/if}
							<div class='flex-1 w-full'>
								<input id='foto' type='file' name='foto' accept='image/*' class='file-input file-input-bordered w-full' />
								<p class='text-xs text-base-content/50 mt-1'>Yeni fotoğraf yüklemezseniz mevcut fotoğraf korunur.</p>
							</div>
						</div>
						<!-- Keep the old photo url as fallback -->
						<input type='hidden' name='mevcutFoto' value={data.category.foto} />
					</div>
					<div class='form-control'>
						<label class='label' for='fotoYon'><span class='label-text'>Görsel konumu</span></label>
						<select id='fotoYon' name='fotoYon' required class='select select-bordered w-full'>
							<option value='sol' selected={data.category.fotoYon === 'sol'}>Sol</option>
							<option value='sağ' selected={data.category.fotoYon === 'sağ'}>Sağ</option>
						</select>
					</div>
					<div class='form-control sm:col-span-2'>
						<label class='label' for='aciklama'><span class='label-text'>Açıklama (opsiyonel)</span></label>
						<input id='aciklama' name='aciklama' value={data.category.aciklama ?? ''} class='input input-bordered w-full' />
					</div>
					<div class='form-control'>
						<label class='label' for='sira'><span class='label-text'>Sıra</span></label>
						<input id='sira' name='sira' type='number' min='0' value={data.category.sira} class='input input-bordered w-full' />
					</div>
				</div>
				<div class='card-actions justify-end'>
					<button type='submit' class='btn btn-primary btn-sm'>Kaydet</button>
				</div>
			</form>
		</div>
	</div>

	<!-- Hizmetler -->
	<div class='card bg-base-200 shadow overflow-hidden'>
		<div class='flex items-center justify-between px-5 py-4 border-b border-base-300'>
			<h2 class='font-medium flex items-center gap-2'>
				<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-base-content/60' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
					<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' />
				</svg>
				Hizmetler ({data.services.length})
			</h2>
		</div>

		{#if form?.addService?.message}
			<div class='mx-5 mt-4'>
				<div role='alert' class='alert alert-error'>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
					</svg>
					<span>{form.addService.message}</span>
				</div>
			</div>
		{:else if form?.addService?.ok}
			<div class='mx-5 mt-4'>
				<div role='alert' class='alert alert-success'>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
					</svg>
					<span>Hizmet eklendi.</span>
				</div>
			</div>
		{/if}
		{#if form?.updateService?.message}
			<div class='mx-5 mt-4'>
				<div role='alert' class='alert alert-error'>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
					</svg>
					<span>{form.updateService.message}</span>
				</div>
			</div>
		{:else if form?.updateService?.ok}
			<div class='mx-5 mt-4'>
				<div role='alert' class='alert alert-success'>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
					</svg>
					<span>Hizmet güncellendi.</span>
				</div>
			</div>
		{/if}
		{#if form?.deleteService?.message}
			<div class='mx-5 mt-4'>
				<div role='alert' class='alert alert-error'>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
					</svg>
					<span>{form.deleteService.message}</span>
				</div>
			</div>
		{:else if form?.deleteService?.ok}
			<div class='mx-5 mt-4'>
				<div role='alert' class='alert alert-success'>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
					</svg>
					<span>Hizmet silindi.</span>
				</div>
			</div>
		{/if}

		<!-- Yeni hizmet ekleme formu -->
		<form
			method='POST'
			action='?/addService'
			use:enhance
			class='px-5 py-4 border-b border-base-300 grid grid-cols-1 sm:grid-cols-[1fr_120px_80px_auto] gap-3 items-end'
		>
			<div class='form-control'>
				<label class='label' for='new-ad'><span class='label-text text-xs'>Yeni hizmet adı</span></label>
				<input id='new-ad' name='ad' required class='input input-bordered input-sm w-full' placeholder='Saç Kesimi' />
			</div>
			<div class='form-control'>
				<label class='label' for='new-fiyat'><span class='label-text text-xs'>Fiyat (₺)</span></label>
				<input id='new-fiyat' name='fiyat' type='number' min='0' required class='input input-bordered input-sm w-full' placeholder='500' />
			</div>
			<div class='form-control'>
				<label class='label' for='new-sira'><span class='label-text text-xs'>Sıra</span></label>
				<input id='new-sira' name='sira' type='number' min='0' value='0' class='input input-bordered input-sm w-full' />
			</div>
			<button type='submit' class='btn btn-primary btn-sm gap-1'>
				<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
					<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4v16m8-8H4' />
				</svg>
				Ekle
			</button>
		</form>

		<ul class='divide-y divide-base-300'>
			{#each data.services as svc}
				<li class='px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2 hover:bg-base-300/30 transition-colors'>
					<form
						method='POST'
						action='?/updateService'
						use:enhance={() => async ({ update }) => update({ reset: false })}
						class='flex-1 grid grid-cols-1 sm:grid-cols-[1fr_120px_80px_auto] gap-3 items-center'
					>
						<input type='hidden' name='id' value={svc.id} />
						<input name='ad' required value={svc.ad} class='input input-bordered input-sm w-full' />
						<input name='fiyat' type='number' min='0' required value={svc.fiyat} class='input input-bordered input-sm w-full' />
						<input name='sira' type='number' min='0' value={svc.sira} class='input input-bordered input-sm w-full' />
						<button type='submit' class='btn btn-outline btn-xs'>Kaydet</button>
					</form>
					<form method='POST' action='?/deleteService' use:enhance>
						<input type='hidden' name='id' value={svc.id} />
						<button
							type='submit'
							aria-label='Sil'
							class='btn btn-ghost btn-xs text-error w-full sm:w-auto'
							on:click={(e) => {
								// eslint-disable-next-line no-alert
								if (!confirm(`"${svc.ad}" silinsin mi?`))
									e.preventDefault()
							}}
						>
							<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
							</svg>
						</button>
					</form>
				</li>
			{:else}
				<li class='px-5 py-8 text-center text-sm text-base-content/50'>Bu kategoride hizmet yok.</li>
			{/each}
		</ul>
	</div>
</div>
