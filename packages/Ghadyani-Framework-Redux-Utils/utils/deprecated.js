const { createDeprecationMessage } = require('@ghadyani-framework/base')

module.exports = {
	namespaceReducer: (
		createDeprecationMessage({
			deprecatedMethodName: 'namespaceReducer',
			func: require('$utils/createNamespaceReducer'),
			replacementMethodName: 'createNamespaceReducer',
		})
	),
	reduceReducer: (
		createDeprecationMessage({
			deprecatedMethodName: 'reduceReducer',
			func: require('$utils/createReduceReducers'),
			replacementMethodName: 'createReduceReducers',
		})
	),
}
