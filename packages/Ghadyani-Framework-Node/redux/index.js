const { combineEpics } = require('redux-observable')

const { configurationsEpic, configurationsReducer } = require('./configurations')
const { tasksEpic, tasksReducer } = require('./tasks')

const rootEpic = (
	combineEpics(
		configurationsEpic,
		tasksEpic,
	)
)

const rootReducers = {
	configurations: configurationsReducer,
	tasks: tasksReducer,
}

module.exports = {
	rootEpic,
	rootReducers,
}
