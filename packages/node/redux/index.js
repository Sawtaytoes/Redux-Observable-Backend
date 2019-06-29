const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const { cliEpic } = require('./cli')
const { tasksEpic } = require('./tasks')

const {
	configurationsEpic,
	configurationsReducer,
} = require('./configurations')

const rootEpic = (
	combineEpics(
		cliEpic,
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
