const url = require('url')
const { fromEvent } = require('rxjs')
const { ignoreElements, map, mergeMap, switchMap } = require('rxjs/operators')
const { ofTaskName } = require('@ghadyani-framework/node')
const { ofType } = require('redux-observable')
const { START_TASK } = require('@ghadyani-framework/node/redux/tasks/actions')
const { stateSelector } = require('@ghadyani-framework/redux-utils')

const emitWebSocketConnectionEvent = require('./utils/emitWebSocketConnectionEvent')
const { httpServerSelector } = require('$redux/httpServers/selectors')
const { webSocketServerSelector } = require('./selectors')

const startWebSocketServersEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(START_TASK),
		ofTaskName(
			'serve',
			'undefined',
		),
		switchMap(() => (
			stateSelector({
				selector: httpServerSelector,
				state$,
			})
		)),
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
			stateSelector({
				errorCallback: () => {
					socket
					.destroy()
				},
				props: {
					protocolVersion: (
						req
						.headers[
							'sec-websocket-protocol'
						]
					),
					namespace,
				},
				selector: webSocketServerSelector,
				state$,
			})
			.pipe(
				map(webSocketServer => ({
					...props,
					namespace,
					req,
					socket,
					webSocketServer,
				})),
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
