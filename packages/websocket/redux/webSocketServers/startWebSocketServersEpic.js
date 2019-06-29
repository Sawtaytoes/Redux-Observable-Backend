const url = require('url')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { fromEvent, of, throwError } = require('rxjs')
const { catchError, ignoreElements, map, mergeMap, switchMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')
const { ofTaskName, tasks } = require('@redux-observable-backend/node')

const emitWebSocketConnectionEvent = require('./utils/emitWebSocketConnectionEvent')
const { selectHttpServer } = require('$redux/httpServers/selectors')
const { selectWebSocketServer } = require('./selectors')

const startWebSocketServersEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(
			tasks
			.actions
			.START_TASK
		),
		ofTaskName(
			'serve',
			'undefined',
		),
		map(() => state$.value),
		map(selectHttpServer()),
		switchMap(httpServer => (
			fromEvent(
				httpServer,
				'upgrade',
			)
		)),
		map(([req, socket, head]) => ({
			head,
			pathname: (
				url
				.parse(
					req
					.url
				)
				.pathname
			),
			req,
			socket,
		})),
		mergeMap(({
			pathname: namespace,
			req,
			socket,
			...props
		}) => (
			of(state$.value)
			.pipe(
				map(
					selectWebSocketServer({
						protocolVersion: (
							req
							.headers['sec-websocket-protocol']
						),
						namespace,
					})
				),
				map(webSocketServer => ({
					...props,
					namespace,
					req,
					socket,
					webSocketServer,
				})),
				catchError(error => {
					socket
					.destroy()

					return throwError(error)
				}),
				catchEpicError(),
			)
		)),
		map(({
			head,
			req,
			socket,
			webSocketServer,
		}) => (
			webSocketServer
			.handleUpgrade(
				req,
				socket,
				head,
				(
					emitWebSocketConnectionEvent(
						webSocketServer,
						req,
					)
				),
			)
		)),
		ignoreElements(),
	)
)

module.exports = startWebSocketServersEpic
