#!/usr/bin/env node

// This import must come before setting up module aliases.
// Because `core` brings in `better-module-aliases`, it needs to run before setting the alias when linking packages.
require('@redux-observable-backend/core')
require('better-module-alias')(__dirname)

const { createDeprecatedFunction } = require('@redux-observable-backend/core')

const stateSelector = require('$utils/stateSelector')

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
	stateSelector: (
		createDeprecatedFunction({
			deprecatedMethodName: 'stateSelector',
			func: stateSelector,
		})
	),
}
