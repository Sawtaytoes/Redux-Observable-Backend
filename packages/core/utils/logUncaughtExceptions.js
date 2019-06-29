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
				|| (
					error[0]
					.stack
				)
			)
			.pipe(
				map(error => (
					// `map` has multiple args so we need to be specific about passing in `error` to `chalk`.
					chalk
					.redBright(error)
				)),
				tap(console.error),
				tap(() => {
					process
					.exit(1)
				}),
				ignoreElements(),
			)
		)),
	)
)

module.exports = logUncaughtExceptions
