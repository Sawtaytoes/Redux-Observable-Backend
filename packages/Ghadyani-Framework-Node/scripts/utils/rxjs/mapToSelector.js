const { map } = require('rxjs/operators')

const mapToSelector = (
	(selector, props) => (
		map(state => (
			selector(
				state,
				props,
			)
		))
	)
)

module.exports = mapToSelector
