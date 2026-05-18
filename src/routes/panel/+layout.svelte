<script lang='ts'>
	import type { LayoutData } from './$types'
	import { page } from '$app/stores'
	import { LayoutDashboard, Tags, Scissors, ExternalLink, LogOut, Menu } from '@lucide/svelte'

	export let data: LayoutData

	$: pathname = $page.url.pathname
	$: isLogin = pathname === '/panel/login'

	const navItems = [
		{
			href: '/panel',
			label: 'Genel Bakış',
			icon: LayoutDashboard,
		},
		{
			href: '/panel/kategoriler',
			label: 'Kategoriler',
			icon: Tags,
		},
		{
			href: '/panel/hizmetler',
			label: 'Hizmetler',
			icon: Scissors,
		},
	]

	function isActive(href: string, currentPath: string): boolean {
		if (href === '/panel')
			return currentPath === '/panel'
		return currentPath === href || currentPath.startsWith(`${href}/`)
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
					<label for='panel-drawer' class='btn btn-square btn-ghost text-primary' aria-label='Menüyü aç'>
						<Menu size={24} />
					</label>
				</div>
				<div class='flex-1'>
					<a href='/panel' class='btn btn-ghost font-semibold' style='color: var(--p) !important;'>Leydi Panel</a>
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
					<a href='/panel' class='font-semibold text-lg' style='color: var(--p) !important;'>Leydi Panel</a>
					<p class='text-base-content/50 text-xs mt-0.5'>Yönetim</p>
				</div>

				<ul class='menu flex-1 px-3 py-4 gap-1'>
					{#each navItems as item}
						<li>
							<a href={item.href} class={isActive(item.href, $page.url.pathname) ? 'active' : ''}>
								<svelte:component this={item.icon} size={20} style='color: var(--p) !important;' />
								{item.label}
							</a>
						</li>
					{/each}
				</ul>

				<div class='p-3 border-t border-base-300'>
					<a href='/hizmetler' class='btn btn-ghost btn-sm w-full justify-start gap-2 mb-1 hover:text-primary'>
						<ExternalLink size={16} style='color: var(--p) !important;' />
						Siteyi görüntüle
					</a>
					<form method='POST' action='/panel/logout'>
						<button type='submit' class='btn btn-ghost btn-sm w-full justify-start gap-2 text-error hover:bg-error/10'>
							<LogOut size={16} />
							Çıkış yap
						</button>
					</form>
				</div>
			</aside>
		</div>
	</div>
{/if}
