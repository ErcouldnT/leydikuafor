import type { Category, Service } from '$lib/types'
import type { PageServerLoad } from './$types'
import { getCategoryServices, listCategories } from '$lib/server/api'

type ServiceWithCategory = Service & { categoryName: string }

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const categories = await listCategories(fetch)
		const allServices: ServiceWithCategory[] = []

		await Promise.all(
			categories.map(async (cat) => {
				const services = await getCategoryServices(fetch, cat.id)
				for (const svc of services) {
					allServices.push({ ...svc, categoryName: cat.kategori })
				}
			}),
		)

		allServices.sort((a, b) => a.categoryId - b.categoryId || a.sira - b.sira)

		return { services: allServices, categories, error: null as string | null }
	}
	catch (err) {
		const message = err instanceof Error ? err.message : 'Bilinmeyen hata'
		return { services: [] as ServiceWithCategory[], categories: [] as Category[], error: message }
	}
}
