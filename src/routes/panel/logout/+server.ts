import type { RequestHandler } from './$types'
import { COOKIE_NAME } from '$lib/server/auth'
import { redirect } from '@sveltejs/kit'

export const POST: RequestHandler = ({ cookies }) => {
	cookies.delete(COOKIE_NAME, { path: '/' })
	throw redirect(303, '/panel/login')
}
