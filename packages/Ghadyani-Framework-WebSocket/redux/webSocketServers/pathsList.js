const createReducer = require('@ghadyani-framework/node/redux/utils/createReducer')
const namespaceReducer = require('@ghadyani-framework/node/redux/utils/namespaceReducer')
const { ADD_WEBSOCKET_SERVER } = require('./actions')

const initialState = null

const reducerActions = {
	[ADD_WEBSOCKET_SERVER]: (
		(prevState, { server }) => server
	),
}

const pathsListReducer = (
	namespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = pathsListReducer
