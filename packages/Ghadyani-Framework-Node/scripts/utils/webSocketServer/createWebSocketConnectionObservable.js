const { Observable } = require('rxjs')

const getQueryParamsFromRequest = require('scripts/utils/getQueryParamsFromRequest')

const createWebSocketConnectionObserver = (
	webSocketServer => (
		observer => {
			webSocketServer
			.on(
				'connection',
				(connection, req) => {
					const queryParams = (
						getQueryParamsFromRequest(req)
					)

					// Necessary mutation as `ws` doesn't give access to `request` in `connection`
					connection.queryParams = queryParams

					observer.next({
						connection,
						queryParams,
						server: webSocketServer,
					})
				}
			)
		}
	)
)

const createWebSocketConnectionObservable = webSocketServer => (
	Observable
	.create(
		createWebSocketConnectionObserver(webSocketServer)
	)
)

module.exports = createWebSocketConnectionObservable
