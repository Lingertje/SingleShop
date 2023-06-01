<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { Product } from '@/types/Product';

	const productList: Ref<Product[]> = ref([]);

	fetch('http://localhost:3000/products.json')
		.then(res => res.json())
		.then(data => {
			console.log(data.products);
			productList.value = data.products;
		});


	const sortedProducts = computed(() => productList.value.sort((a, b) => a.sort_order > b.sort_order ? 1 : -1));
	const numberOfProducts = computed(() => sortedProducts.value.length);
</script>

<template>
	<div class="container">
		<h1><span style="font-weight: 300;">Kies uit maar liefst</span> {{ numberOfProducts }} telefoons</h1>
		<form :class="$style['filter-bar']"></form>
		<div v-if="productList" :class="`reset-list ${$style['product-list']}`">
			<ProductCard v-for="product in sortedProducts" :key="product.id" :product="product" />
		</div>
	</div>
</template>

<style module>
	.filter-bar {
		margin: 1rem 0;
		width: 100%;
		height: 80px;
		border-radius: var(--border-radius-medium);
		background-color: var(--color-kux-background);
	}
	.product-list {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1rem;
	}

	@media screen and (min-width: 768px) {
		.product-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
