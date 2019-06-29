const { createMappedNamespaceReducer, createReducer } = require('@redux-observable-backend/redux-utils')

const {
	ADD_SERVER,
	REMOVE_SERVER,
} = require('./actions')

const initialState = null

const reducerActions = {
	[ADD_SERVER]: (
		prevState,
		{ connection },
	) => (
		connection
	),

	[REMOVE_SERVER]: (
		connection,
	) => {
		connection
		&& (
			connection
			.close()
		)

		return initialState
	},
}

const clientsListReducer = (
	createMappedNamespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = clientsListReducer
