const { createDeprecationMessage } = require('@ghadyani-framework/base')

const webSocketServerSelector = (
	({
		webSocketServers,
	}, {
		namespace,
		protocolVersion,
	}) => (
		webSocketServers
		.pathsList
		.get(namespace)[
			protocolVersion
		]
	)
)

module.exports = {
	getWebSocketServer: (
		createDeprecationMessage({
			deprecatedMethodName: 'getWebSocketServer',
			func: webSocketServerSelector,
			replacementMethodName: 'webSocketServerSelector',
		})
	),
	webSocketServerSelector,
}
