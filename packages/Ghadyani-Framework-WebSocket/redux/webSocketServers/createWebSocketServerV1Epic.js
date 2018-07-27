const { map, mergeMap } = require('rxjs/operators')
const { merge, of } = require('rxjs')
const { ofType } = require('redux-observable')

const createWebSocketConnectionObservable = require('./utils/createWebSocketConnectionObservable')
const createWebSocketMessageObservable = require('./utils/createWebSocketMessageObservable')
const formatDispatchableMessage = require('./utils/formatDispatchableMessage')
const hasActionObject = require('$utils/rxjs/hasActionObject')
const hasMessage = require('$utils/rxjs/hasMessage')
const isValidMessageActionType = require('./utils/isValidMessageActionType')
const logConnection = require('$utils/rxjs/logConnection')
const logMessage = require('$utils/rxjs/logMessage')
const ofProtocolVersion = require('$utils/rxjs/ofProtocolVersion')
const stateSelector = require('@ghadyani-framework/node/redux/utils/rxjs/stateSelector')
const { ADD_WEBSOCKET_SERVER } = require('./actions')
const { addClient } = require('$redux/clients/actions')
const { getWebSocketServer } = require('./selectors')

const createWebSocketServerV1Epic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(ADD_WEBSOCKET_SERVER),
			mergeMap(({
				namespace,
				protocolVersion,
				webSocketServerSettings,
			}) => (
				stateSelector({
					props: {
						namespace,
						protocolVersion,
					},
					selector: getWebSocketServer,
					state$,
				})
				.pipe(
					mergeMap(webSocketServer => (
						createWebSocketConnectionObservable(
							webSocketServer
						)
					)),
					ofProtocolVersion('v1'),
					logConnection(),
					mergeMap(props => (
						merge(
							of(
								addClient(props)
							),
							(
								createWebSocketMessageObservable(
									props
								)
								.pipe(
									hasMessage(),
									logMessage('Incoming'),
									hasActionObject(),
									isValidMessageActionType({
										requiresAuthentication: (
											webSocketServerSettings
											.hasAuth
										),
									}),
									map(formatDispatchableMessage),
								)
							),
						)
					)),
				)
			)),
		)
	)
)

module.exports = createWebSocketServerV1Epic
