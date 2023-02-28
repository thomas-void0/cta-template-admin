module.exports = {
	root: true,
	extends: [
		'stylelint-config-recommended',
		'stylelint-config-css-modules',
		'stylelint-config-prettier'
	],
	rules: {
		'selector-class-pattern': null,
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global', 'local']
			}
		],
		'at-rule-no-unknown': null,
		'no-empty-source': null,
		'named-grid-areas-no-invalid': null,
		'no-descending-specificity': null,
		'font-family-no-missing-generic-family-keyword': null,
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-space-before': 'never',
		'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }]
	}
}
