const packageJson = require('./package.json')

module.exports = {
	extends: [
		'@ghadyani-eslint/node',
	],
	settings: {
		'import/resolver': {
			alias: (
				Object
				.entries(
					packageJson
					._moduleAliases
				)
			),
		}
	},
}
