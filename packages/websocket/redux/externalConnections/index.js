const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const connectToServerEpic = require('./connectToServerEpic')
const externalConnectionsListReducer = require('./externalConnectionsListReducer')
const listenForErrorsEpic = require('./listenForErrorsEpic')
const listenToServerEpic = require('./listenToServerEpic')

const externalConnectionsEpic = (
	combineEpics(
		connectToServerEpic,
		listenForErrorsEpic,
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
