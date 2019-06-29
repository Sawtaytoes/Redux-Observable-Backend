const logDeprecation = require('./logDeprecation')

const createDeprecatedFunction = ({
	deprecatedMethodName,
	func,
	replacementMethodName,
}) => (
	(...args) => {
		replacementMethodName
		? (
			logDeprecation(
				`\`${deprecatedMethodName}\` is deprecated.`
				.concat(' ')
				.concat(`Use \`${replacementMethodName}\` instead.`)
			)
		)
		: (
			logDeprecation(
				`\`${deprecatedMethodName}\` is deprecated.`
				.concat(' ')
				.concat(`This function will be entirely removed in a future update.`)
			)
		)

		return func(...args)
	}
)

module.exports = createDeprecatedFunction
