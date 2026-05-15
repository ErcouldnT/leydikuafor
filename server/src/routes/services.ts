import { eq, sql } from 'drizzle-orm'
import { Router } from 'express'
import { db } from '../db/client.js'
import { categories, services } from '../db/schema.js'
import { HttpError } from '../middleware/error.js'
import {
	idParamSchema,
	serviceCreateSchema,
	serviceUpdateSchema,
} from '../lib/validation.js'

export const servicesRouter: Router = Router()

servicesRouter.get('/:id', (req, res) => {
	const { id } = idParamSchema.parse(req.params)
	const row = db.select().from(services).where(eq(services.id, id)).get()
	if (!row) throw new HttpError(404, 'Servis bulunamadı')
	res.json(row)
})

servicesRouter.post('/', (req, res) => {
	const data = serviceCreateSchema.parse(req.body)
	const cat = db.select().from(categories).where(eq(categories.id, data.categoryId)).get()
	if (!cat) throw new HttpError(400, 'Geçersiz categoryId')

	const inserted = db.insert(services).values(data).returning().all()
	const created = inserted[0]
	if (!created) throw new HttpError(500, 'Servis eklenemedi')
	res.status(201).json(created)
})

servicesRouter.put('/:id', (req, res) => {
	const { id } = idParamSchema.parse(req.params)
	const data = serviceUpdateSchema.parse(req.body)
	if (data.categoryId !== undefined) {
		const cat = db.select().from(categories).where(eq(categories.id, data.categoryId)).get()
		if (!cat) throw new HttpError(400, 'Geçersiz categoryId')
	}
	const updated = db
		.update(services)
		.set({ ...data, updatedAt: sql`CURRENT_TIMESTAMP` })
		.where(eq(services.id, id))
		.returning()
		.all()
	const row = updated[0]
	if (!row) throw new HttpError(404, 'Servis bulunamadı')
	res.json(row)
})

servicesRouter.delete('/:id', (req, res) => {
	const { id } = idParamSchema.parse(req.params)
	const deleted = db.delete(services).where(eq(services.id, id)).returning().all()
	if (deleted.length === 0) throw new HttpError(404, 'Servis bulunamadı')
	res.status(204).end()
})
