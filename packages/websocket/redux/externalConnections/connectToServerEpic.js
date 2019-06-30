const WebSocket = require('ws')
const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { map, mergeMap, startWith, switchMap, takeUntil } = require('rxjs/operators')
const { of } = require('rxjs')
const { ofType } = require('redux-observable')
const { webSocket } = require('rxjs/webSocket')

const { configurations } = require('@redux-observable-backend/node')

const {
	addServer,
	CONNECT_TO_SERVER,
	DISCONNECT_FROM_SERVER,
	RECONNECT_TO_SERVER,
} = require('./actions')

const connectToServerEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(CONNECT_TO_SERVER),
		mergeMap(({ namespace }) => (
			of(state$.value)
			.pipe(
				map(
					configurations
					.selectors
					.selectConfigurationSet({
						namespace: 'externalConnections',
					})
				),
				map(externalConnections => (
					externalConnections[namespace]
				)),
				switchMap(({
					hostname,
					port,
					protocol,
					protocolVersion,
				}) => (
					action$
					.pipe(
						ofType(RECONNECT_TO_SERVER),
						ofNamespace(namespace),
						takeUntil(
							action$
							.pipe(
								ofType(DISCONNECT_FROM_SERVER),
								ofNamespace(namespace),
							)
						),
						startWith(null),
						map(() => (
							webSocket({
								protocol: protocolVersion,
								url: (
									protocol
									.concat('://')
									.concat(hostname)
									.concat(':')
									.concat(port)
								),
								WebSocketCtor: WebSocket,
							})
						)),
						map(webSocketServer => (
							addServer({
								connection: webSocketServer,
								namespace,
							})
						)),
					)
				)),
			)
		)),
		catchEpicError(),
	)
)

module.exports = connectToServerEpic
