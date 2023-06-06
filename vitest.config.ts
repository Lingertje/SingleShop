import { defineConfig } from 'vitest/config'
import vue from "@vitejs/plugin-vue";
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
	plugins: [
        vue(),
		AutoImport({
			imports: ['vue'],
      		dirs: ['./composables/']
		})
    ],
	resolve: {
		alias: {
			'~': path.resolve(__dirname),
		}
	},
	test: {
		environment: "jsdom",
		globals: true,
	},
})
