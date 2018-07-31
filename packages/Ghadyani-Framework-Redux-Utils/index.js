#!/usr/bin/env node
require('@ghadyani-framework/setup-module-aliases')(__dirname)

module.exports = {
	...require('$utils/deprecated'),
	createActionLoggerMiddleware: require('$utils/createActionLoggerMiddleware'),
	createNamespaceReducer: require('$utils/createNamespaceReducer'),
	createReducer: require('$utils/createReducer'),
	createReduceReducers: require('$utils/createReduceReducers'),
	mapToState: require('$utils/mapToState'),
	simpleMap: require('$utils/simpleMap'),
	stateSelector: require('$utils/stateSelector'),
}
