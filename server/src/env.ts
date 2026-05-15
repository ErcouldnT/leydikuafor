import process from 'node:process'
import { config } from 'dotenv'
import { z } from 'zod'

config()

const schema = z.object({
	PORT: z.coerce.number().int().positive().default(3000),
	DATABASE_URL: z.string().default('file:./data/leydi.db'),
	ADMIN_PASSWORD: z.string().min(1, 'ADMIN_PASSWORD env zorunlu'),
	CORS_ORIGIN: z.string().default('*'),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
	console.error('Geçersiz environment:', parsed.error.flatten().fieldErrors)
	process.exit(1)
}

export const env = parsed.data
export type Env = z.infer<typeof schema>

export function resolveSqlitePath(url: string): string {
	return url.startsWith('file:') ? url.slice(5) : url
}
