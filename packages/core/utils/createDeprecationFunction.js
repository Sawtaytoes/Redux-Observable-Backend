const deprecateArgument = require('./deprecateArgument')
const logDeprecation = require('./logDeprecation')

const createDeprecationFunction = ({
	adapter,
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

	if (!adapter) {
		adapter = func
	}

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

	return adapter(...args)
}

module.exports = createDeprecationFunction
