const ADD_WEBSOCKET_SERVER = 'WEBSOCKET_SERVERS::ADD_WEBSOCKET_SERVER'

const addWebSocketServer = ({
	namespace,
	protocolVersion,
	webSocketServerSettings = {},
}) => ({
	namespace,
	protocolVersion,
	type: ADD_WEBSOCKET_SERVER,
	webSocketServerSettings,
})

module.exports = {
	ADD_WEBSOCKET_SERVER,
	addWebSocketServer,
}
