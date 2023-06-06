import { mount } from '@vue/test-utils';
import Footer from './Footer.vue';

describe('Footer', () => {
	it('Footer renders the text correctly', async () => {
		const wrapper = mount(Footer);

		expect(wrapper.text()).toContain(`@Lingertje - ${new Date().getFullYear()}`);
	});
});
