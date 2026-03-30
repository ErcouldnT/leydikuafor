<script lang='ts'>
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import '../app.css'
</script>

<svelte:head>
	<title>Giresun Leydi Kuaför | Özel İlgiyi Hak Ediyorsunuz</title>
	<meta
		name='description'
		content="Giresun/Merkez Suat Akgün Sokak'ta bulunan yeni yerimizde 32 yıllık tecrübemizle siz değerli müşterilerimize Giresun'un en iyi kuaförü Leydi Kuaför'de hizmet vermekten mutluluk duyarız."
	/>
	<meta property='og:title' content='Giresun Leydi Kuaför | Özel İlgiyi Hak Ediyorsunuz' />
	<meta property='og:description' content="Giresun/Merkez Suat Akgün Sokak'ta bulunan yeni yerimizde 32 yıllık tecrübemizle siz değerli müşterilerimize Giresun'un en iyi kuaförü Leydi Kuaför'de hizmet vermekten mutluluk duyarız." />
</svelte:head>

<div class='flex min-h-screen flex-col'>
	<Header />
	<main class='flex-grow'>
		<slot />
	</main>
	<Footer />
</div>
