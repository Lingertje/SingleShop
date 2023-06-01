<script setup>
	defineProps({
		product: {
			type: Object,
			required: true
		}
	});
</script>

<template>
	<div :class="$style['card']">
		<NuxtLink :to="`/mobiel/${product.id}`">
			<div :class="$style['image-container']">
				<img src="https://placehold.co/160x240" :alt="product.model" />
			</div>
			<div :class="$style['body-container']">
				<span :class="$style['manufacturer']">{{ product.manufacturer }}</span>
				<h3 :class="$style['title']">{{ product.model }}</h3>
			</div>
		</NuxtLink>
	</div>
</template>

<style module lang="scss">
	.card {
		position: relative;
		border-radius: var(--border-radius-medium);
		background-color: var(--color-kux-background);

		a {
			display: grid;
			grid-gap: 0.5rem;
			padding: 1rem;
			text-decoration: none;
		}
	}

	.title, .manufacturer {
		margin: 0;
		color: initial;
	}

	.title {
		font-weight: 800;
	}
	.manufacturer {
		color: var(--color-kux-text-tertiary);
		font-weight: 300;
	}

	.image-container {
		width: 100%;

		img {
			display: block;
			margin: 0 auto;
		}
	}
</style>
```
