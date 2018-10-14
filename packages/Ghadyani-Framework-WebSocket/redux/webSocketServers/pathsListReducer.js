const WebSocket = require('ws')
const { createMappedNamespaceReducer, createReducer } = require('@ghadyani-framework/redux-utils')

const { ADD_WEBSOCKET_SERVER } = require('./actions')

const initialState = []

const reducerActions = {
	[ADD_WEBSOCKET_SERVER]: (
		prevState,
		{
			protocolVersion,
			webSocketServerSettings,
		}
	) => ({
		...prevState,
		[protocolVersion]: (
			new WebSocket
			.Server({
				...webSocketServerSettings,
				noServer: true,
			})
		),
	}),
}

const pathsListReducer = (
	createMappedNamespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = pathsListReducer
