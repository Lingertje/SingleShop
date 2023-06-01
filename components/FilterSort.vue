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
		manufacturer: '',
		color: '',
		'5g': null,
		operatingSystem: '',
		esim: null,
		refurbished: null
	});

	const collectManufacturers = computed(() => {
		const manufacturers = new Set<String>();

		props.products.forEach(product => {
			manufacturers.add(product.manufacturer);
		});

		return Array.from(manufacturers);
	});

	const filterProducts = computed(() => {
		let filteredArray = [...props.products];

		if (filters.value.manufacturer !== '') {
			filteredArray = filteredArray.filter(product => product.manufacturer === filters.value.manufacturer);
		}

		if (filters.value.color !== '') {
			filteredArray = filteredArray.filter(product => product.colors.includes(filters.value.color));
		}

		if (filters.value['5g'] !== null) {
			filteredArray = filteredArray.filter(product => product.has_5g === filters.value['5g']);
		}

		if (filters.value.operatingSystem !== '') {
			filteredArray = filteredArray.filter(product => product.operating_system === filters.value.operatingSystem);
		}

		if (filters.value.esim !== null) {
			filteredArray = filteredArray.filter(product => product.has_esim === filters.value.esim);
		}

		if (filters.value.refurbished !== null) {
			filteredArray = filteredArray.filter(product => product.refurbished === filters.value.refurbished);
		}

		return emit('filter', sortProducts(filteredArray));
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
				<select v-model="filters.manufacturer" @change="filterProducts!">
					<option value="">Kies een merk</option>
					<option v-for="manufacturer in collectManufacturers" :value="manufacturer">{{ manufacturer }}</option>
				</select>
			</label>
			<span>Kleur</span>
			<label>
				<select v-model="filters['5g']" @change="filterProducts!">
					<option :value="null">5G</option>
					<option :value="true">Ja</option>
					<option :value="false">Nee</option>
				</select>
			</label>
			<span>Besturingsysteem</span>
			<label>
				<select v-model="filters.esim" @change="filterProducts!">
					<option :value="null">E-Sim</option>
					<option :value="true">Ja</option>
					<option :value="false">Nee</option>
				</select>
			</label>
			<label>
				<select v-model="filters.refurbished" @change="filterProducts!">
					<option :value="null">Refurbished</option>
					<option :value="true">Ja</option>
					<option :value="false">Nee</option>
				</select>
			</label>
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
		grid-template-columns: 1fr;
		align-items: end;
		margin: 1rem 0;
		padding: 1.5rem 1rem;
		width: 100%;
		border-radius: var(--border-radius-medium);
		background-color: var(--color-kux-background);

		.filters {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		select {
			font-weight: 700;
			padding: 0 1.5rem 0 0.5rem;
			border: 0;
			outline: none;
		}
	}

	@media screen and (min-width: 1200px) {
		.filter-and-sort {
			grid-template-columns: 3fr 1fr;
			.filters {
				flex-direction: row;
			}
		}
	}
</style>
