const { combineEpics } = require('redux-observable')

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
		// permissionsEpic,
		webSocketServersEpic,
	)
)

const rootReducers = {
	// authentications: authenticationsReducer,
	channels: channelsReducer,
	httpServers: httpServersReducer,
	// permissions: permissionsReducer,
	webSocketServers: webSocketServersReducer,
}

module.exports = {
	rootEpic,
	rootReducers,
}
