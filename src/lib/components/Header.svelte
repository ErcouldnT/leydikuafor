<script lang='ts'>
	import { MapPin } from '@lucide/svelte'
</script>

<header class='p-10'>
	<div class='flex flex-col items-center justify-center gap-10 lg:flex-row'>
		<div class='flex items-center justify-center gap-2'>
			<div>
				<a href='/' class='flex flex-col gap-2 lg:-ml-40'>
					<div class='caption text-center text-6xl'>Leydi Kuaför</div>
					<div class='slogan text-center text-xl'>Özel İlgiyi Hak Ediyorsunuz</div>
				</a>
			</div>
		</div>
		<div class='flex flex-wrap items-center justify-center gap-5 lg:gap-10'>
			<a href='/hizmetler' class='btn'>Hizmetler</a>
			<a href='whatsapp://send?phone=905426873959' target='_blank' class='btn'>Randevu Al</a>
			<a href='/iletisim' class='btn'>İletişim</a>
			<a href='/hakkimizda' class='btn'>Hakkımızda</a>
		</div>
		<a href='https://goo.gl/maps/2VRWzvpheRA5DNVo6' target='_blank' rel='noreferrer' class='btn gap-2'>
			<MapPin size={24} />
			<div>Lokasyon</div>
		</a>
	</div>
</header>

<style>
	.caption {
		font-family: 'Lobster', cursive;
	}
	.slogan {
		font-family: 'Dancing Script', cursive;
	}
</style>
