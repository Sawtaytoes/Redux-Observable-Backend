const WebSocket = require('ws')

const getWebSocketServerConfig = ({
	createWebSocketWatcher,
	webSocketServerOptions,
	webSocketWatcherOptions,
}) => (
	createWebSocketWatcher({
		...webSocketWatcherOptions,
		webSocketServer: (
			new WebSocket
			.Server({
				...webSocketServerOptions,
				noServer: true,
			})
		),
	})
)

module.exports = getWebSocketServerConfig
