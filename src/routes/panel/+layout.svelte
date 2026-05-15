<script lang='ts'>
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	$: pathname = $page.url.pathname
	$: isLogin = pathname === '/panel/login'

	const navItems: { href: string, label: string }[] = [
		{ href: '/panel', label: 'Genel Bakış' },
		{ href: '/panel/kategoriler', label: 'Kategoriler' },
	]

	let drawerOpen = false

	function isActive(href: string): boolean {
		if (href === '/panel') return pathname === '/panel'
		return pathname === href || pathname.startsWith(href + '/')
	}
</script>

<svelte:head>
	<title>Leydi Panel</title>
</svelte:head>

{#if isLogin}
	<slot />
{:else if data.adminAuthed}
	<div class='min-h-screen bg-zinc-50 text-zinc-900 antialiased font-sans flex flex-col lg:flex-row'>
		<header class='lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-200'>
			<a href='/panel' class='font-semibold text-lg tracking-tight'>Leydi Panel</a>
			<button
				type='button'
				class='p-2 rounded-lg hover:bg-zinc-100'
				aria-label='Menüyü aç'
				on:click={() => (drawerOpen = !drawerOpen)}
			>
				<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
					{#if drawerOpen}
						<line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/>
					{:else}
						<line x1='3' y1='6' x2='21' y2='6'/><line x1='3' y1='12' x2='21' y2='12'/><line x1='3' y1='18' x2='21' y2='18'/>
					{/if}
				</svg>
			</button>
		</header>

		<aside class='hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-white border-r border-zinc-200'>
			<div class='px-6 py-5 border-b border-zinc-200'>
				<a href='/panel' class='font-semibold text-lg tracking-tight'>Leydi Panel</a>
				<p class='text-xs text-zinc-500 mt-0.5'>Yönetim</p>
			</div>
			<nav class='flex-1 px-3 py-4 space-y-1'>
				{#each navItems as item}
					<a
						href={item.href}
						class='block px-3 py-2 rounded-lg text-sm font-medium transition-colors {isActive(item.href) ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"}'
					>
						{item.label}
					</a>
				{/each}
			</nav>
			<form method='POST' action='/panel/logout' use:enhance class='p-3 border-t border-zinc-200'>
				<button type='submit' class='w-full px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 text-left'>
					Çıkış yap
				</button>
			</form>
		</aside>

		{#if drawerOpen}
			<button
				type='button'
				class='lg:hidden fixed inset-0 z-40 bg-zinc-900/40'
				aria-label='Menüyü kapat'
				on:click={() => (drawerOpen = false)}
			></button>
			<div class='lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-white shadow-xl flex flex-col'>
				<div class='px-6 py-5 border-b border-zinc-200 flex items-center justify-between'>
					<span class='font-semibold text-lg'>Leydi Panel</span>
					<button type='button' on:click={() => (drawerOpen = false)} aria-label='Kapat' class='p-1 rounded hover:bg-zinc-100'>
						<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/></svg>
					</button>
				</div>
				<nav class='flex-1 px-3 py-4 space-y-1'>
					{#each navItems as item}
						<a
							href={item.href}
							on:click={() => (drawerOpen = false)}
							class='block px-3 py-2 rounded-lg text-sm font-medium {isActive(item.href) ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"}'
						>
							{item.label}
						</a>
					{/each}
				</nav>
				<form method='POST' action='/panel/logout' use:enhance class='p-3 border-t border-zinc-200'>
					<button type='submit' class='w-full px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 text-left'>
						Çıkış yap
					</button>
				</form>
			</div>
		{/if}

		<main class='flex-1 min-w-0 p-4 lg:p-8'>
			<slot />
		</main>
	</div>
{/if}
