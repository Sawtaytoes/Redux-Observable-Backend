const handleError = require('@ghadyani-framework/node/utils/handleError')

const onListening = (
	(taskName, serverUrl = '') => (
		error => (
			error
			? handleError(taskName, error)
			: console.info(`[${taskName}]`, serverUrl)
		)
	)
)

module.exports = onListening
