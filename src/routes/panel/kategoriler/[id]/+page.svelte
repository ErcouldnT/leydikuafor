<script lang='ts'>
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData
</script>

<div class='max-w-5xl mx-auto space-y-6'>
	<nav class='text-sm text-zinc-500'>
		<a href='/panel/kategoriler' class='hover:text-zinc-900'>← Kategoriler</a>
	</nav>

	<header class='flex items-start justify-between gap-4 flex-wrap'>
		<div>
			<h1 class='text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-900'>{data.category.kategori}</h1>
			<p class='text-sm text-zinc-500 mt-1'>/{data.category.slug}</p>
		</div>
		<form method='POST' action='?/deleteCategory' use:enhance>
			<button
				type='submit'
				class='inline-flex px-3 py-2 rounded-lg text-sm font-medium bg-rose-600 text-white hover:bg-rose-700'
				on:click={(e) => { if (!confirm(`"${data.category.kategori}" ve tüm hizmetleri silinsin mi?`)) e.preventDefault() }}
			>Kategoriyi sil</button>
		</form>
	</header>

	<!-- Category edit form -->
	<form
		method='POST'
		action='?/updateCategory'
		use:enhance
		class='bg-white border border-zinc-200 rounded-2xl p-5 lg:p-6 space-y-4'
	>
		<h2 class='font-medium text-zinc-900'>Kategori bilgileri</h2>

		{#if form?.updateCategory?.message}
			<div class='text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg'>{form.updateCategory.message}</div>
		{:else if form?.updateCategory?.ok}
			<div class='text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg'>Kategori güncellendi.</div>
		{/if}

		<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			<div>
				<label for='kategori' class='block text-sm font-medium text-zinc-700 mb-1.5'>Kategori adı</label>
				<input id='kategori' name='kategori' required value={data.category.kategori} class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
			</div>
			<div>
				<label for='slug' class='block text-sm font-medium text-zinc-700 mb-1.5'>Slug</label>
				<input id='slug' name='slug' required pattern='[a-z0-9-]+' value={data.category.slug} class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
			</div>
			<div>
				<label for='foto' class='block text-sm font-medium text-zinc-700 mb-1.5'>Görsel yolu</label>
				<input id='foto' name='foto' required value={data.category.foto} class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
			</div>
			<div>
				<label for='fotoYon' class='block text-sm font-medium text-zinc-700 mb-1.5'>Görsel konumu</label>
				<select id='fotoYon' name='fotoYon' required class='block w-full px-3 py-2 rounded-lg border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500'>
					<option value='sol' selected={data.category.fotoYon === 'sol'}>Sol</option>
					<option value='sağ' selected={data.category.fotoYon === 'sağ'}>Sağ</option>
				</select>
			</div>
			<div class='sm:col-span-2'>
				<label for='aciklama' class='block text-sm font-medium text-zinc-700 mb-1.5'>Açıklama (opsiyonel)</label>
				<input id='aciklama' name='aciklama' value={data.category.aciklama ?? ''} class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
			</div>
			<div>
				<label for='sira' class='block text-sm font-medium text-zinc-700 mb-1.5'>Sıra</label>
				<input id='sira' name='sira' type='number' min='0' value={data.category.sira} class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
			</div>
		</div>

		<div class='flex justify-end'>
			<button type='submit' class='px-4 py-2 rounded-lg text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800'>Kaydet</button>
		</div>
	</form>

	<!-- Services -->
	<section class='bg-white border border-zinc-200 rounded-2xl overflow-hidden'>
		<div class='px-5 py-4 border-b border-zinc-200 flex items-center justify-between'>
			<h2 class='font-medium text-zinc-900'>Hizmetler ({data.services.length})</h2>
		</div>

		{#if form?.addService?.message}
			<div class='mx-5 mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg'>{form.addService.message}</div>
		{/if}
		{#if form?.updateService?.message}
			<div class='mx-5 mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg'>{form.updateService.message}</div>
		{/if}
		{#if form?.deleteService?.message}
			<div class='mx-5 mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg'>{form.deleteService.message}</div>
		{/if}

		<form
			method='POST'
			action='?/addService'
			use:enhance
			class='px-5 py-4 border-b border-zinc-200 grid grid-cols-1 sm:grid-cols-[1fr_120px_80px_auto] gap-3 items-end'
		>
			<div>
				<label for='new-ad' class='block text-xs font-medium text-zinc-600 mb-1'>Yeni hizmet adı</label>
				<input id='new-ad' name='ad' required class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
			</div>
			<div>
				<label for='new-fiyat' class='block text-xs font-medium text-zinc-600 mb-1'>Fiyat (₺)</label>
				<input id='new-fiyat' name='fiyat' type='number' min='0' required class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
			</div>
			<div>
				<label for='new-sira' class='block text-xs font-medium text-zinc-600 mb-1'>Sıra</label>
				<input id='new-sira' name='sira' type='number' min='0' value='0' class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
			</div>
			<button type='submit' class='h-10 px-4 rounded-lg text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800'>Ekle</button>
		</form>

		<ul class='divide-y divide-zinc-200'>
			{#each data.services as svc}
				<li class='px-5 py-3'>
					<form
						method='POST'
						action='?/updateService'
						use:enhance
						class='grid grid-cols-1 sm:grid-cols-[1fr_120px_80px_auto_auto] gap-3 items-center'
					>
						<input type='hidden' name='id' value={svc.id}/>
						<input name='ad' required value={svc.ad} class='px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
						<input name='fiyat' type='number' min='0' required value={svc.fiyat} class='px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
						<input name='sira' type='number' min='0' value={svc.sira} class='px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
						<button type='submit' class='h-10 px-3 rounded-lg text-xs font-medium border border-zinc-300 text-zinc-700 hover:bg-zinc-50'>Güncelle</button>
					</form>
					<form method='POST' action='?/deleteService' use:enhance class='mt-2 sm:hidden'>
						<input type='hidden' name='id' value={svc.id}/>
						<button type='submit' class='w-full px-3 py-2 rounded-lg text-xs font-medium bg-rose-600 text-white' on:click={(e) => { if (!confirm(`"${svc.ad}" silinsin mi?`)) e.preventDefault() }}>Sil</button>
					</form>
					<form method='POST' action='?/deleteService' use:enhance class='hidden sm:block -mt-10 ml-auto'>
						<input type='hidden' name='id' value={svc.id}/>
						<button type='submit' class='h-10 px-3 rounded-lg text-xs font-medium bg-rose-600 text-white hover:bg-rose-700' on:click={(e) => { if (!confirm(`"${svc.ad}" silinsin mi?`)) e.preventDefault() }}>Sil</button>
					</form>
				</li>
			{:else}
				<li class='px-5 py-8 text-center text-sm text-zinc-500'>Bu kategoride hizmet yok.</li>
			{/each}
		</ul>
	</section>
</div>
