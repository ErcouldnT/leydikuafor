<script lang='ts'>
	import type { LayoutData } from './$types'
	import { page } from '$app/stores'

	export let data: LayoutData

	$: pathname = $page.url.pathname
	$: isLogin = pathname === '/panel/login'

	const navItems: { href: string, label: string, icon: string }[] = [
		{
			href: '/panel',
			label: 'Genel Bakış',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
		},
		{
			href: '/panel/kategoriler',
			label: 'Kategoriler',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
		},
		{
			href: '/panel/hizmetler',
			label: 'Hizmetler',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>',
		},
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
								{@html item.icon}
								{item.label}
							</a>
						</li>
					{/each}
				</ul>

				<div class='p-3 border-t border-base-300'>
					<a href='/' class='btn btn-ghost btn-sm w-full justify-start gap-2 mb-1'>
						<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
						</svg>
						Siteyi görüntüle
					</a>
					<form method='POST' action='/panel/logout'>
						<button type='submit' class='btn btn-ghost btn-sm w-full justify-start gap-2 text-error'>
							<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
							</svg>
							Çıkış yap
						</button>
					</form>
				</div>
			</aside>
		</div>
	</div>
{/if}
