#!/usr/bin/env node

// This import must come before setting up module aliases.
// Because `base` brings in `setup-module-aliases`, it needs to run before setting the alias when linking packages.
require('@ghadyani-framework/base')

require('@ghadyani-framework/setup-module-aliases')(__dirname)

module.exports = {
	catchEpicError: require('$utils/catchEpicError'),
	createActionLoggerMiddleware: require('$utils/createActionLoggerMiddleware'),
	createMappedNamespaceReducer: require('$utils/createMappedNamespaceReducer'),
	createMergeById: require('$utils/createMergeById'),
	createNamespaceReducer: require('$utils/createNamespaceReducer'),
	createNamespaceReducerCreator: require('$utils/createNamespaceReducerCreator'),
	createNamespaceSelector: require('$utils/createNamespaceSelector'),
	createReducer: require('$utils/createReducer'),
	createReduceReducers: require('$utils/createReduceReducers'),
	mapToState: require('$utils/mapToState'),
	simpleMap: require('$utils/simpleMap'),
	stateSelector: require('$utils/stateSelector'),
}
