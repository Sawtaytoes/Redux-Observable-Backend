const BROADCAST_MESSAGE = 'MESSAGES::BROADCAST_MESSAGE'
const SEND_MESSAGE = 'MESSAGES::SEND_MESSAGE'

const broadcastMessage = ({ connections, message }) => ({
	connections,
	message,
	type: BROADCAST_MESSAGE,
})

const sendMessage = ({ connection, message }) => ({
	connection,
	message,
	type: SEND_MESSAGE,
})

module.exports = {
	BROADCAST_MESSAGE,
	broadcastMessage,
	SEND_MESSAGE,
	sendMessage,
}
