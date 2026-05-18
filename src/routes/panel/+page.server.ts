import type { Category } from '$lib/types'
import type { PageServerLoad } from './$types'
import { getCategoryServices, listCategories } from '$lib/server/api'

type CategoryStat = Category & { serviceCount: number }

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const cats = await listCategories(fetch)
		const stats: CategoryStat[] = await Promise.all(
			cats.map(async (c) => {
				const services = await getCategoryServices(fetch, c.id)
				let latestUpdatedAt = c.updatedAt
				if (services.length > 0) {
					latestUpdatedAt = services.reduce((latest, s) => {
						return s.updatedAt > latest ? s.updatedAt : latest
					}, c.updatedAt)
				}
				return { ...c, serviceCount: services.length, updatedAt: latestUpdatedAt }
			}),
		)
		const totalServices = stats.reduce((acc, c) => acc + c.serviceCount, 0)
		return { stats, totalServices, error: null as string | null }
	}
	catch (err) {
		const message = err instanceof Error ? err.message : 'Bilinmeyen hata'
		return { stats: [] as CategoryStat[], totalServices: 0, error: message }
	}
}
