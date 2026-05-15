import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export class HttpError extends Error {
	status: number
	constructor(status: number, message: string) {
		super(message)
		this.status = status
	}
}

export function notFoundHandler(_req: Request, res: Response): void {
	res.status(404).json({ error: 'Not Found' })
}

export function errorHandler(
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void {
	if (err instanceof ZodError) {
		res.status(400).json({ error: 'ValidationError', details: err.flatten() })
		return
	}
	if (err instanceof HttpError) {
		res.status(err.status).json({ error: err.message })
		return
	}
	const message = err instanceof Error ? err.message : 'Internal Server Error'
	console.error('[error]', err)
	res.status(500).json({ error: message })
}
