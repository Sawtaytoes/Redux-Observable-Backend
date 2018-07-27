const url = require('url')
const { fromEvent } = require('rxjs')
const { filter, ignoreElements, map, switchMap, tap } = require('rxjs/operators')
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
			switchMap(({
				pathname: namespace,
				req,
				...props
			}) => (
				stateSelector({
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
					filter(Boolean),
					map(webSocketServer => ({
						...props,
						namespace,
						req,
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
				console.log('hi')||
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
