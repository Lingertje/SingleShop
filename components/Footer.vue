<script setup>

</script>

<template>
	<footer>
		<p><NuxtLink to="https://github.com/Lingertje">@Lingertje</NuxtLink> - {{ new Date().getFullYear() }}</p>
	</footer>
</template>

<style module lang="scss">
	footer {
		margin-top: 2rem;
		padding: 1rem 0;
		background-color: var(--color-kux-background);

		p {
			margin: 0;
			text-align: center;
		}

		a {
			color: initial;
			font-weight: 800;
			text-decoration: none;
		}
	}
</style>
