const { map } = require('rxjs/operators')

const mapToState = state$ => (
	map(() => state$.value)
)

module.exports = mapToState
