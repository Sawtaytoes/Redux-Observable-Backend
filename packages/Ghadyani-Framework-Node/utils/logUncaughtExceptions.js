const chalk = require('chalk')
const simpleMap = require('$redux/utils/simpleMap')
const { fromEvent, of } = require('rxjs')
const { ignoreElements, mergeMap, pluck, tap } = require('rxjs/operators')

const logUncaughtExceptions = (
	fromEvent(
		process,
		'uncaughtException',
	)
	.pipe(
		pluck('stack'),
		mergeMap(stack => (
			of(stack)
			.pipe(
				simpleMap(chalk.red),
				tap(console.error),
				ignoreElements(),
			)
		)),
	)
)

module.exports = logUncaughtExceptions
