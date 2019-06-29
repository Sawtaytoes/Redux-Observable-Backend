const { createDeprecatedFunction } = require('@redux-observable-backend/core')

const selectWebSocketServer = ({
	namespace,
	protocolVersion,
}) => ({
	webSocketServers,
}) => (
	webSocketServers
	.pathsList
	.get(namespace)[
		protocolVersion
	]
)

module.exports = {
	webSocketServerSelector: (
		createDeprecatedFunction({
			deprecatedMethodName: 'webSocketServerSelector',
			func: (state, props) => selectWebSocketServer(props)(state),
			replacementMethodName: 'selectWebSocketServer',
		})
	),
	selectWebSocketServer,
}
