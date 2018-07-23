const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const clientsListReducer = require('./clientsListReducer')
const removeDisconnectedClientsEpic = require('./removeDisconnectedClientsEpic')

const clientsEpic = (
	combineEpics(
		removeDisconnectedClientsEpic,
	)
)

const clientsReducer = (
	combineReducers({
		clientsList: clientsListReducer,
	})
)

module.exports = {
	clientsEpic,
	clientsReducer,
}
