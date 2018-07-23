const actionLoggerMiddleware = (
	() => next => action => {
		console.info(
			'Action:',
			action.type,
		)

		return next(action)
	}
)

module.exports = actionLoggerMiddleware
