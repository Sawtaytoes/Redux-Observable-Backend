const chalk = require('chalk')

const logDeprecation = (
	deprecationMessage,
) => {
	const errorStackTrace = (
		new Error()
		.stack
		.split('\n')
		.slice(1)
		.join('\n')
	)

	console
	.error(
		chalk
		.redBright(deprecationMessage)
		.concat('\n')
		.concat(
			chalk
			.red(errorStackTrace)
		)
	)
}

module.exports = logDeprecation
