const WebSocket = require('ws')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { map, mergeMap } = require('rxjs/operators')
const { of } = require('rxjs')
const { ofType } = require('redux-observable')
const { webSocket } = require('rxjs/webSocket')

const {
	addServer,
	CONNECT_TO_WEBSOCKET_SERVER,
} = require('./actions')

const connectToServerEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(CONNECT_TO_WEBSOCKET_SERVER),
		mergeMap(({
			namespace,
			protocolVersion,
			url,
		}) => (
			of(
				webSocket({
					protocol: protocolVersion,
					url,
					WebSocketCtor: WebSocket,
				})
			)
			.pipe(
				map(webSocketServer => (
					addServer({
						connection: webSocketServer,
						namespace,
					})
				)),
			)
		)),
		catchEpicError(),
	)
)

module.exports = connectToServerEpic
