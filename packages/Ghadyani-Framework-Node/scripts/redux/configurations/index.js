const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const configurationSetsReducer = require('./configurationSetsReducer')
const copyConfigurationListEpic = require('./copyConfigurationListEpic')
const duplicateConfigurationSetEpic = require('./duplicateConfigurationSetEpic')
const removeDuplicateConfigurationValuesEpic = require('./removeDuplicateConfigurationValuesEpic')

const configurationsEpic = (
	combineEpics(
		copyConfigurationListEpic,
		duplicateConfigurationSetEpic,
		removeDuplicateConfigurationValuesEpic,
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
