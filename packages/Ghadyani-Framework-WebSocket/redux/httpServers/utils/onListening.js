const throwError = (
	(taskName, error) => {
		throw new Error(`[${taskName}] ${error}`)
	}
)

const onListening = (
	(taskName, serverUrl = '') => (
		error => (
			error
			? throwError(taskName, error)
			: console.info(`[${taskName}]`, serverUrl)
		)
	)
)

module.exports = onListening
