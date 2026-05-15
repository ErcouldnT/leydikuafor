import { asc } from 'drizzle-orm'
import { Router } from 'express'
import { db } from '../db/client.js'
import { categories, services } from '../db/schema.js'

interface Fiyat { ad: string, fiyat: number }
interface HizmetDTO {
	kategori: string
	foto: string
	fotoYön: string
	açıklama?: string
	fiyatlar: Fiyat[]
}

export const hizmetlerRouter: Router = Router()

hizmetlerRouter.get('/', (_req, res) => {
	const cats = db.select().from(categories).orderBy(asc(categories.sira), asc(categories.id)).all()
	const svcs = db.select().from(services).orderBy(asc(services.sira), asc(services.id)).all()

	const byCategory = new Map<number, Fiyat[]>()
	for (const s of svcs) {
		const list = byCategory.get(s.categoryId) ?? []
		list.push({ ad: s.ad, fiyat: s.fiyat })
		byCategory.set(s.categoryId, list)
	}

	const payload: HizmetDTO[] = cats.map((c) => {
		const item: HizmetDTO = {
			kategori: c.kategori,
			foto: c.foto,
			fotoYön: c.fotoYon,
			fiyatlar: byCategory.get(c.id) ?? [],
		}
		if (c.aciklama !== null && c.aciklama !== undefined) {
			item.açıklama = c.aciklama
		}
		return item
	})

	res.json(payload)
})
