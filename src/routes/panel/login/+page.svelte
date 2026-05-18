<script lang='ts'>
	import type { ActionData } from './$types'
	import { enhance } from '$app/forms'
	import { Lock, AlertCircle } from '@lucide/svelte'

	export let form: ActionData

	let submitting = false
</script>

<svelte:head>
	<title>Giriş — Leydi Panel</title>
</svelte:head>

<div class='min-h-screen bg-base-200 flex items-center justify-center px-4 py-8'>
	<div class='card w-full max-w-sm bg-base-100 shadow-xl'>
		<div class='card-body'>
			<div class='mb-4 text-center'>
				<div class='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3'>
					<Lock size={32} class='text-primary' />
				</div>
				<h1 class='card-title justify-center text-xl text-primary'>Leydi Panel</h1>
				<p class='text-base-content/60 text-sm mt-1'>Yönetim paneline giriş</p>
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
				<div class='form-control'>
					<label class='label' for='password'>
						<span class='label-text'>Şifre</span>
					</label>
					<input
						id='password'
						name='password'
						type='password'
						autocomplete='current-password'
						required
						class='input input-bordered w-full'
						placeholder='••••••••'
					/>
				</div>

				{#if form?.message}
					<div role='alert' class='alert alert-error'>
						<AlertCircle size={20} class='shrink-0' />
						<span>{form.message}</span>
					</div>
				{/if}

				<button type='submit' disabled={submitting} class='btn btn-primary w-full'>
					{#if submitting}
						<span class='loading loading-spinner loading-sm'></span>
					{/if}
					{submitting ? 'Giriş yapılıyor…' : 'Giriş yap'}
				</button>
			</form>
		</div>
	</div>
</div>
