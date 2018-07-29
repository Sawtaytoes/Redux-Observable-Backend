const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const { tasksEpic } = require('./tasks')

const {
	configurationsEpic,
	configurationsReducer,
} = require('./configurations')

const rootEpic = (
	combineEpics(
		configurationsEpic,
		tasksEpic,
	)
)

const rootReducers = {
	configurations: configurationsReducer,
}

const rootReducer = (
	combineReducers(
		rootReducers,
	)
)

module.exports = {
	rootEpic,
	rootReducers,
	rootReducer,
}
