const createReducer = require('@ghadyani-framework/node/redux/utils/createReducer')
const namespaceReducer = require('@ghadyani-framework/node/redux/utils/namespaceReducer')
const WebSocket = require('ws')
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
	namespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = pathsListReducer
