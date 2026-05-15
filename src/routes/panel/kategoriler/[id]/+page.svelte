<script lang='ts'>
	import type { ActionData, PageData } from './$types'
	import { enhance } from '$app/forms'

	export let data: PageData
	export let form: ActionData
</script>

<div class='space-y-6'>
	<nav class='text-sm text-base-content/60'>
		<a href='/panel/kategoriler' class='hover:text-base-content'>← Kategoriler</a>
	</nav>

	<header class='flex items-start justify-between gap-4 flex-wrap'>
		<div>
			<h1 class='text-2xl lg:text-3xl font-semibold'>{data.category.kategori}</h1>
			<p class='text-base-content/60 text-sm mt-1'>/{data.category.slug}</p>
		</div>
		<form method='POST' action='?/deleteCategory' use:enhance>
			<button
				type='submit'
				class='btn btn-error btn-sm'
				on:click={(e) => {
					// eslint-disable-next-line no-alert
					if (!confirm(`"${data.category.kategori}" ve tüm hizmetleri silinsin mi?`))
						e.preventDefault()
				}}
			>Kategoriyi sil</button>
		</form>
	</header>

	<div class='card bg-base-200 shadow'>
		<div class='card-body'>
			<h2 class='card-title text-base'>Kategori bilgileri</h2>

			{#if form?.updateCategory?.message}
				<div role='alert' class='alert alert-error'><span>{form.updateCategory.message}</span></div>
			{:else if form?.updateCategory?.ok}
				<div role='alert' class='alert alert-success'><span>Kategori güncellendi.</span></div>
			{/if}

			<form method='POST' action='?/updateCategory' use:enhance class='space-y-4'>
				<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div class='form-control'>
						<label class='label' for='kategori'><span class='label-text'>Kategori adı</span></label>
						<input id='kategori' name='kategori' required value={data.category.kategori} class='input input-bordered w-full' />
					</div>
					<div class='form-control'>
						<label class='label' for='slug'><span class='label-text'>Slug</span></label>
						<input id='slug' name='slug' required pattern='[a-z0-9-]+' value={data.category.slug} class='input input-bordered w-full' />
					</div>
					<div class='form-control'>
						<label class='label' for='foto'><span class='label-text'>Görsel yolu</span></label>
						<input id='foto' name='foto' required value={data.category.foto} class='input input-bordered w-full' />
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

	<div class='card bg-base-200 shadow overflow-hidden'>
		<div class='flex items-center justify-between px-5 py-4 border-b border-base-300'>
			<h2 class='font-medium'>Hizmetler ({data.services.length})</h2>
		</div>

		{#if form?.addService?.message}
			<div class='mx-5 mt-4'>
				<div role='alert' class='alert alert-error'><span>{form.addService.message}</span></div>
			</div>
		{/if}
		{#if form?.updateService?.message}
			<div class='mx-5 mt-4'>
				<div role='alert' class='alert alert-error'><span>{form.updateService.message}</span></div>
			</div>
		{/if}
		{#if form?.deleteService?.message}
			<div class='mx-5 mt-4'>
				<div role='alert' class='alert alert-error'><span>{form.deleteService.message}</span></div>
			</div>
		{/if}

		<form
			method='POST'
			action='?/addService'
			use:enhance
			class='px-5 py-4 border-b border-base-300 grid grid-cols-1 sm:grid-cols-[1fr_120px_80px_auto] gap-3 items-end'
		>
			<div class='form-control'>
				<label class='label' for='new-ad'><span class='label-text text-xs'>Yeni hizmet adı</span></label>
				<input id='new-ad' name='ad' required class='input input-bordered input-sm w-full' />
			</div>
			<div class='form-control'>
				<label class='label' for='new-fiyat'><span class='label-text text-xs'>Fiyat (₺)</span></label>
				<input id='new-fiyat' name='fiyat' type='number' min='0' required class='input input-bordered input-sm w-full' />
			</div>
			<div class='form-control'>
				<label class='label' for='new-sira'><span class='label-text text-xs'>Sıra</span></label>
				<input id='new-sira' name='sira' type='number' min='0' value='0' class='input input-bordered input-sm w-full' />
			</div>
			<button type='submit' class='btn btn-primary btn-sm'>Ekle</button>
		</form>

		<ul class='divide-y divide-base-300'>
			{#each data.services as svc}
				<li class='px-5 py-3'>
					<form
						method='POST'
						action='?/updateService'
						use:enhance
						class='grid grid-cols-1 sm:grid-cols-[1fr_120px_80px_auto_auto] gap-3 items-center'
					>
						<input type='hidden' name='id' value={svc.id} />
						<input name='ad' required value={svc.ad} class='input input-bordered input-sm w-full' />
						<input name='fiyat' type='number' min='0' required value={svc.fiyat} class='input input-bordered input-sm w-full' />
						<input name='sira' type='number' min='0' value={svc.sira} class='input input-bordered input-sm w-full' />
						<button type='submit' class='btn btn-outline btn-xs'>Güncelle</button>
					</form>
					<form method='POST' action='?/deleteService' use:enhance class='mt-2 sm:hidden'>
						<input type='hidden' name='id' value={svc.id} />
						<button
							type='submit'
							class='btn btn-error btn-xs w-full'
							on:click={(e) => {
								// eslint-disable-next-line no-alert
								if (!confirm(`"${svc.ad}" silinsin mi?`))
									e.preventDefault()
							}}
						>Sil</button>
					</form>
					<form method='POST' action='?/deleteService' use:enhance class='hidden sm:block -mt-9'>
						<input type='hidden' name='id' value={svc.id} />
						<button
							type='submit'
							class='btn btn-error btn-xs'
							on:click={(e) => {
								// eslint-disable-next-line no-alert
								if (!confirm(`"${svc.ad}" silinsin mi?`))
									e.preventDefault()
							}}
						>Sil</button>
					</form>
				</li>
			{:else}
				<li class='px-5 py-8 text-center text-sm text-base-content/50'>Bu kategoride hizmet yok.</li>
			{/each}
		</ul>
	</div>
</div>
