const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const createWebSocketServerV1Epic = require('./createWebSocketServerV1Epic')
const pathsListReducer = require('./pathsListReducer')
const startWebSocketServersEpic = require('./startWebSocketServersEpic')

const webSocketServersEpic = (
	combineEpics(
		createWebSocketServerV1Epic,
		startWebSocketServersEpic,
	)
)

const webSocketServersReducer = (
	combineReducers({
		pathsList: pathsListReducer,
	})
)

module.exports = {
	webSocketServersEpic,
	webSocketServersReducer,
}
