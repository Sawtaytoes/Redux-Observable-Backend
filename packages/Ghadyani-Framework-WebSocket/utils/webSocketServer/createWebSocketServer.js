const WebSocket = require('ws')

const verifyConnectionAuthToken = require('$$utils/webSocketServer/verifyConnectionAuthToken')

const defaultProps = { noServer: true }
const withAuth = { verifyClient: verifyConnectionAuthToken }

const createWebSocketServer = ({ hasAuth }) => {
	const props = (
		hasAuth
		? {
			...defaultProps,
			...withAuth,
		}
		: defaultProps
	)

	return new WebSocket.Server(props)
}

module.exports = createWebSocketServer
