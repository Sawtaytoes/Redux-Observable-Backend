const fs = require('fs')
const logDeprecation = require('./logDeprecation')
const tryCatchFinally = require('./tryCatchFinally')

const safeImport = ({
	defaultValue,
	filePath,
}) => (
	fs.existsSync(filePath)
	? (
		tryCatchFinally(
			defaultValue,
			tryCallback: () => require(filePath),
		)
	)
	: defaultValue
)

const safeImportDeprecationWrapper = (
	firstArg,
	secondArg,
) => {
	if (
		typeof firstArg !== 'object'
		|| typeof secondArg !== 'undefined'
	) {
		logDeprecation(
			`A non-object argument is deprecated for \`safeImport\``
			.concat(' ')
			.concat(`Use \`{ defaultValue, filePath }\` instead.`)
		)

		return (
			safeImport({
				filePath: firstArg,
				secondArg,
			})
		)
	}

	return (
		safeImport(
			firstArg,
		)
	)
}

module.exports = safeImportDeprecationWrapper
