const { mergeMap, tap } = require('rxjs/operators')

const createWebSocketConnectionObservable = require('./createWebSocketConnectionObservable')
const createWebSocketMessageObservable = require('./createWebSocketMessageObservable')
const formatDispatchableMessage = require('./formatDispatchableMessage')
const hasActionObject = require('$utils/rxjs/hasActionObject')
const hasMessage = require('$utils/rxjs/hasMessage')
const isValidMessageActionType = require('./isValidMessageActionType')
const logConnection = require('$utils/rxjs/logConnection')
const logMessage = require('$utils/rxjs/logMessage')
const ofProtocolVersion = require('$utils/rxjs/ofProtocolVersion')
const { addClient } = require('$redux/clients/actions')
const { curriedDispatch } = require('$redux/store')

const createWebSocketWatcherV1 = (
	({
		protocolVersion,
		requiresAuthentication = false,
		webSocketServer,
	}) => {
		createWebSocketConnectionObservable(
			webSocketServer
		)
		.pipe(
			ofProtocolVersion(protocolVersion),
			logConnection(),
			tap(curriedDispatch(addClient)),
			mergeMap(createWebSocketMessageObservable),
			hasMessage(),
			logMessage('Incoming'),
			hasActionObject(),
			isValidMessageActionType({
				requiresAuthentication,
			}),
		)
		.subscribe(
			curriedDispatch(
				formatDispatchableMessage
			)
		)
	}
)

module.exports = createWebSocketWatcherV1
