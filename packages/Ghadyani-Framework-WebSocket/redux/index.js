const { combineEpics } = require('redux-observable')

// const { authenticationsEpic, authenticationsReducer } = require('./authentications')
const { channelsEpic, channelsReducer } = require('./channels')
const { clientsEpic } = require('./clients')
const { messagesEpic } = require('./messages')
// const { permissionsEpic, permissionsReducer } = require('./permissions')

const rootEpic = (
	combineEpics(
		// authenticationsEpic,
		channelsEpic,
		clientsEpic,
		messagesEpic,
		// permissionsEpic,
	)
)

const rootReducers = {
	// authentications: authenticationsReducer,
	channels: channelsReducer,
	// permissions: permissionsReducer,
}

module.exports = {
	rootEpic,
	rootReducers,
}
