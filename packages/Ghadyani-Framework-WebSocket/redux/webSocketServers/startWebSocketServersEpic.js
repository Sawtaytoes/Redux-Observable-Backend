const url = require('url')
const { fromEvent } = require('rxjs')
const { ignoreElements, map, mergeMap, switchMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const emitWebSocketConnectionEvent = require('./utils/emitWebSocketConnectionEvent')
const ofTaskName = require('@ghadyani-framework/node/redux/tasks/utils/ofTaskName')
const stateSelector = require('@ghadyani-framework/node/redux/utils/rxjs/stateSelector')
const { getHttpServer } = require('$redux/httpServers/selectors')
const { getWebSocketServer } = require('./selectors')
const { START_TASK } = require('@ghadyani-framework/node/redux/tasks/actions')

const startWebSocketServersEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(START_TASK),
			ofTaskName(
				'serve',
				'undefined',
			),
			switchMap(() => (
				stateSelector({
					selector: getHttpServer,
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
					selector: getWebSocketServer,
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
)

module.exports = startWebSocketServersEpic
