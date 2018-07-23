const { Observable } = require('rxjs')

const createWebSocketMessageObserver = (
	({ connection, ...props }) => (
		observer => {
			connection
			.on(
				'message',
				message => {
					try {
						observer.next({
							...props,
							connection,
							message: JSON.parse(message),
						})
					} catch (error) {
						console.info('Received non-JSON message:', message)
						connection.terminate()
					}
				}
			)
			.on(
				'close',
				closingMessage => (
					observer.next({
						isClosed: true,
						closingMessage,
						connection,
					})
				)
			)
			.on(
				'close',
				() => observer.complete()
			)
		}
	)
)

const createWebSocketMessageObservable = webSocket => (
	Observable.create(
		createWebSocketMessageObserver(webSocket)
	)
)

module.exports = createWebSocketMessageObservable
