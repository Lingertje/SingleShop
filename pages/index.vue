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


	const numberOfProducts = computed(() => productList.value.length);
</script>

<template>
	<div class="container">
		<h1><span style="font-weight: 300;">Kies uit maar liefst</span> {{ numberOfProducts }} telefoons</h1>
		<form></form>
		<ul v-if="productList" class="reset-list">
			<li v-for="product in productList" :key="`product-id-${product.id}`">
				<p>{{ product.manufacturer }}</p>
				<h3>{{ product.model }}</h3>
			</li>
		</ul>
	</div>
</template>
