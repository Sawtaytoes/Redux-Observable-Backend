const WebSocket = require('ws')
const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { map, mergeMap, startWith, switchMap, takeUntil } = require('rxjs/operators')
const { of } = require('rxjs')
const { ofType } = require('redux-observable')
const { webSocket } = require('rxjs/webSocket')

const {
	addServer,
	CONNECT_TO_SERVER,
	DISCONNECT_FROM_SERVER,
	RECONNECT_TO_SERVER,
} = require('./actions')

const connectToServerEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(CONNECT_TO_SERVER),
		mergeMap(({
			namespace,
			protocolVersion,
			url,
		}) => (
			action$
			.pipe(
				takeUntil(
					action$
					.pipe(
						ofType(DISCONNECT_FROM_SERVER),
						ofNamespace(namespace),
					)
				),
				ofType(RECONNECT_TO_SERVER),
				ofNamespace(namespace),
				startWith(null),
				switchMap(() => (
					of(
						webSocket({
							protocol: protocolVersion,
							url,
							WebSocketCtor: WebSocket,
						})
					)
				)),
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
