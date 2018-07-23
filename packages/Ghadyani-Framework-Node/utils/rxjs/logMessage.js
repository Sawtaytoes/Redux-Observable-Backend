const { tap } = require('rxjs/operators')

const logMessage = prefix => (
	tap(({ message }) => {
		console.info(`[${prefix} Message]`, message)
	})
)

module.exports = logMessage
