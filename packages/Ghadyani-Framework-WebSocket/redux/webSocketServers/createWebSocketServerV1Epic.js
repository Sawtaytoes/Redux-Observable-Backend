const { map, mergeMap } = require('rxjs/operators')
const { merge, of } = require('rxjs')
const { ofType } = require('redux-observable')
const { stateSelector } = require('@ghadyani-framework/redux-utils')

const createWebSocketConnectionObservable = require('./utils/createWebSocketConnectionObservable')
const createWebSocketMessageObservable = require('./utils/createWebSocketMessageObservable')
const formatDispatchableMessage = require('./utils/formatDispatchableMessage')
const hasActionObject = require('./utils/hasActionObject')
const hasMessage = require('./utils/hasMessage')
const isValidMessageActionType = require('./utils/isValidMessageActionType')
const logConnection = require('./utils/logConnection')
const logMessage = require('./utils/logMessage')
const ofProtocolVersion = require('./utils/ofProtocolVersion')
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
