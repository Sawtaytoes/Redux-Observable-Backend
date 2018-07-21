const { catchError } = require('rxjs/operators')

const catchEpicError = () => (
	catchError((error, source$) => {
		console.error(error.stack)

		return source$
	})
)

module.exports = catchEpicError
