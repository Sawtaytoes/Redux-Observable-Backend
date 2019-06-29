const ADD_SERVER = 'EXTERNAL_CONNECTIONS::ADD_SERVER'
const CONNECT_TO_WEBSOCKET_SERVER = 'EXTERNAL_CONNECTIONS::CONNECT_TO_WEBSOCKET_SERVER'
const CONNECTION_READY = 'EXTERNAL_CONNECTIONS::CONNECTION_READY'
const ERROR_MESSAGE = 'RESPONSE::ERROR_MESSAGE'
const REMOVE_SERVER = 'EXTERNAL_CONNECTIONS::REMOVE_SERVER'

const addServer = ({
	connection,
	namespace,
}) => ({
	connection,
	namespace,
	type: ADD_SERVER,
})

const connectionReady = ({
	connection,
	namespace,
}) => ({
	connection,
	namespace,
	type: CONNECTION_READY,
})

const connectToWebSocketServer = ({
	protocolVersion = '',
	url,
}) => ({
	namespace: `${url},${protocolVersion}`,
	protocolVersion,
	url,
	type: CONNECT_TO_WEBSOCKET_SERVER,
})

const removeServer = ({
	connection,
	namespace,
}) => ({
	connection,
	namespace,
	type: REMOVE_SERVER,
})

module.exports = {
	ADD_SERVER,
	addServer,
	CONNECT_TO_WEBSOCKET_SERVER,
	CONNECTION_READY,
	connectionReady,
	connectToWebSocketServer,
	ERROR_MESSAGE,
	REMOVE_SERVER,
	removeServer,
}
