<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { Product } from '@/types/Product';

	type ReturnType = {
		products: Product[];
	}

	const productList = ref<Product[]>([]);
	const sortedProducts = ref<Product[]>([]);

	try {
		const { data, error } = await useFetch<ReturnType>('http://localhost:3000/products.json');

		if (error.value?.message) {
			throw new Error(error.value?.message);
		}

		productList.value = data.value?.products || [];
		sortedProducts.value = data.value?.products || [];
	} catch (error) {
		console.error(error);
	}


	const numberOfProducts = computed(() => sortedProducts.value.length);

	function updateSorted(products: Product[]) {
		sortedProducts.value = products;
	}
</script>

<template>
	<div class="container">
		<h1><span style="font-weight: 300;">Kies uit maar liefst</span> <span :class="$style['gradient-text']">{{ numberOfProducts }} telefoons</span></h1>
		<FilterSort :products="productList" @sort="updateSorted" @filter="updateSorted" />
		<div v-if="productList" :class="$style['product-list']">
			<ProductCard v-for="product in sortedProducts" :key="product.id" :product="product" />
			<h2 v-if="!sortedProducts.length" style="grid-column: span 3;">Er zijn geen producten gevonden die voldoen aan de filters.</h2>
		</div>
	</div>
</template>

<style module lang="scss">
	.product-list {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1rem;
	}

	.gradient-text {
		background: linear-gradient(355deg, #deff00 0%, #00c300 30%, var(--color-kux-heading-primary) 100%);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	@media screen and (min-width: 768px) {
		.product-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
