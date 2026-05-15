import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const prerender = false
export const ssr = true

export const load: LayoutServerLoad = ({ locals, url }) => {
	const isLogin = url.pathname === '/panel/login'

	if (!locals.adminAuthed && !isLogin) {
		throw redirect(303, '/panel/login')
	}
	if (locals.adminAuthed && isLogin) {
		throw redirect(303, '/panel')
	}

	return { adminAuthed: locals.adminAuthed }
}
