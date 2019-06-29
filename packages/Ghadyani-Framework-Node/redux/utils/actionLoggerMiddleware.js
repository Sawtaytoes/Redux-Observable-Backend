const chalk = require('chalk')

const actionLoggerMiddleware = (
	() => next => action => {
		const { type } = action

		const [
			,
			actionTypeGroup,
			delimiter,
			actionType,
		] = (
			type
			.match(/^(.+)(::)(.+)$/)
			|| []
		)

		const title = (
			chalk
			.cyan
			.bgBlue
			.bold('[Action]')
		)

		const message = (
			actionTypeGroup
			? (
				chalk
				.grey(actionTypeGroup)
				.concat(
					chalk
					.green(delimiter)
				)
				.concat(
					chalk
					.magentaBright(actionType)
				)
			)
			: (
				chalk
				.magentaBright(type)
			)
		)

		console.info(
			title,
			message,
		)

		return next(action)
	}
)

module.exports = actionLoggerMiddleware
