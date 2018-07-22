const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const list = require('./list')
const removeDisconnectedClientsEpic = require('./removeDisconnectedClientsEpic')

const clientsEpic = (
	combineEpics(
		removeDisconnectedClientsEpic,
	)
)

const clientsReducer = (
	combineReducers({
		list,
	})
)

module.exports = {
	clientsEpic,
	clientsReducer,
}
