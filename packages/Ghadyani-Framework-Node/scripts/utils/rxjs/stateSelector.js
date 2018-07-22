const { of } = require('rxjs')

const stateSelector = ({
	props,
	selector,
	state$,
}) => (
	of(
		selector(
			state$.value,
			props,
		)
	)
)

module.exports = stateSelector
