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
