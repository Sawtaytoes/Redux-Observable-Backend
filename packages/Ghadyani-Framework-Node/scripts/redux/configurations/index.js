const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const configurationSetsReducer = require('./configurationSetsReducer')
const convertEnvironmentVariableToConfigSetEpic = require('./convertEnvironmentVariableToConfigSetEpic')

const configurationsEpic = (
	combineEpics(
		convertEnvironmentVariableToConfigSetEpic,
	)
)

const configurationsReducer = (
	combineReducers({
		configurationSets: configurationSetsReducer,
	})
)

module.exports = {
	configurationsEpic,
	configurationsReducer,
}
