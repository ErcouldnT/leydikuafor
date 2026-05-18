<script lang='ts'>
	import type { ActionData } from './$types'
	import { enhance } from '$app/forms'

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
					<svg xmlns='http://www.w3.org/2000/svg' class='h-8 w-8 text-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
					</svg>
				</div>
				<h1 class='card-title justify-center text-xl'>Leydi Panel</h1>
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
						<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
						</svg>
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
