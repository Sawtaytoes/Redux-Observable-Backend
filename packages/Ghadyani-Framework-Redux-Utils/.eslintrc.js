const { resolve } = require('path')

module.exports = {
	extends: [
		'@ghadyani-framework/node',
	],
	settings: {
		'import/resolver': {
			alias: [
				['$utils', resolve(__dirname, 'utils')],
			],
		}
	},
}
