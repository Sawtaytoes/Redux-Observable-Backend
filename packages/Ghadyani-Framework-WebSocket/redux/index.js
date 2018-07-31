const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')
const { nodeEpic, nodeReducers } = require('@ghadyani-framework/node')

const { messagesEpic } = require('./messages')

// const {
// 	authenticationsEpic,
// 	authenticationsReducer,
// } = require('./authentications')

const {
	channelsEpic,
	channelsReducer,
} = require('./channels')

const {
	clientsEpic,
	clientsReducer,
} = require('./clients')

const {
	httpServersEpic,
	httpServersReducer,
} = require('./httpServers')

// const {
// 	permissionsEpic,
// 	permissionsReducer,
// } = require('./permissions')

const {
	webSocketServersEpic,
	webSocketServersReducer,
} = require('./webSocketServers')

const rootEpic = (
	combineEpics(
		// authenticationsEpic,
		channelsEpic,
		clientsEpic,
		httpServersEpic,
		messagesEpic,
		nodeEpic,
		// permissionsEpic,
		webSocketServersEpic,
	)
)

const rootReducers = {
	...nodeReducers,
	// authentications: authenticationsReducer,
	channels: channelsReducer,
	clients: clientsReducer,
	httpServers: httpServersReducer,
	// permissions: permissionsReducer,
	webSocketServers: webSocketServersReducer,
}

const rootReducer = (
	combineReducers(
		rootReducers,
	)
)

module.exports = {
	rootEpic,
	rootReducers,
	rootReducer,
}
