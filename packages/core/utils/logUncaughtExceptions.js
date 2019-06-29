const chalk = require('chalk')
const { fromEvent, of } = require('rxjs')
const { ignoreElements, map, mergeMap, tap } = require('rxjs/operators')

const logUncaughtExceptions = (
	fromEvent(
		process,
		'uncaughtException',
	)
	.pipe(
		mergeMap(error => (
			of(
				error
				.stack
				|| error
			)
			.pipe(
				map(error => (
					// `map` has multiple args so we need to be specific about passing in `error`.
					chalk
					.redBright(error)
				)),
				tap(console.error),
				ignoreElements(),
			)
		)),
	)
)

module.exports = logUncaughtExceptions
