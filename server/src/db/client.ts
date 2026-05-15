import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { env, resolveSqlitePath } from '../env.js'
import * as schema from './schema.js'

const dbPath = resolveSqlitePath(env.DATABASE_URL)
mkdirSync(dirname(dbPath), { recursive: true })

export const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

export const db = drizzle(sqlite, { schema })
export type DB = typeof db
