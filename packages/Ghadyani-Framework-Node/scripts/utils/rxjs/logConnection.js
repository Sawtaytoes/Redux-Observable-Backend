const { tap } = require('rxjs/operators')

const logConnection = () => (
	tap(({ connection }) => {
		console.info('[Client Connected]', connection.protocol)
	})
)

module.exports = logConnection
