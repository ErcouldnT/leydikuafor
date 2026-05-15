import { env } from '$env/dynamic/private'
import type { Category, Hizmet, Service } from '$lib/types'

const DEFAULT_TIMEOUT_MS = 4000

type FetchFn = typeof fetch

function baseUrl(): string {
	const url = env.API_URL
	if (!url) throw new Error('API_URL env tanımlı değil')
	return url.replace(/\/+$/, '')
}

function authHeaders(): Record<string, string> {
	const pw = env.ADMIN_PASSWORD
	if (!pw) throw new Error('ADMIN_PASSWORD env tanımlı değil')
	return { authorization: `Bearer ${pw}` }
}

export class ApiError extends Error {
	status: number
	body: string
	constructor(status: number, body: string) {
		super(`API ${status}: ${body}`)
		this.status = status
		this.body = body
	}
}

async function request<T>(
	fetchFn: FetchFn,
	path: string,
	init: RequestInit = {},
	timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<T> {
	const ctrl = new AbortController()
	const timer = setTimeout(() => ctrl.abort(), timeoutMs)
	try {
		const res = await fetchFn(baseUrl() + path, {
			...init,
			signal: ctrl.signal,
			headers: {
				'content-type': 'application/json',
				...(init.headers as Record<string, string> | undefined),
			},
		})
		if (!res.ok) {
			const text = await res.text().catch(() => '')
			throw new ApiError(res.status, text)
		}
		if (res.status === 204) {
			return undefined as T
		}
		return (await res.json()) as T
	} finally {
		clearTimeout(timer)
	}
}

export function getHizmetler(fetchFn: FetchFn): Promise<Hizmet[]> {
	return request<Hizmet[]>(fetchFn, '/api/hizmetler')
}

export function listCategories(fetchFn: FetchFn): Promise<Category[]> {
	return request<Category[]>(fetchFn, '/api/categories', { headers: authHeaders() })
}

export function getCategory(fetchFn: FetchFn, id: number): Promise<Category> {
	return request<Category>(fetchFn, `/api/categories/${id}`, { headers: authHeaders() })
}

export function getCategoryServices(fetchFn: FetchFn, id: number): Promise<Service[]> {
	return request<Service[]>(fetchFn, `/api/categories/${id}/services`, { headers: authHeaders() })
}

export type CategoryInput = {
	slug: string
	kategori: string
	foto: string
	fotoYon: 'sol' | 'sağ'
	aciklama?: string | null
	sira?: number
}

export function createCategory(fetchFn: FetchFn, body: CategoryInput): Promise<Category> {
	return request<Category>(fetchFn, '/api/categories', {
		method: 'POST',
		headers: authHeaders(),
		body: JSON.stringify(body),
	})
}

export function updateCategory(
	fetchFn: FetchFn,
	id: number,
	body: Partial<CategoryInput>,
): Promise<Category> {
	return request<Category>(fetchFn, `/api/categories/${id}`, {
		method: 'PUT',
		headers: authHeaders(),
		body: JSON.stringify(body),
	})
}

export function deleteCategory(fetchFn: FetchFn, id: number): Promise<void> {
	return request<void>(fetchFn, `/api/categories/${id}`, {
		method: 'DELETE',
		headers: authHeaders(),
	})
}

export type ServiceInput = {
	categoryId: number
	ad: string
	fiyat: number
	sira?: number
}

export function createService(fetchFn: FetchFn, body: ServiceInput): Promise<Service> {
	return request<Service>(fetchFn, '/api/services', {
		method: 'POST',
		headers: authHeaders(),
		body: JSON.stringify(body),
	})
}

export function updateService(
	fetchFn: FetchFn,
	id: number,
	body: Partial<ServiceInput>,
): Promise<Service> {
	return request<Service>(fetchFn, `/api/services/${id}`, {
		method: 'PUT',
		headers: authHeaders(),
		body: JSON.stringify(body),
	})
}

export function deleteService(fetchFn: FetchFn, id: number): Promise<void> {
	return request<void>(fetchFn, `/api/services/${id}`, {
		method: 'DELETE',
		headers: authHeaders(),
	})
}
