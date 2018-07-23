const chalk = require('chalk')
const simpleMap = require('$utils/rxjs/simpleMap')
const { fromEvent, of } = require('rxjs')
const { ignoreElments, mergeMap, pluck, tap } = require('rxjs/operators')

const handleUncaughtExceptions = (
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
				ignoreElments(),
			)
		)),
	)
)

module.exports = handleUncaughtExceptions
