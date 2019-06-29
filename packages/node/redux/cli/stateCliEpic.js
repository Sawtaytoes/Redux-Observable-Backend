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
const stateCliEpic = (
	action$,
	state$,
) => (
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
		map(evalCode => {
			// If I don't define `state$` here, ESLint will complain it's not being used.
			// Need `state$` for `eval` to work with the provided string.
			state$

			// Because of how `eval` works with closures, it cannot be passed directly to `map`.
			return eval(evalCode)
		}),
		tap(console.info),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = stateCliEpic
