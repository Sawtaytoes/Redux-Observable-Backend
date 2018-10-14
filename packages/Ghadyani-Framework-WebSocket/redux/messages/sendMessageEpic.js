const WebSocket = require('ws')
const { ignoreElements, map, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const logMessage = require('$redux/webSocketServers/utils/logMessage')
const { SEND_MESSAGE } = require('./actions')

const sendMessageEpic = action$ => (
	action$
	.pipe(
		ofType(SEND_MESSAGE),
		logMessage('Outgoing'),
		map(({ connection, message }) => ({
			connection,
			message: (
				JSON
				.stringify(message)
			),
		})),
		tap(({ connection, message }) => (
			connection
			&& (
				connection.readyState
				=== WebSocket.OPEN
				? connection.send(message)
				: connection.close()
			)
		)),
		ignoreElements(),
	)
)

module.exports = sendMessageEpic
