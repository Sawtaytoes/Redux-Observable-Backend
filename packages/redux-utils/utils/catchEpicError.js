const chalk = require('chalk')
const { catchError } = require('rxjs/operators')
const { EMPTY } = require('rxjs')

const catchEpicError = (
	returnValue = EMPTY,
) => (
	catchError((
		error,
	) => {
		console
		.error(
			chalk
			.redBright(
				error.constructor.name === 'ErrorEvent'
				? error.error.stack
				: error
			)
		)

		return returnValue
	})
)

module.exports = catchEpicError
