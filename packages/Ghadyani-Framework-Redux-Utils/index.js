#!/usr/bin/env node

// This import must come before setting up module aliases.
// Because `base` brings in `setup-module-aliases`, it needs to run before setting the alias when linking packages.
const { createDeprecatedFunction } = require('@ghadyani-framework/base')

require('@ghadyani-framework/setup-module-aliases')(__dirname)

module.exports = {
	namespaceReducer: (
		createDeprecatedFunction({
			deprecatedMethodName: 'namespaceReducer',
			func: require('$utils/createNamespaceReducer'),
			replacementMethodName: 'createNamespaceReducer',
		})
	),
	reduceReducer: (
		createDeprecatedFunction({
			deprecatedMethodName: 'reduceReducer',
			func: require('$utils/createReduceReducers'),
			replacementMethodName: 'createReduceReducers',
		})
	),

	createActionLoggerMiddleware: require('$utils/createActionLoggerMiddleware'),
	createMergeById: require('$utils/createMergeById'),
	createNamespaceReducer: require('$utils/createNamespaceReducer'),
	createReducer: require('$utils/createReducer'),
	createReduceReducers: require('$utils/createReduceReducers'),
	mapToState: require('$utils/mapToState'),
	simpleMap: require('$utils/simpleMap'),
	stateSelector: require('$utils/stateSelector'),
}
