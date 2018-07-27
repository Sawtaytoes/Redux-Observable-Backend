const emitWebSocketConnectionEvent = (
	(webSocketServer, req) => connection => {
		webSocketServer
		.emit(
			'connection',
			connection,
			req,
		)
	}
)

module.exports = emitWebSocketConnectionEvent
