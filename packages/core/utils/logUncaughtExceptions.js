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
					error
					.split('\n')
				)),
				map(errorLines => (
					chalk
					.redBright(
						errorLines
						.slice(0, 1)
					)
					.concat('\n')
					.concat(
						chalk
						.red(
							errorLines
							.slice(1)
							.join('\n')
						)
					)
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
