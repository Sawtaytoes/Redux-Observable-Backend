const deprecateArgument = require('./deprecateArgument')
const logDeprecation = require('./logDeprecation')

const createDeprecatedFunction = ({
	deprecatedMethodName,
	func,
	replacementMethodName,
}) => (
	...args
) => {
	deprecateArgument({
		deprecatedArgumentName: 'func',
		functionName: 'createDeprecatedFunction',
		replacementArgumentName: 'adapter',
	})

	logDeprecation(
		replacementMethodName
		? (
			`\`${deprecatedMethodName}\` is deprecated.`
			.concat(' ')
			.concat(`Use \`${replacementMethodName}\` instead.`)
		)
		: (
			`\`${deprecatedMethodName}\` is deprecated and will be removed in a future update.`
		)
	)

	return func(...args)
}

module.exports = createDeprecatedFunction
