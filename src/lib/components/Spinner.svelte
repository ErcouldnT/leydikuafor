<script lang='ts'>
	export let size: 'sm' | 'md' | 'lg' = 'md'
	export let label: string = 'Yükleniyor'

	const sizeClass = { sm: 'loading-sm', md: 'loading-md', lg: 'loading-lg' }
</script>

<span class='loading loading-spinner {sizeClass[size]}' role='status' aria-label={label}></span>
