const logDeprecation = require('./logDeprecation')

const createDeprecatedFunction = ({
	deprecatedMethodName,
	func,
	replacementMethodName,
}) => (
	(...args) => {
		logDeprecation(
			`\`${deprecatedMethodName}\` is deprecated.`
			.concat(' ')
			.concat(`Use \`${replacementMethodName}\` instead.`)
		)

		return func(...args)
	}
)

module.exports = createDeprecatedFunction
