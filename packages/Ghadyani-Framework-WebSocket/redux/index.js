const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')
const { nodeEpic, nodeReducers } = require('@ghadyani-framework/node')

// const { authenticationsEpic, authenticationsReducer } = require('./authentications')
const { channelsEpic, channelsReducer } = require('./channels')
const { clientsEpic } = require('./clients')
const { httpServersEpic, httpServersReducer } = require('./httpServers')
const { messagesEpic } = require('./messages')
// const { permissionsEpic, permissionsReducer } = require('./permissions')
const { webSocketServersEpic, webSocketServersReducer } = require('./webSocketServers')

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
