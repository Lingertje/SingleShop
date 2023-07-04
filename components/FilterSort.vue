<script setup lang="ts">
import { ProductType, FilterType, colorMap, osMap  } from '~/types/Product';
import {useFilterStore} from '~/stores/FilterStore';

	const props = defineProps({
		products: {
			type: Array<ProductType>,
			required: true
		}
	})

	const emit = defineEmits(['filter']);
	const store = useFilterStore();

	const filters = computed((): FilterType => {
		return {
			manufacturer: store.filters.manufacturer ?? '',
			color: store.filters.color ?? '',
			operating_system: store.filters.operating_system ?? '',
			has_5g: store.filters.has_5g ?? '',
			has_esim: store.filters.has_esim ?? '',
			refurbished: store.filters.refurbished ?? '',
			sort: store.filters.sort ?? 'sort-order'
		}
	});

	store.$subscribe(filterProducts);

	function collectOption(key: any) {
		// @ts-ignore
		return [...new Set<string>(props.products.map(product => product[key]))].sort();
	}

	const collectManufacturers = computed(() => {
		return collectOption('manufacturer');
	});

	const collectOperatingSystems = computed(() => {
		return collectOption('operating_system');
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

	function filterProducts() {
		const filterKeys = Object.keys(store.filters);

		const filteredArray = props.products.filter(product => {
			return filterKeys.every(key => {
				// @ts-ignore
				if (store.filters[key] === '' || store.filters[key] === null || key === 'sort') {
					return true;
				}

				if (key === 'color') {
					return product.colors.includes(store.filters.color);
				}

				// @ts-ignore
				return product[key].toString() === store.filters[key];
			})
		})

		return emit('filter', sortProducts(filteredArray));
	}

	function sortProducts(products: ProductType[]) {
		if (store.filters.sort === 'manufacturer') {
			return products.sort((a, b) => a.manufacturer > b.manufacturer ? 1 : -1);
		}

		return products.sort((a, b) => a.sort_order > b.sort_order ? 1 : -1);
	}

	function resetFilters() {
		store.$reset();
	}
</script>

<template>
	<form :class="$style['filter-and-sort']">
		<div :class="$style['wrapper']">
			<div :class="$style['filters']">
				<label>
					<select v-model="filters.manufacturer" @change="(e: Event) => store.add({'manufacturer': (e?.currentTarget as HTMLSelectElement)?.value})">
						<option value="">Kies een merk</option>
						<option v-for="manufacturer in collectManufacturers" :value="manufacturer">{{ manufacturer }}</option>
					</select>
				</label>
				<label>
					<select v-model="filters.color" @change="(e: Event) => store.add({'color': (e?.currentTarget as HTMLSelectElement)?.value})">
						<option value="">Kies een kleur</option>
						<option v-for="color in collectColors" :value="color">{{ colorMap.get(color) }}</option>
					</select>
				</label>
				<label>
					<select v-model="filters.has_5g" @change="(e: Event) => store.add({'has_5g': (e?.currentTarget as HTMLSelectElement)?.value})">
						<option value="">5G</option>
						<option :value="true">Ja</option>
						<option :value="false">Nee</option>
					</select>
				</label>
				<label>
					<select v-model="filters.operating_system" @change="(e: Event) => store.add({'operating_system': (e?.currentTarget as HTMLSelectElement)?.value})">
						<option value="">OS</option>
						<option v-for="operatingSystem in collectOperatingSystems" :value="operatingSystem">{{ osMap.get(operatingSystem) }}</option>
					</select>
				</label>
				<label>
					<select v-model="filters.has_esim" @change="(e: Event) => store.add({'has_esim': (e?.currentTarget as HTMLSelectElement)?.value})">
						<option value="">E-Sim</option>
						<option :value="true">Ja</option>
						<option :value="false">Nee</option>
					</select>
				</label>
				<label>
					<select v-model="filters.refurbished" @change="(e: Event) => store.add({'refurbished': (e?.currentTarget as HTMLSelectElement)?.value})">
						<option value="">Refurbished</option>
						<option :value="true">Ja</option>
						<option :value="false">Nee</option>
					</select>
				</label>
			</div>
			<div :class="$style['sort']">
				<label>
					Sorteer op:
					<select v-model="filters.sort" @change="(e: Event) => store.add({'sort': (e?.currentTarget as HTMLSelectElement)?.value})">
						<option value="sort-order">Meest verkocht</option>
						<option value="manufacturer">Merk</option>
					</select>
				</label>
			</div>
		</div>
		<button v-if="Object.keys(store.filters).length" :class="$style['reset-button']" @click="resetFilters">Reset filters</button>
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
