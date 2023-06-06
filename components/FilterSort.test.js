import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'

import FilterSort from './FilterSort.vue';
import { products } from '~/public/products.json';

describe('FilterSort', () => {
	it('Filters and sorts products correctly', async () => {
		const wrapper = mount(FilterSort, {
			props: {
				products
			},
			global: {
				plugins: [createTestingPinia()],
			}
		});

		wrapper.vm.filterProducts();

		expect(wrapper.emitted('filter')).toBeTruthy();
	});
});
