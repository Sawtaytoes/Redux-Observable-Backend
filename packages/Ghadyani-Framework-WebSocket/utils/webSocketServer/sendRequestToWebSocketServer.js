const emitConnectionEvent = (
	(webSocketServer, req) => connection => {
		webSocketServer
		.emit(
			'connection',
			connection,
			req
		)
	}
)

const sendRequestToWebSocketServer = (
	webSocketServer => (
		(req, socket, head) => (
			webSocketServer
			.handleUpgrade(
				req,
				socket,
				head,
				(
					emitConnectionEvent(
						webSocketServer,
						req
					)
				)
			)
		)
	)
)

module.exports = sendRequestToWebSocketServer
