const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const pathsListReducer = require('./pathsListReducer')
const startWebSocketServersEpic = require('./startWebSocketServersEpic')

const webSocketServersEpic = (
	combineEpics(
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
