const { combineEpics } = require('redux-observable')

const { configurationsEpic, configurationsReducer } = require('./configurations')

const rootEpic = (
	combineEpics(
		configurationsEpic,
	)
)

const rootReducers = {
	configurations: configurationsReducer,
}

module.exports = {
	rootEpic,
	rootReducers,
}
