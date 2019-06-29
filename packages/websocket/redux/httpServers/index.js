const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const serverReducer = require('./serverReducer')
const startHttpServersEpic = require('./startHttpServersEpic')

const httpServersEpic = (
	combineEpics(
		startHttpServersEpic,
	)
)

const httpServersReducer = (
	combineReducers({
		server: serverReducer,
	})
)

module.exports = {
	httpServersEpic,
	httpServersReducer,
}
