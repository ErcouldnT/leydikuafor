import { asc, eq, sql } from 'drizzle-orm'
import { Router } from 'express'
import { db } from '../db/client.js'
import { categories, services } from '../db/schema.js'
import {
	categoryCreateSchema,
	categoryUpdateSchema,
	idParamSchema,
} from '../lib/validation.js'
import { HttpError } from '../middleware/error.js'

export const categoriesRouter: Router = Router()

categoriesRouter.get('/', (_req, res) => {
	const rows = db.select().from(categories).orderBy(asc(categories.sira), asc(categories.id)).all()
	res.json(rows)
})

categoriesRouter.get('/:id', (req, res) => {
	const { id } = idParamSchema.parse(req.params)
	const row = db.select().from(categories).where(eq(categories.id, id)).get()
	if (!row)
		throw new HttpError(404, 'Kategori bulunamadı')
	res.json(row)
})

categoriesRouter.get('/:id/services', (req, res) => {
	const { id } = idParamSchema.parse(req.params)
	const rows = db
		.select()
		.from(services)
		.where(eq(services.categoryId, id))
		.orderBy(asc(services.sira), asc(services.id))
		.all()
	res.json(rows)
})

categoriesRouter.post('/', (req, res) => {
	const data = categoryCreateSchema.parse(req.body)
	const inserted = db.insert(categories).values(data).returning().all()
	const created = inserted[0]
	if (!created)
		throw new HttpError(500, 'Kategori eklenemedi')
	res.status(201).json(created)
})

categoriesRouter.put('/:id', (req, res) => {
	const { id } = idParamSchema.parse(req.params)
	const data = categoryUpdateSchema.parse(req.body)
	const updated = db
		.update(categories)
		.set({ ...data, updatedAt: sql`CURRENT_TIMESTAMP` })
		.where(eq(categories.id, id))
		.returning()
		.all()
	const row = updated[0]
	if (!row)
		throw new HttpError(404, 'Kategori bulunamadı')
	res.json(row)
})

categoriesRouter.delete('/:id', (req, res) => {
	const { id } = idParamSchema.parse(req.params)
	const deleted = db.delete(categories).where(eq(categories.id, id)).returning().all()
	if (deleted.length === 0)
		throw new HttpError(404, 'Kategori bulunamadı')
	res.status(204).end()
})
