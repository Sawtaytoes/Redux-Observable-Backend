const { addWebSocketServer } = require('../actions')

const defaultWebSocketServers = [{
	namespace: '/',
	protocolVersion: 'v1',
}]

const createWebSocketServers = (
	(...additionalWebSocketServerSettings) => (
		({ dispatch }) => {
			defaultWebSocketServers
			.concat(additionalWebSocketServerSettings)
			.map(addWebSocketServer)
			.forEach(dispatch)
		}
	)
)
module.exports = createWebSocketServers
