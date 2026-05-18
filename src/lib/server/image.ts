import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const UPLOAD_DIR = 'static/uploads'
const MAX_WIDTH = 1200
const MAX_HEIGHT = 1200
const JPEG_QUALITY = 80

/**
 * Yüklenen fotoğrafı optimize edip diske kaydeder.
 * - WebP formatına dönüştürür
 * - Maksimum 1200x1200 boyutuna resize eder
 * - Kalite: %80
 * @returns `/uploads/filename.webp` şeklinde public URL
 */
export async function optimizeAndSaveImage(file: File): Promise<string> {
	await fs.mkdir(UPLOAD_DIR, { recursive: true })

	const arrayBuffer = await file.arrayBuffer()
	const inputBuffer = Buffer.from(arrayBuffer)

	const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`
	const filePath = path.join(UPLOAD_DIR, fileName)

	await sharp(inputBuffer)
		.resize(MAX_WIDTH, MAX_HEIGHT, {
			fit: 'inside',
			withoutEnlargement: true,
		})
		.webp({ quality: JPEG_QUALITY })
		.toFile(filePath)

	return `/uploads/${fileName}`
}
