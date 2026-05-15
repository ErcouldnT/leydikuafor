import type { Config } from 'drizzle-kit'

const url = process.env.DATABASE_URL ?? 'file:./data/leydi.db'

export default {
	schema: './src/db/schema.ts',
	out: './drizzle',
	dialect: 'sqlite',
	dbCredentials: {
		url: url.startsWith('file:') ? url.slice(5) : url,
	},
} satisfies Config
