const http = require('http')
const url = require('url')

const config = require('config')
const sendRequestToWebSocketServer = require('./sendRequestToWebSocketServer')
const onListening = require('$$utils/onListening')

const startWebSocketServers = webSocketServerConfig => {
	http
	.createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/plain' })
		res.write('')
		res.end()
	})
	.on(
		'upgrade',
		(req, socket, head) => {
			const { pathname } = url.parse(req.url)

			webSocketServerConfig[pathname]
			? (
				sendRequestToWebSocketServer(
					webSocketServerConfig[pathname]
				)(
					req,
					socket,
					head
				)
			)
			: (
				socket
				.destroy()
			)
		}
	)
	.listen(
		config.getPort(),
		(
			onListening(
				'WebSocket Server running as',
				(
					config
					.getServerUrl()
					.replace('http', 'ws')
				)
			)
		)
	)
}

module.exports = startWebSocketServers
