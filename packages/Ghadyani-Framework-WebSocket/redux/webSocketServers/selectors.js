const getWebSocketServer = (
	({
		webSocketServers,
	}, {
		namespace,
		protocolVersion,
	}) => (
		webSocketServers
		.pathsList
		.get(namespace)[
			protocolVersion
		]
	)
)

module.exports = {
	getWebSocketServer,
}
