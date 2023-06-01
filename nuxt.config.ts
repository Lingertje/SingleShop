// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	css: ['~/assets/css/main.scss'],
	app: {
		head: {
			title: 'SingleShop | KPN',
			link: [{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]
		}
	}
})
