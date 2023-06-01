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
		border-bottom: 1px solid var(--color-kux-border);
		z-index: 1;
	}
	.logo {
		display: block;
		height: 35px;
		margin: 0 auto;
		fill: var(--color-kux-text-primary);
	}
</style>

