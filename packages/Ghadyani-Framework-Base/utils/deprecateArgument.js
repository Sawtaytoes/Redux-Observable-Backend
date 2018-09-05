const logDeprecation = require('./logDeprecation')

const deprecateArgument = ({
	deprecatedArgumentName,
	functionName,
	replacementArgumentName,
}) => (
	logDeprecation(
		`Argument \`${deprecatedArgumentName}\` is deprecated for \`${functionName}\``
		.concat(' ')
		.concat(`Use \`${replacementArgumentName}\` instead.`)
	)
)

module.exports = deprecateArgument
