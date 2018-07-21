const { map } = require('rxjs/operators')

const mapToActionState = (
	(state$, selector) => (
		map(action => ([
			action,
			selector(state$.value),
		]))
	)
)

module.exports = mapToActionState
