import type { Actions, PageServerLoad } from './$types'
import {
	type CategoryInput,
	createCategory,
	deleteCategory,
	listCategories,
} from '$lib/server/api'
import { fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const categories = await listCategories(fetch)
		return { categories, error: null as string | null }
	}
	catch (err) {
		const message = err instanceof Error ? err.message : 'Bilinmeyen hata'
		return { categories: [], error: message }
	}
}

function parseFotoYon(v: FormDataEntryValue | null): 'sol' | 'sağ' | null {
	const s = String(v ?? '')
	return s === 'sol' || s === 'sağ' ? s : null
}

export const actions: Actions = {
	create: async ({ request, fetch }) => {
		const fd = await request.formData()
		const slug = String(fd.get('slug') ?? '').trim()
		const kategori = String(fd.get('kategori') ?? '').trim()
		const foto = String(fd.get('foto') ?? '').trim()
		const fotoYon = parseFotoYon(fd.get('fotoYon'))
		const aciklamaRaw = String(fd.get('aciklama') ?? '').trim()
		const siraStr = String(fd.get('sira') ?? '0').trim()
		const sira = Number(siraStr)

		if (!slug || !kategori || !foto || !fotoYon || Number.isNaN(sira)) {
			return fail(400, {
				create: { message: 'Zorunlu alanlar eksik veya hatalı', values: { slug, kategori, foto } },
			})
		}

		const body: CategoryInput = {
			slug,
			kategori,
			foto,
			fotoYon,
			aciklama: aciklamaRaw === '' ? null : aciklamaRaw,
			sira,
		}

		try {
			await createCategory(fetch, body)
		}
		catch (err) {
			return fail(400, {
				create: { message: err instanceof Error ? err.message : 'Hata', values: { slug, kategori, foto } },
			})
		}

		throw redirect(303, '/panel/kategoriler')
	},

	delete: async ({ request, fetch }) => {
		const fd = await request.formData()
		const id = Number(fd.get('id'))
		if (!Number.isInteger(id) || id <= 0) {
			return fail(400, { delete: { message: 'Geçersiz id' } })
		}
		try {
			await deleteCategory(fetch, id)
		}
		catch (err) {
			return fail(400, { delete: { message: err instanceof Error ? err.message : 'Silme başarısız' } })
		}
		throw redirect(303, '/panel/kategoriler')
	},
}
