const readline = require('readline')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { filter, ignoreElements, map, tap } = require('rxjs/operators')
const { fromEvent } = require('rxjs')

const readlineInterface = (
	readline
	.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false,
	})
)

const stateRegExp = /^state(\..*)?$/

// Debugging epic.
// Reads console for `state.???` and outputs the current value of state.
const stateCliEpic = () => (
	fromEvent(
		readlineInterface,
		'line',
	)
	.pipe(
		filter(Boolean),
		filter(line => (
			stateRegExp
			.test(line)
		)),
		map(line => (
			line
			.replace(
				stateRegExp,
				'state$.value$1',
			)
		)),
		map(evalCode => (
			// Because of how `eval` works with closures, it cannot be passed directly to `map`.
			eval(evalCode)
		)),
		tap(console.info),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = stateCliEpic
