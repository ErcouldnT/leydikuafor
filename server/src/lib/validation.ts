import { z } from 'zod'

export const fotoYonSchema = z.enum(['sol', 'sağ'])

export const categoryCreateSchema = z.object({
	slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'slug yalnızca küçük harf, rakam ve tire içerebilir'),
	kategori: z.string().min(1).max(120),
	foto: z.string().min(1).max(300),
	fotoYon: fotoYonSchema,
	aciklama: z.string().max(500).nullable().optional(),
	sira: z.number().int().min(0).default(0),
})

export const categoryUpdateSchema = categoryCreateSchema.partial()

export const serviceCreateSchema = z.object({
	categoryId: z.number().int().positive(),
	ad: z.string().min(1).max(120),
	fiyat: z.number().int().min(0),
	sira: z.number().int().min(0).default(0),
})

export const serviceUpdateSchema = serviceCreateSchema.partial()

export const idParamSchema = z.object({
	id: z.coerce.number().int().positive(),
})

export type CategoryCreate = z.infer<typeof categoryCreateSchema>
export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>
export type ServiceCreate = z.infer<typeof serviceCreateSchema>
export type ServiceUpdate = z.infer<typeof serviceUpdateSchema>
