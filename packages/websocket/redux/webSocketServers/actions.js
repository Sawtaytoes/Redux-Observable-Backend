const ADD_WEBSOCKET_SERVER = 'WEBSOCKET_SERVERS::ADD_WEBSOCKET_SERVER'

const addWebSocketServer = ({
	namespace,
	protocolVersion,
	webSocketServerSettings = {},
}) => ({
	namespace,
	protocolVersion,
	webSocketServerSettings,
	type: ADD_WEBSOCKET_SERVER,
})

module.exports = {
	ADD_WEBSOCKET_SERVER,
	addWebSocketServer,
}
