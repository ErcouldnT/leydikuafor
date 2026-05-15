import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { db, sqlite } from './client.js'
import { categories, services, type NewCategory, type NewService } from './schema.js'

type SeedFiyat = { ad: string, fiyat: number }
type SeedKategori = Omit<NewCategory, 'id' | 'createdAt' | 'updatedAt'> & {
	fiyatlar: SeedFiyat[]
}

const seedData: SeedKategori[] = [
	{
		slug: 'sac-islemleri',
		kategori: 'Saç İşlemleri',
		foto: '/images/gelin.jpg',
		fotoYon: 'sol',
		aciklama: '*Fiyatlar saçın boyuna ve rengine göre değişim gösterebilir.',
		sira: 0,
		fiyatlar: [
			{ ad: 'Saç Kesimi', fiyat: 600 },
			{ ad: 'Saç Yıkama', fiyat: 300 },
			{ ad: 'Fön Çekme', fiyat: 400 },
			{ ad: 'Topuz', fiyat: 800 },
			{ ad: 'Tesettür', fiyat: 800 },
			{ ad: 'Maşa', fiyat: 800 },
			{ ad: 'Örgü', fiyat: 600 },
			{ ad: 'Dip Boya', fiyat: 1000 },
			{ ad: 'Açma Boya (Bütün)', fiyat: 4500 },
			{ ad: 'Saç Boyama (Bütün)', fiyat: 1300 },
			{ ad: 'Röfle', fiyat: 4500 },
			{ ad: 'Renk Kırma', fiyat: 3000 },
			{ ad: 'Cila', fiyat: 600 },
			{ ad: 'Dip Açma', fiyat: 3500 },
			{ ad: 'Ombre', fiyat: 4500 },
			{ ad: 'Sombre', fiyat: 4500 },
			{ ad: 'Keratin Düzleştirici', fiyat: 3600 },
			{ ad: 'Brezilya Fönü', fiyat: 3500 },
			{ ad: 'Perma', fiyat: 3500 },
			{ ad: 'Gelin Saçı Makyaj', fiyat: 10000 },
			{ ad: 'Kına Saçı Makyaj', fiyat: 7000 },
			{ ad: 'Nişan Saçı Makyaj', fiyat: 7000 },
		],
	},
	{
		slug: 'manikur-kas-makyaj',
		kategori: 'Manikür-Kaş-Makyaj',
		foto: '/images/tesettur.jpg',
		fotoYon: 'sağ',
		aciklama: null,
		sira: 1,
		fiyatlar: [
			{ ad: 'Manikür', fiyat: 350 },
			{ ad: 'Pedikür', fiyat: 500 },
			{ ad: 'Kaş Bıyık Alma', fiyat: 200 },
			{ ad: 'Günlük Makyaj', fiyat: 800 },
			{ ad: 'Takma Kirpik', fiyat: 300 },
			{ ad: 'Porselen Makyaj', fiyat: 2500 },
		],
	},
	{
		slug: 'agda',
		kategori: 'Ağda',
		foto: '/images/orgu.jpg',
		fotoYon: 'sol',
		aciklama: null,
		sira: 2,
		fiyatlar: [
			{ ad: 'Tüm Vücut Ağda', fiyat: 1600 },
			{ ad: 'Yüz Ağda', fiyat: 350 },
			{ ad: 'Koltuk Altı Ağda', fiyat: 200 },
			{ ad: 'Yarım Kol Ağda', fiyat: 200 },
			{ ad: 'Yarım Bacak Ağda', fiyat: 250 },
			{ ad: 'Bütün Kol Ağda', fiyat: 250 },
			{ ad: 'Bütün Bacak Ağda', fiyat: 500 },
			{ ad: 'Bikini Bölgesi Ağda', fiyat: 350 },
		],
	},
]

export function seed(): { categoriesInserted: number, servicesInserted: number } {
	const existing = db.select().from(categories).all()
	if (existing.length > 0) {
		return { categoriesInserted: 0, servicesInserted: 0 }
	}

	let servicesInserted = 0

	db.transaction((tx) => {
		for (const cat of seedData) {
			const { fiyatlar, ...rest } = cat
			const inserted = tx.insert(categories).values(rest).returning({ id: categories.id }).all()
			const first = inserted[0]
			if (!first) throw new Error('Kategori eklenemedi')
			const categoryId = first.id

			const rows: NewService[] = fiyatlar.map((f, idx) => ({
				categoryId,
				ad: f.ad,
				fiyat: f.fiyat,
				sira: idx,
			}))
			if (rows.length > 0) {
				tx.insert(services).values(rows).run()
				servicesInserted += rows.length
			}
		}
	})

	return { categoriesInserted: seedData.length, servicesInserted }
}

const invokedDirectly = process.argv[1] !== undefined
	&& fileURLToPath(import.meta.url) === resolve(process.argv[1])

if (invokedDirectly) {
	const result = seed()
	console.log('Seed tamamlandı:', result)
	sqlite.close()
}
