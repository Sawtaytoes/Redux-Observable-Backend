const handleError = (taskName, error) => {
	throw console.error(taskName, error)
}

module.exports = handleError
