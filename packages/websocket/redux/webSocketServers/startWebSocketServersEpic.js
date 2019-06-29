const url = require('url')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { catchError, ignoreElements, map, mergeMap, switchMap, tap } = require('rxjs/operators')
const { fromEvent, of, throwError } = require('rxjs')
const { ofTaskName, tasks } = require('@redux-observable-backend/node')
const { ofType } = require('redux-observable')

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
		tap(({
			head,
			req,
			socket,
			webSocketServer,
		}) => (
			webSocketServer
			? (
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
			)
			: (
				socket
				.destroy()
			)
		)),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = startWebSocketServersEpic
