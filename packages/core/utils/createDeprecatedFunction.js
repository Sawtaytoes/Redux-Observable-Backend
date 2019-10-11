const deprecateArgument = require('./deprecateArgument')
const logDeprecation = require('./logDeprecation')

const createDeprecationFunction = ({
	deprecatedMethodName,
	func,
	replacementMethodName,
}) => (
	...args
) => {
	deprecateArgument({
		deprecatedArgumentName: 'func',
		methodName: 'createDeprecationFunction',
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

module.exports = createDeprecationFunction
