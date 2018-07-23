const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const eslintEpic = require('./eslintEpic')
const tasksListReducer = require('./tasksListReducer')

const tasksEpic = (
	combineEpics(
		eslintEpic,
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
