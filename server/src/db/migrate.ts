import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db, sqlite } from './client.js'

const here = dirname(fileURLToPath(import.meta.url))
const migrationsFolder = resolve(here, '../../drizzle')

export function runMigrations(): void {
	migrate(db, { migrationsFolder })
}

const invokedDirectly = process.argv[1] !== undefined
	&& fileURLToPath(import.meta.url) === resolve(process.argv[1])

if (invokedDirectly) {
	runMigrations()
	console.warn('Migrations uygulandı.')
	sqlite.close()
}
