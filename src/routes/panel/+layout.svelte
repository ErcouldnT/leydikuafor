<script lang='ts'>
	import type { LayoutData } from './$types'
	import { page } from '$app/stores'

	export let data: LayoutData

	$: pathname = $page.url.pathname
	$: isLogin = pathname === '/panel/login'

	const navItems: { href: string, label: string }[] = [
		{ href: '/panel', label: 'Genel Bakış' },
	// { href: '/panel/kategoriler', label: 'Kategoriler' },
	]

	function isActive(href: string): boolean {
		if (href === '/panel')
			return pathname === '/panel'
		return pathname === href || pathname.startsWith(`${href}/`)
	}
</script>

<svelte:head>
	<title>Leydi Panel</title>
</svelte:head>

{#if isLogin}
	<slot />
{:else if data.adminAuthed}
	<div class='drawer lg:drawer-open'>
		<input id='panel-drawer' type='checkbox' class='drawer-toggle' />

		<div class='drawer-content flex flex-col min-h-screen'>
			<div class='navbar bg-base-200 border-b border-base-300 lg:hidden sticky top-0 z-30'>
				<div class='flex-none'>
					<label for='panel-drawer' class='btn btn-square btn-ghost' aria-label='Menüyü aç'>
						<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16' />
						</svg>
					</label>
				</div>
				<div class='flex-1'>
					<a href='/panel' class='btn btn-ghost font-semibold'>Leydi Panel</a>
				</div>
			</div>

			<main class='flex-1 p-4 lg:p-8'>
				<div class='max-w-5xl mx-auto'>
					<slot />
				</div>
			</main>
		</div>

		<div class='drawer-side z-40'>
			<label for='panel-drawer' aria-label='Menüyü kapat' class='drawer-overlay'></label>
			<aside class='bg-base-200 border-r border-base-300 w-64 min-h-full flex flex-col'>
				<div class='px-6 py-5 border-b border-base-300'>
					<a href='/panel' class='font-semibold text-lg'>Leydi Panel</a>
					<p class='text-base-content/50 text-xs mt-0.5'>Yönetim</p>
				</div>

				<ul class='menu flex-1 px-3 py-4 gap-1'>
					{#each navItems as item}
						<li>
							<a href={item.href} class={isActive(item.href) ? 'active' : ''}>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>

				<div class='p-3 border-t border-base-300'>
					<form method='POST' action='/panel/logout'>
						<button type='submit' class='btn btn-ghost btn-sm w-full justify-start'>
							Çıkış yap
						</button>
					</form>
				</div>
			</aside>
		</div>
	</div>
{/if}
