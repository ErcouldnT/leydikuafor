import { error, fail, redirect } from '@sveltejs/kit'
import {
	createService,
	deleteCategory as apiDeleteCategory,
	deleteService,
	getCategory,
	getCategoryServices,
	updateCategory,
	updateService,
	type CategoryInput,
} from '$lib/server/api'
import type { Actions, PageServerLoad } from './$types'

function parseId(raw: string): number {
	const n = Number(raw)
	if (!Number.isInteger(n) || n <= 0) throw error(400, 'Geçersiz id')
	return n
}

function parseFotoYon(v: FormDataEntryValue | null): 'sol' | 'sağ' | null {
	const s = String(v ?? '')
	return s === 'sol' || s === 'sağ' ? s : null
}

export const load: PageServerLoad = async ({ params, fetch }) => {
	const id = parseId(params.id)
	try {
		const [category, services] = await Promise.all([
			getCategory(fetch, id),
			getCategoryServices(fetch, id),
		])
		return { category, services }
	} catch (err) {
		const msg = err instanceof Error ? err.message : 'Yüklenemedi'
		throw error(404, msg)
	}
}

export const actions: Actions = {
	updateCategory: async ({ request, params, fetch }) => {
		const id = parseId(params.id)
		const fd = await request.formData()
		const fotoYon = parseFotoYon(fd.get('fotoYon'))
		const aciklamaRaw = String(fd.get('aciklama') ?? '').trim()
		const sira = Number(fd.get('sira') ?? 0)

		const body: Partial<CategoryInput> = {
			slug: String(fd.get('slug') ?? '').trim(),
			kategori: String(fd.get('kategori') ?? '').trim(),
			foto: String(fd.get('foto') ?? '').trim(),
			aciklama: aciklamaRaw === '' ? null : aciklamaRaw,
			sira: Number.isFinite(sira) ? sira : 0,
		}
		if (fotoYon) body.fotoYon = fotoYon

		try {
			await updateCategory(fetch, id, body)
		} catch (err) {
			return fail(400, {
				updateCategory: { ok: false as const, message: err instanceof Error ? err.message : 'Hata' },
			})
		}
		return { updateCategory: { ok: true as const, message: '' } }
	},

	addService: async ({ request, params, fetch }) => {
		const categoryId = parseId(params.id)
		const fd = await request.formData()
		const ad = String(fd.get('ad') ?? '').trim()
		const fiyat = Number(fd.get('fiyat') ?? 0)
		const sira = Number(fd.get('sira') ?? 0)

		if (!ad || !Number.isFinite(fiyat) || fiyat < 0) {
			return fail(400, { addService: { ok: false as const, message: 'Ad ve fiyat zorunlu' } })
		}

		try {
			await createService(fetch, { categoryId, ad, fiyat, sira: Number.isFinite(sira) ? sira : 0 })
		} catch (err) {
			return fail(400, {
				addService: { ok: false as const, message: err instanceof Error ? err.message : 'Hata' },
			})
		}
		return { addService: { ok: true as const, message: '' } }
	},

	updateService: async ({ request, fetch }) => {
		const fd = await request.formData()
		const id = Number(fd.get('id'))
		const ad = String(fd.get('ad') ?? '').trim()
		const fiyat = Number(fd.get('fiyat') ?? 0)
		const sira = Number(fd.get('sira') ?? 0)
		if (!Number.isInteger(id) || id <= 0 || !ad || !Number.isFinite(fiyat) || fiyat < 0) {
			return fail(400, { updateService: { ok: false as const, message: 'Geçersiz veri' } })
		}
		try {
			await updateService(fetch, id, { ad, fiyat, sira: Number.isFinite(sira) ? sira : 0 })
		} catch (err) {
			return fail(400, {
				updateService: { ok: false as const, message: err instanceof Error ? err.message : 'Hata' },
			})
		}
		return { updateService: { ok: true as const, message: '' } }
	},

	deleteService: async ({ request, fetch }) => {
		const fd = await request.formData()
		const id = Number(fd.get('id'))
		if (!Number.isInteger(id) || id <= 0) {
			return fail(400, { deleteService: { ok: false as const, message: 'Geçersiz id' } })
		}
		try {
			await deleteService(fetch, id)
		} catch (err) {
			return fail(400, {
				deleteService: { ok: false as const, message: err instanceof Error ? err.message : 'Hata' },
			})
		}
		return { deleteService: { ok: true as const, message: '' } }
	},

	deleteCategory: async ({ params, fetch }) => {
		const id = parseId(params.id)
		try {
			await apiDeleteCategory(fetch, id)
		} catch (err) {
			return fail(400, { deleteCategory: { message: err instanceof Error ? err.message : 'Hata' } })
		}
		throw redirect(303, '/panel/kategoriler')
	},
}
