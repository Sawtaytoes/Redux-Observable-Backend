const createReducer = require('$redux/utils/createReducer')

const { ADD_TASKS } = require('./actions')

const initialState = () => (
	console.info('No tasks defined.')
)

const reducerActions = {
	[ADD_TASKS]: (
		(prevState, { tasks }) => ({
			...prevState,
			...tasks,
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
