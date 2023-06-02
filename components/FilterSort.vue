<script setup lang="ts">
import { ProductType, FilterType, colorMap, osMap  } from '~/types/Product';

	const props = defineProps({
		products: {
			type: Array<ProductType>,
			required: true
		}
	})

	const emit = defineEmits(['sort', 'filter']);
	// Add type for filters
	const filters = ref<FilterType>({
		manufacturer: '',
		color: '',
		has_5g: null,
		operating_system: '',
		has_esim: null,
		refurbished: null,
		sort: 'sort-order'
	});
	const filtersOpen = ref(false);

	const collectManufacturers = computed(() => {
		const manufacturers = new Set<string>(props.products.map(product => product.manufacturer));

		return [...manufacturers].sort();
	});

	const collectColors = computed(() => {
		const colors = new Set<any>();

		props.products.forEach(product => {
			product.colors.forEach(color => {
				colors.add(color);
			})
		})

		return [...colors].sort();
	});

	const collectOperatingSystems = computed(() => {
		const operatingSystems = new Set<string>(props.products.map(product => product.operating_system));

		return [...operatingSystems].sort();
	});

	function filterProducts() {
		const filterKeys = Object.keys(filters.value);

		const filteredArray = props.products.filter(product => {
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

		filtersOpen.value = true;
		return emit('filter', sortProducts(filteredArray));
	}

	function sortProducts(products: ProductType[]) {
		if (filters.value.sort === 'manufacturer') {
			return products.sort((a, b) => a.manufacturer > b.manufacturer ? 1 : -1);
		}

		return products.sort((a, b) => a.sort_order > b.sort_order ? 1 : -1);
	}

	function resetFilters() {
		filters.value = {
			manufacturer: '',
			color: '',
			has_5g: null,
			operating_system: '',
			has_esim: null,
			refurbished: null,
			sort: 'sort-order'
		}

		filterProducts();
		filtersOpen.value = false;
	}
</script>

<template>
	<form :class="$style['filter-and-sort']">
		<div :class="$style['wrapper']">
			<div :class="$style['filters']">
				<label>
					<select v-model="filters.manufacturer" @change="filterProducts">
						<option value="">Kies een merk</option>
						<option v-for="manufacturer in collectManufacturers" :value="manufacturer">{{ manufacturer }}</option>
					</select>
				</label>
				<label>
					<select v-model="filters.color" @change="filterProducts">
						<option value="">Kies een kleur</option>
						<option v-for="color in collectColors" :value="color">{{ colorMap.get(color) }}</option>
					</select>
				</label>
				<label>
					<select v-model="filters.has_5g" @change="filterProducts">
						<option :value="null">5G</option>
						<option :value="true">Ja</option>
						<option :value="false">Nee</option>
					</select>
				</label>
				<label>
					<select v-model="filters.operating_system" @change="filterProducts">
						<option value="">OS</option>
						<option v-for="operatingSystem in collectOperatingSystems" :value="operatingSystem">{{ osMap.get(operatingSystem) }}</option>
					</select>
				</label>
				<label>
					<select v-model="filters.has_esim" @change="filterProducts">
						<option :value="null">E-Sim</option>
						<option :value="true">Ja</option>
						<option :value="false">Nee</option>
					</select>
				</label>
				<label>
					<select v-model="filters.refurbished" @change="filterProducts">
						<option :value="null">Refurbished</option>
						<option :value="true">Ja</option>
						<option :value="false">Nee</option>
					</select>
				</label>
			</div>
			<div :class="$style['sort']">
				<label>
					Sorteer op:
					<select v-model="filters.sort" @change="filterProducts">
						<option value="sort-order">Meest verkocht</option>
						<option value="manufacturer">Merk</option>
					</select>
				</label>
			</div>
		</div>
		<button v-if="filtersOpen" :class="$style['reset-button']" @click="resetFilters">Reset filters</button>
	</form>
</template>

<style module lang="scss">
	.filter-and-sort {
		margin: 1rem 0;
		padding: 1.5rem 1rem;
		width: 100%;
		border-radius: var(--border-radius-medium);
		background-color: var(--color-kux-background);

		.wrapper {
			display: grid;
			grid-template-columns: 1fr;
			align-items: end;
		}

		.filters {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.sort {
			margin-top: 2rem;
		}

		.reset-button {
			margin-top: 1rem;
			padding: 0 0.75rem;
			background-color: transparent;
			border: 0;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
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

			.wrapper {
				grid-template-columns: 3fr 1fr;
			}
			.filters {
				flex-direction: row;
			}

			.sort {
				margin-top: 0;
				text-align: right;
			}

			select {
				width: auto;
			}
		}
	}
</style>
