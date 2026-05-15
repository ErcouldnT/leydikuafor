export interface Fiyat {
	ad: string
	fiyat: number
}

export interface Hizmet {
	kategori: string
	foto: string
	fotoYön: string
	açıklama?: string
	fiyatlar: Fiyat[]
}

export type HizmetlerResult =
	| { data: Hizmet[], fallback: false }
	| { data: Hizmet[], fallback: true }

export interface Category {
	id: number
	slug: string
	kategori: string
	foto: string
	fotoYon: 'sol' | 'sağ'
	aciklama: string | null
	sira: number
	createdAt: string
	updatedAt: string
}

export interface Service {
	id: number
	categoryId: number
	ad: string
	fiyat: number
	sira: number
	createdAt: string
	updatedAt: string
}
