import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const categories = sqliteTable('categories', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	slug: text('slug').notNull().unique(),
	kategori: text('kategori').notNull(),
	foto: text('foto').notNull(),
	fotoYon: text('foto_yon', { enum: ['sol', 'sağ'] }).notNull(),
	aciklama: text('aciklama'),
	sira: integer('sira').notNull().default(0),
	createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const services = sqliteTable('services', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categories.id, { onDelete: 'cascade' }),
	ad: text('ad').notNull(),
	fiyat: integer('fiyat').notNull(),
	sira: integer('sira').notNull().default(0),
	createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type Service = typeof services.$inferSelect
export type NewService = typeof services.$inferInsert
