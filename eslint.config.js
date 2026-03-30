import antfu from '@antfu/eslint-config'

export default antfu({
	svelte: true,
	unocss: false,
	typescript: true,
	formatters: true,
	stylistic: {
		indent: 'tab',
	},
})
