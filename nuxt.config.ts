// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	app: {
		head: {
			title: 'SingleShop | KPN',
			link: [{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]
		}
	},
	css: ['~/assets/css/main.scss'],
	imports: {
		dirs: ['stores'],
	},
	modules: ['@pinia/nuxt', 'nuxt-vitest'],
})
