const { createNamespaceReducer, createReducer } = require('@ghadyani-framework/redux-utils')

const {
	ADD_CONFIGURATION_SET,
	REMOVE_CONFIGURATION_VALUE,
} = require('./actions')

const initialState = {}

const reducerActions = {
	[ADD_CONFIGURATION_SET]: (
		(prevState, { configurationSet }) => ({
			...prevState,
			...configurationSet,
		})
	),

	[REMOVE_CONFIGURATION_VALUE]: (
		(prevState, { configurationName }) => {
			const nextState = {
				...prevState,
			}

			delete nextState[configurationName]

			return nextState
		}
	),
}

const configurationSetsReducer = (
	createNamespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = configurationSetsReducer
