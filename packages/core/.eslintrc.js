const { resolve } = require('path')

module.exports = {
	extends: [
		'@ghadyani-eslint/node',
	],
	settings: {
		'import/resolver': {
			alias: [
				['$utils', resolve(__dirname, 'utils')],
			],
		}
	},
}
