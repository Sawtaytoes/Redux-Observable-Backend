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
			adapter: (state, props) => selectWebSocketServer(props)(state),
			deprecatedMethodName: 'webSocketServerSelector',
			replacementMethodName: 'selectWebSocketServer',
		})
	),
	selectWebSocketServer,
}
