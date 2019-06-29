const chalk = require('chalk')

const logDeprecation = (
	deprecationMessage,
) => {
	const errorStackTrace = (
		new Error()
		.stack
		.split('\n')[3]
		.replace(
			/(\s*at) (.*) \(/,
			'$1 (',
		)
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
