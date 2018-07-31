const chalk = require('chalk')

const createDeprecationMessage = ({
	deprecatedMethodName,
	func,
	replacementMethodName,
}) => (
	(...args) => {
		console
		.error(
			chalk
			.redBright(
				`\`${deprecatedMethodName}\` is deprecated.`
				.concat(' ')
				.concat(`Use \`${replacementMethodName}\` instead.`)
			)
		)

		return func(...args)
	}
)

module.exports = createDeprecationMessage
