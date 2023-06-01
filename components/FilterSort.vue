<script setup lang="ts">
import { Product } from '~/types/Product';

	const props = defineProps({
		products: {
			type: Array<Product>,
			required: true
		}
	})

	const emit = defineEmits(['sort', 'filter']);
	const filters = ref({
		manufacturer: '',
		color: '',
		has_5g: null,
		operating_system: '',
		has_esim: null,
		refurbished: null,
		sort: 'sort-order'
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
		const filterKeys = Object.keys(filters.value);

		filteredArray = filteredArray.filter(product => {
			return filterKeys.every(key => {
				// @ts-ignore
				if (filters.value[key] === '' || filters.value[key] === null || key === 'sort') {
					return true;
				}

				if (key === 'color') {
					return product.colors.includes(filters.value.color);
				}

				// @ts-ignore
				return product[key] === filters.value[key];
			})
		})

		return emit('filter', sortProducts(filteredArray));
	})

	function sortProducts(products: Product[]) {
		if (filters.value.sort === 'manufacturer') {
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
				<select v-model="filters.has_5g" @change="filterProducts!">
					<option :value="null">5G</option>
					<option :value="true">Ja</option>
					<option :value="false">Nee</option>
				</select>
			</label>
			<label>
				<select v-model="filters.operating_system" @change="filterProducts!">
					<option value="">Besturingssysteem</option>
					<option value="IOS">iOS</option>
					<option value="ANDROID">Android</option>
				</select>
			</label>
			<label>
				<select v-model="filters.has_esim" @change="filterProducts!">
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
				<select v-model="filters.sort" @change="filterProducts!">
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
			width: 100%;
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

			select {
				width: auto;
			}
		}
	}
</style>
