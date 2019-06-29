const ADD_SERVER = 'EXTERNAL_CONNECTIONS::ADD_SERVER'
const CONNECT_TO_SERVER = 'EXTERNAL_CONNECTIONS::CONNECT_TO_SERVER'
const CONNECTION_READY = 'EXTERNAL_CONNECTIONS::CONNECTION_READY'
const DISCONNECT_FROM_SERVER = 'EXTERNAL_CONNECTIONS::DISCONNECT_FROM_SERVER'
const ERROR_MESSAGE = 'RESPONSE::ERROR_MESSAGE'
const RECONNECT_TO_SERVER = 'EXTERNAL_CONNECTIONS::RECONNECT_TO_SERVER'
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

const connectToServer = ({
	protocolVersion = '',
	url,
}) => ({
	namespace: (
		protocolVersion
		? url
		: `${url}@${protocolVersion}`
	),
	protocolVersion,
	url,
	type: CONNECT_TO_SERVER,
})

const disconnectFromServer = (
	namespace,
) => ({
	namespace,
	type: DISCONNECT_FROM_SERVER,
})

const reconnectToServer = (
	namespace,
) => ({
	namespace,
	type: RECONNECT_TO_SERVER,
})

const removeServer = (
	namespace,
) => ({
	namespace,
	type: REMOVE_SERVER,
})

module.exports = {
	ADD_SERVER,
	addServer,
	CONNECT_TO_SERVER,
	CONNECTION_READY,
	connectionReady,
	connectToServer,
	DISCONNECT_FROM_SERVER,
	disconnectFromServer,
	ERROR_MESSAGE,
	RECONNECT_TO_SERVER,
	reconnectToServer,
	REMOVE_SERVER,
	removeServer,
}
