export type Fiyat = {
	ad: string
	fiyat: number
}

export type Hizmet = {
	kategori: string
	foto: string
	fotoYön: string
	açıklama?: string
	fiyatlar: Fiyat[]
}

export type HizmetlerResult =
	| { data: Hizmet[], fallback: false }
	| { data: Hizmet[], fallback: true }

export type Category = {
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

export type Service = {
	id: number
	categoryId: number
	ad: string
	fiyat: number
	sira: number
	createdAt: string
	updatedAt: string
}
