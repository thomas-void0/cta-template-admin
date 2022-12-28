/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	content: ['./src/**/*.{jsx,tsx}', './public/index.html'],
	corePlugins: {
		preflight: false
	},
	theme: {
		colors: {
			primary: 'rgb(var(--tw-primary-color) / <alpha-value>)',
			danger: 'rgb(var(--tw-danger-color) / <alpha-value>)',
			success: 'rgb(var(--tw-success-color) / <alpha-value>)',
			link: 'rgb(var(--tw-link-color) / <alpha-value>)',
			warn: 'rgb(var(--tw-warn-color) / <alpha-value>)',
			tc: {
				DEFAULT: 'rgb(var(--tw-text-default) / <alpha-value>)',
				secondary: 'rgb(var(--tw-text-secondary) / <alpha-value>)',
				third: 'rgb(var(--tw-text-third) / <alpha-value>)',
				fourth: 'rgb(var(--tw-text-fourth) / <alpha-value>)',
				fifth: 'rgb(var(--tw-text-fifth) / <alpha-value>)'
			},
			line: 'rgb(var(--tw-border-color) / <alpha-value>)',
			disabled: 'rgb(var(--tw-disabled-color) / <alpha-value>)',
			white: 'rgb(var(--tw-bg-color) / <alpha-value>)',
			black: 'rgb(var(--tw-black-color) / <alpha-value>)'
		},
		fontFamily: {
			DINPro: ['DINPro'],
			PuHui: ['PuHui']
		},
		fontSize: {
			sm: '12px',
			base: '14px',
			md: '16px',
			lg: '18px',
			xl: '20px',
			xxl: '22px',
			xxxl: '24px'
		},
		extend: {
			spacing: {
				xs: '4px',
				sm: '8px',
				base: '16px',
				md: '24px',
				lg: '32px',
				xl: '40px'
			},
			borderRadius: {
				none: '0',
				xs: '4px',
				sm: '8px', // .rounded-sm
				base: '16px',
				md: '24px',
				lg: '32px',
				xl: '40px'
			}
		}
	}
}
