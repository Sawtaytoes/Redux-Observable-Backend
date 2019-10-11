const logDeprecation = require('./logDeprecation')

const deprecateArgument = ({
	deprecatedArgumentName,
	functionName,
	replacementArgumentName,
}) => {
	replacementArgumentName
	? (
		logDeprecation(
			`Argument \`${deprecatedArgumentName}\` is deprecated for \`${functionName}\`.`
			.concat(' ')
			.concat(`Use \`${replacementArgumentName}\` instead.`)
		)
	)
	: (
		logDeprecation(
			`Argument \`${deprecatedArgumentName}\` is deprecated for \`${functionName}\` and has no replacement.`
		)
	)
}

module.exports = deprecateArgument
