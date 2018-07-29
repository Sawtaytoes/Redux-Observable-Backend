#!/usr/bin/env node
require('@ghadyani-framework/setup-module-aliases')(__dirname)

module.exports = {
	createActionLoggerMiddleware: require('$utils/createActionLoggerMiddleware'),
	createReducer: require('$utils/createReducer'),
	mapToState: require('$utils/mapToState'),
	namespaceReducer: require('$utils/namespaceReducer'),
	simpleMap: require('$utils/simpleMap'),
	stateSelector: require('$utils/stateSelector'),
}
