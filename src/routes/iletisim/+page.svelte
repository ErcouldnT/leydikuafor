<script>
	import dukkan from '$lib/assets/dukkan.jpg?enhanced';
	import dukkan2 from '$lib/assets/dukkan2.jpg?enhanced';
	import dukkan3 from '$lib/assets/dukkan3.jpg?enhanced';
	import dukkan4 from '$lib/assets/dukkan4.jpg?enhanced';
</script>

<div class="lg:p-10 py-5 flex flex-col justify-center items-center">
	<div class="text-xl py-5">İletişim Adreslerimiz</div>
	<div class="grid grid-cols-2 gap-2 border rounded-xl p-5">
		<div>GSM</div>
		<a href="tel:905426873959">+90 542 687 39 59</a>
		<div>Sabit Hat</div>
		<a href="tel:904542169758">+90 454 216 97 58</a>
		<div>Email</div>
		<a href="mailto:kazim@leydikuafor.com">kazim@leydikuafor.com</a>
		<div>Adres</div>
		<div>
			Şeyh Keramettin Mah. <br />Suat Akgün Sokak <br />No: 27 <br />Giresun/Merkez
			<br />Giresun Leydi Kuaför
		</div>
	</div>
</div>

<main class="grid lg:grid-cols-4 lg:gap-1 gap-4">
	<enhanced:img
		class="h-full w-full aspect-auto hover:opacity-70"
		src={dukkan}
		loading="lazy"
		alt="dukkan"
	/>
	<enhanced:img
		class="h-full w-full aspect-auto hover:opacity-70"
		src={dukkan2}
		loading="lazy"
		alt="dukkan2"
	/>
	<enhanced:img
		class="h-full w-full aspect-auto hover:opacity-70"
		src={dukkan3}
		loading="lazy"
		alt="dukkan3"
	/>
	<enhanced:img
		class="h-full w-full aspect-auto hover:opacity-70"
		src={dukkan4}
		loading="lazy"
		alt="dukkan4"
	/>
</main>
