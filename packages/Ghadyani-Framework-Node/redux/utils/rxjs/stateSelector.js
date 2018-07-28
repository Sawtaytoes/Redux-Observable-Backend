const chalk = require('chalk')
const { NEVER, of } = require('rxjs')

const stateSelector = ({
	errorCallback = () => {},
	props,
	selector,
	state$,
}) => {
	try {
		return (
			of(
				selector(
					state$.value,
					props,
				)
			)
		)
	}
	catch(exception) {
		console
		.error(
			chalk
			.red(
				exception
			)
		)

		errorCallback(exception)

		return NEVER
	}
}

module.exports = stateSelector
