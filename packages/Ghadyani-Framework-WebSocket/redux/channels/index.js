const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const connectionListReducer = require('./connectionListReducer')
const removeDisconnectedClientChannelsEpic = require('./removeDisconnectedClientChannelsEpic')
const requestsEpic = require('./requestsEpic')

const channelsEpic = (
	combineEpics(
		removeDisconnectedClientChannelsEpic,
		requestsEpic,
	)
)

const channelsReducer = (
	combineReducers({
		connectionlist: connectionListReducer,
	})
)

module.exports = {
	channelsEpic,
	channelsReducer,
}
