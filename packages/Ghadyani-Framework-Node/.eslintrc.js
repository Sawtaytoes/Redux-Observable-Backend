const { resolve } = require('path')

module.exports = {
	extends: [
		'@ghadyani-framework/node',
	],
	settings: {
		'import/resolver': {
			alias: [
				['$redux', resolve(__dirname, 'redux')],
			],
		}
	},
}
