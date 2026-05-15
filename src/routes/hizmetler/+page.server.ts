import type { HizmetlerResult } from '$lib/types'
import type { PageServerLoad } from './$types'
import hizmetlerFallback from '$lib/hizmetlerFallback'
import { getHizmetler } from '$lib/server/api'

export const prerender = false
export const ssr = true

export const load: PageServerLoad = ({ fetch }) => {
	const hizmetlerPromise: Promise<HizmetlerResult> = getHizmetler(fetch)
		.then(data => ({ data, fallback: false as const }))
		.catch((err: unknown) => {
			const msg = err instanceof Error ? err.message : String(err)
			console.warn('[hizmetler] backend erişilemedi, fallback kullanılıyor:', msg)
			return { data: hizmetlerFallback, fallback: true as const }
		})

	return { hizmetlerPromise }
}
