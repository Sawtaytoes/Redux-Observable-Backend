const http = require('http')
const url = require('url')

const onListening = require('$utils/onListening')

const getHttpServer = () => (
	http
	.createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/plain' })
		res.write('')
		res.end()
	})
)

	const httpWebSocketUpgrade$ = (
		fromEvent(
			httpServer,
			'upgrade',
		)
	)
	.pipe(
		map((req, socket, head) => ({
			head,
			req,
			requestedPathname: url.parse(req.url),
			socket,
		}))
		filter(requestedPathname => (
			webSocketServerConfig[pathname]
		))

		(req, socket, head) => {
			const { pathname } = url.parse(req.url)

			webSocketServerConfig[pathname]
			? (
				// TODO: Make this an action
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
}

module.exports = getHttpServer
