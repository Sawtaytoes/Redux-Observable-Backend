const chalk = require('chalk')
const readline = require('readline')
const { filter, ignoreElements, tap } = require('rxjs/operators')
const { fromEvent } = require('rxjs')

const readlineInterface = (
	readline
	.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false,
	})
)

const stateCliEpic = (
	(action$, state$) => (
		fromEvent(
			readlineInterface,
			'line',
		)
		.pipe(
			filter(Boolean),
			filter(line => (
				/^state.*$/
				.test(line)
			)),
			tap(line => {
				// Set this up for use in `eval`.
				state$

				try {
					return (
						console
						.info(
							eval(
								line
								.replace(
									/^(state)(.*)$/,
									'state$.value$2',
								)
							)
						)
					)
				}
				catch(exception) {
					return (
						console
						.error(
							chalk
							.redBright(
								exception
							)
						)
					)
				}
			}),
			ignoreElements(),
		)
	)
)

module.exports = stateCliEpic
