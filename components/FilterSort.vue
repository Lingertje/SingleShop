<script setup lang="ts">
import { Product } from '~/types/Product';

	const props = defineProps({
		products: {
			type: Array<Product>,
			required: true
		}
	})

	const emit = defineEmits(['sort', 'filter']);
	const sort = ref('sort-order');
	const filters = ref({
		manufacturer: ''
	});

	const collectManufacturers = computed(() => {
		const manufacturers = new Set<String>();

		props.products.forEach(product => {
			manufacturers.add(product.manufacturer);
		});

		return Array.from(manufacturers);
	});

	const filterProducts = computed(() => {
		if (filters.value.manufacturer === '') {
			return emit('filter', sortProducts(props.products));
		}

		return emit('filter', sortProducts(props.products.filter(product => product.manufacturer === filters.value.manufacturer)));
	})

	function sortProducts(products: Product[]) {
		if (sort.value === 'manufacturer') {
			return products.sort((a, b) => a.manufacturer > b.manufacturer ? 1 : -1);
		}

		return products.sort((a, b) => a.sort_order > b.sort_order ? 1 : -1);
	}
</script>

<template>
	<form :class="$style['filter-and-sort']">
		<div :class="$style['filters']">
			<label>
				Merk:
				<select v-model="filters.manufacturer" @change="filterProducts!">
					<option value="">Kies een merk</option>
					<option v-for="manufacturer in collectManufacturers" :value="manufacturer">{{ manufacturer }}</option>
				</select>
			</label>
			<span>Kleur</span>
			<span>5G</span>
			<span>Besturingsysteem</span>
			<span>E-sim</span>
			<span>Refurbished</span>
		</div>
		<div>
			<label>
				Sorteer op:
				<select v-model="sort" @change="filterProducts!">
					<option value="sort-order">Meest verkocht</option>
					<option value="manufacturer">Merk</option>
				</select>
			</label>
		</div>
	</form>
</template>

<style module lang="scss">
	.filter-and-sort {
		display: grid;
		grid-template-columns: 3fr 1fr;
		align-items: end;
		margin: 1rem 0;
		padding: 1.5rem 1rem;
		width: 100%;
		border-radius: var(--border-radius-medium);
		background-color: var(--color-kux-background);

		.filters {
			display: flex;
			flex-direction: row;
			gap: 1rem;
		}

		select {
			font-weight: 700;
			padding: 0 2rem 0 0.5rem;
			border: 0;
			outline: none;
		}
	}
</style>
