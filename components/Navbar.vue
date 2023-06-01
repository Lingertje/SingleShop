<template>
	<nav :class="$style['navbar']">
		<NuxtLink to="/">
			<img :class="$style['logo']" src="/kpn-logo.svg">
		</NuxtLink>
	</nav>
</template>

<style module>
	.navbar {
		position: sticky;
		top: 0;
		padding: 1rem 0;
		background-color: var(--color-kux-background);
		box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
		z-index: 1;
	}
	.logo {
		display: block;
		height: 35px;
		margin: 0 auto;
		fill: var(--color-kux-text-primary);
	}
</style>

