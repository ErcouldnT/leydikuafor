import type { Handle } from '@sveltejs/kit'
import { COOKIE_NAME, verifySessionToken } from '$lib/server/auth'

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(COOKIE_NAME)
	event.locals.adminAuthed = verifySessionToken(token)
	return resolve(event)
}
