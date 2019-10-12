#!/usr/bin/env node

// This import must come before setting up module aliases.
// Because `core` brings in `better-module-aliases`, it needs to run before setting the alias when linking packages.
require('@redux-observable-backend/core')
require('better-module-alias')(__dirname)

const createReducerReducer = require('$utils/createReducerReducer')
const { createDeprecationFunction } = require('@redux-observable-backend/core')

module.exports = {
	catchEpicError: require('$utils/catchEpicError'),
	createActionLoggerMiddleware: require('$utils/createActionLoggerMiddleware'),
	createMappedNamespaceReducer: require('$utils/createMappedNamespaceReducer'),
	createMergeById: require('$utils/createMergeById'),
	createNamespaceReducer: require('$utils/createNamespaceReducer'),
	createNamespaceReducerCreator: require('$utils/createNamespaceReducerCreator'),
	createNamespaceSelector: (
		createDeprecationFunction({
			adapter: require('$utils/createNamespaceSelector'),
			deprecatedMethodName: 'createNamespaceSelector',
		})
	),
	createReducer: require('$utils/createReducer'),
	createReduceReducers: (
		createDeprecationFunction({
			adapter: createReducerReducer,
			deprecatedMethodName: 'createReduceReducers',
			replacementMethodName: 'createReducerReducer',
		})
	),
	createReducerReducer,
	mapToState: (
		createDeprecationFunction({
			adapter: require('$utils/mapToState'),
			deprecatedMethodName: 'mapToState',
		})
	),
	ofNamespace: require('$utils/ofNamespace'),
	simpleMap: (
		createDeprecationFunction({
			adapter: require('$utils/simpleMap'),
			deprecatedMethodName: 'simpleMap',
		})
	),
	stateSelector: (
		createDeprecationFunction({
			adapter: require('$utils/stateSelector'),
			deprecatedMethodName: 'stateSelector',
		})
	),
}
