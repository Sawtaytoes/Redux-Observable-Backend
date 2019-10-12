#!/usr/bin/env node
require('better-module-alias')(__dirname)

// Load this before any other file to ensure uncaught errors are logged
const createDeprecationFunction = require('$utils/createDeprecationFunction')

module.exports = {
	createDeprecatedFunction: (
		createDeprecationFunction({
			adapter: createDeprecationFunction,
			deprecatedMethodName: 'createDeprecatedFunction',
			replacementMethodName: 'createDeprecationFunction',
		})
	),
	createDeprecationFunction,
	deprecateArgument: require('$utils/deprecateArgument'),
	logUncaughtExceptions: require('$utils/logUncaughtExceptions'),
	removeFilePathFromRequireCache: require('$utils/removeFilePathFromRequireCache'),
	safeImport: require('$utils/safeImport'),
	tryCatchFinally: require('$utils/tryCatchFinally'),
}
