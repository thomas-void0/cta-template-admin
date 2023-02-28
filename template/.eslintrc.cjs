module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['standard-with-typescript', 'plugin:react/jsx-runtime', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json']
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/semi': 'off',
		'@typescript-eslint/promise-function-async': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/prefer-optional-chain': 'off',
		'@typescript-eslint/prefer-ts-expect-error': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/array-type': ['error', { default: 'array', readonly: 'array' }]
	}
}
