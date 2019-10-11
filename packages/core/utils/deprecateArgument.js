const logDeprecation = require('./logDeprecation')

const deprecateArgument = ({
	deprecatedArgumentName,
	functionName, // deprecated
	methodName,
	replacementArgumentName,
}) => {
	deprecateArgument({
		deprecatedArgumentName: 'functionName',
		methodName: 'deprecateArgument',
		replacementArgumentName: 'methodName',
	})

	if (!methodName) {
		methodName = functionName
	}

	replacementArgumentName
	? (
		logDeprecation(
			`Argument \`${deprecatedArgumentName}\` is deprecated for \`${methodName}\`.`
			.concat(' ')
			.concat(`Use \`${replacementArgumentName}\` instead.`)
		)
	)
	: (
		logDeprecation(
			`Argument \`${deprecatedArgumentName}\` is deprecated for \`${methodName}\` and has no replacement.`
		)
	)
}

module.exports = deprecateArgument
