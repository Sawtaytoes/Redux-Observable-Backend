#!/usr/bin/env node
require('@ghadyani-framework/setup-module-aliases')(__dirname)

// Load this before any other file
const logUncaughtExceptions = require('$utils/logUncaughtExceptions')

logUncaughtExceptions
.subscribe()

const createDeprecatedFunction = require('$utils/createDeprecatedFunction')

module.exports = {
	createDeprecationMessage: (
		createDeprecatedFunction({
			deprecatedMethodName: 'createDeprecationMessage',
			func: createDeprecatedFunction,
			replacementMethodName: 'createDeprecatedFunction',
		})
	),

	createDeprecatedFunction,
	deprecateArgument: require('$utils/deprecateArgument'),
	removeFilePathFromRequireCache: require('$utils/removeFilePathFromRequireCache'),
	safeImport: require('$utils/safeImport'),
	simpleMap: require('$utils/simpleMap'),
	tryCatchFinally: require('$utils/tryCatchFinally'),
}
