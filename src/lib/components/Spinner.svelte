<script lang='ts'>
	export let size: 'sm' | 'md' | 'lg' = 'md'
	export let label: string = 'Yükleniyor'

	const sizeClass = {
		sm: 'h-5 w-5 border-2',
		md: 'h-10 w-10 border-[3px]',
		lg: 'h-16 w-16 border-4',
	}
</script>

<div class='inline-flex items-center justify-center' role='status' aria-label={label}>
	<span
		class='animate-spin rounded-full border-zinc-300 border-t-zinc-900 {sizeClass[size]}'
	></span>
	<span class='sr-only'>{label}</span>
</div>
