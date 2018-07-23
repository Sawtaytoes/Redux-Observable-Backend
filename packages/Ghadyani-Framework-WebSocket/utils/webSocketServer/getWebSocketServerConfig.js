const createWebSocketServer = require('$$utils/webSocketServer/createWebSocketServer')
const createWebSocketWatcherV1 = require('$$utils/webSocketServer/createWebSocketWatcherV1')

const getWebSocketServerConfig = () => {
	const server = (
		createWebSocketServer({})
	)

	const authServer = (
		createWebSocketServer({
			hasAuth: true,
		})
	)

	createWebSocketWatcherV1({
		protocolVersion: 'v1',
		webSocketServer: server,
	})

	createWebSocketWatcherV1({
		protocolVersion: 'v1',
		requiresAuthentication: true,
		webSocketServer: authServer,
	})

	const webSocketServerConfig = {
		'/': server,
		'/admin': authServer,
	}

	return webSocketServerConfig
}

module.exports = getWebSocketServerConfig
