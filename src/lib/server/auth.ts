import crypto from 'node:crypto'
import { env } from '$env/dynamic/private'

export const COOKIE_NAME = 'panel_session'
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30

function getSecret(): string {
	const s = env.AUTH_COOKIE_SECRET
	if (!s || s.length < 16) throw new Error('AUTH_COOKIE_SECRET eksik veya 16 karakterden kısa')
	return s
}

function getPassword(): string {
	const p = env.ADMIN_PASSWORD
	if (!p) throw new Error('ADMIN_PASSWORD eksik')
	return p
}

export function makeSessionToken(): string {
	return crypto.createHmac('sha256', getSecret()).update(getPassword()).digest('hex')
}

export function verifySessionToken(token: string | undefined | null): boolean {
	if (!token) return false
	let expected: string
	try {
		expected = makeSessionToken()
	} catch {
		return false
	}
	if (token.length !== expected.length) return false
	try {
		return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected))
	} catch {
		return false
	}
}

export function checkPassword(input: string): boolean {
	let expected: string
	try {
		expected = getPassword()
	} catch {
		return false
	}
	if (input.length !== expected.length) return false
	try {
		return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(expected))
	} catch {
		return false
	}
}
