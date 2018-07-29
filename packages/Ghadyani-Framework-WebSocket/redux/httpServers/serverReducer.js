const http = require('http')

const { createReducer } = require('@ghadyani-framework/redux-utils')
const { ADD_HTTP_SERVER } = require('./actions')

const initialState = []

const reducerActions = {
	[ADD_HTTP_SERVER]: (
		() => (
			http
			.createServer((req, res) => {
				res
				.writeHead(
					200,
					{ 'Content-Type': 'text/plain' }
				)

				res
				.write('')

				res
				.end()
			})
		)
	),
}

const serverReducer = (
	createReducer(
		reducerActions,
		initialState,
	)
)

module.exports = serverReducer
