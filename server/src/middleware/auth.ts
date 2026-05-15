import type { NextFunction, Request, Response } from 'express'
import { env } from '../env.js'

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
	const header = req.header('authorization') ?? ''
	const prefix = 'Bearer '
	if (!header.startsWith(prefix)) {
		res.status(401).json({ error: 'Unauthorized' })
		return
	}
	const token = header.slice(prefix.length).trim()
	if (token !== env.ADMIN_PASSWORD) {
		res.status(401).json({ error: 'Unauthorized' })
		return
	}
	next()
}
