import { defineStore } from 'pinia';

import { FilterType } from '~/types/Product';

export const useFilterStore = defineStore('filter', {
	state: () => ({
		filters: {} as FilterType,
	}),
	getters: {
		getFilters(): FilterType {
			return this.filters;
		}
	},
	actions: {
		add(payload: any) {
			this.filters = { ...this.filters, ...payload };
		},
		remove(payload: any) {
			// @ts-ignore
			delete this.filters[payload];
		}
	}
});
