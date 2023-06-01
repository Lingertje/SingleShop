<template>
	<div :class="$style['wrapper']">
		<Navbar />
		<main>
			<slot />
		</main>
		<Footer />
	</div>
</template>

<style module lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		main {
			flex-grow: 1;
		}
	}
</style>
