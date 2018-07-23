const WebSocket = require('ws')

const createWebSocketWatcherV1 = require('$$utils/webSocketServer/createWebSocketWatcherV1')

const getWebSocketServerConfig = () => {
	const server = (
		new WebSocket
		.Server({ noServer: true })
	)

	createWebSocketWatcherV1({
		protocolVersion: 'v1',
		webSocketServer: server,
	})

	const webSocketServerConfig = {
		'/': server,
	}

	return webSocketServerConfig
}

module.exports = getWebSocketServerConfig
