const chalk = require('chalk')
const simpleMap = require('$utils/simpleMap')
const { fromEvent, of } = require('rxjs')
const { ignoreElements, mergeMap, tap } = require('rxjs/operators')

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
				simpleMap(chalk.red),
				tap(console.error),
				ignoreElements(),
			)
		)),
	)
)

module.exports = logUncaughtExceptions
