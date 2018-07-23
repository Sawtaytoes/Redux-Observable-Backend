const { addWebSocketServer } = require('../actions')

const defaultWebSocketServers = []

const createWebSocketServers = (
	(...webSocketServers) => (
		({ dispatch }) => {
			defaultWebSocketServers
			.concat(webSocketServers)
			.map(addWebSocketServer)
			.forEach(dispatch)
		}
	)
)
module.exports = createWebSocketServers
