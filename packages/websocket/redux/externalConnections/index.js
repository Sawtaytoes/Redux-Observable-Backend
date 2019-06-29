const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const connectToServerEpic = require('./connectToServerEpic')
const listenToServerEpic = require('./listenToServerEpic')
const externalConnectionsListReducer = require('./externalConnectionsListReducer')

const externalConnectionsEpic = (
	combineEpics(
		connectToServerEpic,
		listenToServerEpic,
	)
)

const externalConnectionsReducer = (
	combineReducers({
		externalConnectionsList: externalConnectionsListReducer,
	})
)

module.exports = {
	externalConnections: {
		actions: require('./actions'),
		selectors: require('./selectors'),
	},
	externalConnectionsEpic,
	externalConnectionsReducer,
}
