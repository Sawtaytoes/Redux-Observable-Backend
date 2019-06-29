const chalk = require('chalk')

const logDeprecation = (
	deprecationMessage,
) => (
	console
	.error(
		chalk
		.redBright(
			deprecationMessage
		)
	)
)

module.exports = logDeprecation
