const { combineEpics } = require('redux-observable')

const { configurationsEpic, configurationsReducer } = require('./configurations')
const { tasksEpic } = require('./tasks')

const rootEpic = (
	combineEpics(
		configurationsEpic,
		tasksEpic,
	)
)

const rootReducers = {
	configurations: configurationsReducer,
}

module.exports = {
	rootEpic,
	rootReducers,
}
