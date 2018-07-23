const getWebSocketServerConfig = require('$$utils/webSocketServer/getWebSocketServerConfig')
const startWebSocketServers = require('$$utils/webSocketServer/startWebSocketServers')

module.exports = config => (
	startWebSocketServers(
		getWebSocketServerConfig(config)
	)
)
