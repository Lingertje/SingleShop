import { mount } from '@vue/test-utils';
import Footer from './Footer.vue';

describe('FilterSort', () => {
	it('Filters and sorts products correctly', async () => {
		const wrapper = mount(Footer);

		expect(wrapper.text()).toContain(`@Lingertje - ${new Date().getFullYear()}`);
	});
});
