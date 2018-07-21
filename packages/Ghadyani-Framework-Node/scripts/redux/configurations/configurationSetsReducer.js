const createReducer = require('scripts/redux/utils/createReducer')
const defaultConfigurationSet = require('config/defaultConfigurationSet')
const { ADD_CONFIGURATION_SET } = require('./actions')

const initialState = defaultConfigurationSet

const reducerActions = {
	[ADD_CONFIGURATION_SET]: (
		(prevState, { configurationSet }) => ({
			...prevState,
			...configurationSet,
		})
	),
}

const configurationSetsReducer = (
	createReducer(
		reducerActions,
		initialState,
	)
)

module.exports = configurationSetsReducer
