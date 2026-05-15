import { fail, redirect } from '@sveltejs/kit'
import { COOKIE_MAX_AGE, COOKIE_NAME, checkPassword, makeSessionToken } from '$lib/server/auth'
import type { Actions } from './$types'

export const prerender = false

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const fd = await request.formData()
		const password = String(fd.get('password') ?? '')

		if (!password) {
			return fail(400, { message: 'Şifre giriniz' })
		}
		if (!checkPassword(password)) {
			return fail(401, { message: 'Şifre yanlış' })
		}

		const token = makeSessionToken()
		cookies.set(COOKIE_NAME, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: COOKIE_MAX_AGE,
		})

		throw redirect(303, '/panel')
	},
}
