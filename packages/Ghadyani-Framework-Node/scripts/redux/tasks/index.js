const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const runTaskEpic = require('./runTaskEpic')
const tasksListReducer = require('./tasksListReducer')

const tasksEpic = (
	combineEpics(
		runTaskEpic,
	)
)

const tasksReducer = (
	combineReducers({
		tasksList: tasksListReducer,
	})
)

module.exports = {
	tasksEpic,
	tasksReducer,
}
