module.exports = {
	ignorePatterns: ['/dist/'],
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended'
	],
	rules: {
		'vue/html-indent': ['error', 'tab'],
		'vue/html-quotes': ['error', 'double'],
		'vue/max-attributes-per-line': ['error', {
			'singleline': {
				'max': 4
			},
			'multiline': {
				'max': 1
			}
		}],
		'vue/multi-word-component-names': 'off',
		'vue/no-unused-vars': 'error',
		'vue/require-default-prop': 'off',
		'object-curly-spacing': ['error', 'always'],
		'quotes': ['error', 'single'],
		'space-before-blocks': ['error', 'always'],
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-explicit-any': 'off'
	}
}
