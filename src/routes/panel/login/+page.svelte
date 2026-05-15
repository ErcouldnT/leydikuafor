<script lang='ts'>
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	export let form: ActionData

	let submitting = false
</script>

<svelte:head>
	<title>Giriş — Leydi Panel</title>
</svelte:head>

<div class='min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-8 antialiased font-sans'>
	<div class='w-full max-w-sm bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 lg:p-8'>
		<div class='mb-6 text-center'>
			<h1 class='text-xl font-semibold tracking-tight text-zinc-900'>Leydi Panel</h1>
			<p class='text-sm text-zinc-500 mt-1'>Yönetim paneline giriş</p>
		</div>

		<form
			method='POST'
			use:enhance={() => {
				submitting = true
				return async ({ update }) => {
					await update()
					submitting = false
				}
			}}
			class='space-y-4'
		>
			<div>
				<label for='password' class='block text-sm font-medium text-zinc-700 mb-1.5'>Şifre</label>
				<input
					id='password'
					name='password'
					type='password'
					autocomplete='current-password'
					required
					class='block w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-zinc-900'
				/>
			</div>

			{#if form?.message}
				<div class='text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg'>
					{form.message}
				</div>
			{/if}

			<button
				type='submit'
				disabled={submitting}
				class='w-full bg-zinc-900 text-white font-medium py-2.5 rounded-lg hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed transition'
			>
				{submitting ? 'Giriş yapılıyor…' : 'Giriş yap'}
			</button>
		</form>
	</div>
</div>
