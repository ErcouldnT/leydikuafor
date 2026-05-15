import process from 'node:process'
import cors from 'cors'
import express, { type Express, type Request, type Response } from 'express'
import helmet from 'helmet'
import { sqlite } from './db/client.js'
import { runMigrations } from './db/migrate.js'
import { seed } from './db/seed.js'
import { env } from './env.js'
import { requireAuth } from './middleware/auth.js'
import { errorHandler, notFoundHandler } from './middleware/error.js'
import { categoriesRouter } from './routes/categories.js'
import { hizmetlerRouter } from './routes/hizmetler.js'
import { servicesRouter } from './routes/services.js'

function createApp(): Express {
	const app = express()

	app.use(helmet())
	app.use(
		cors({
			origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',').map(o => o.trim()),
			credentials: false,
		}),
	)
	app.use(express.json({ limit: '100kb' }))

	app.get('/api/health', (_req: Request, res: Response) => {
		res.json({ ok: true, ts: new Date().toISOString() })
	})

	app.use('/api/hizmetler', hizmetlerRouter)
	app.use('/api/categories', requireAuth, categoriesRouter)
	app.use('/api/services', requireAuth, servicesRouter)

	app.use(notFoundHandler)
	app.use(errorHandler)

	return app
}

function bootstrap(): void {
	runMigrations()
	const seedResult = seed()
	if (seedResult.categoriesInserted > 0) {
		console.warn(`[seed] ${seedResult.categoriesInserted} kategori, ${seedResult.servicesInserted} servis eklendi`)
	}

	const app = createApp()
	const server = app.listen(env.PORT, () => {
		console.warn(`[api] http://0.0.0.0:${env.PORT} (${env.NODE_ENV})`)
	})

	const shutdown = (signal: string): void => {
		console.warn(`[api] ${signal} alındı, kapatılıyor...`)
		server.close(() => {
			sqlite.close()
			process.exit(0)
		})
	}
	process.on('SIGTERM', () => shutdown('SIGTERM'))
	process.on('SIGINT', () => shutdown('SIGINT'))
}

bootstrap()
