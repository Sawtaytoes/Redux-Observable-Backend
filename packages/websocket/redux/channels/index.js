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
		connectionList: connectionListReducer,
	})
)

module.exports = {
	channels: {
		actions: require('./actions'),
		selectors: require('./selectors'),
	},
	channelsEpic,
	channelsReducer,
}
