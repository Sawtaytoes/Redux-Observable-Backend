const { filter } = require('rxjs/operators')

const ofNamespace = (
	expectedNamespace => (
		filter(({ namespace }) => (
			namespace === expectedNamespace
		))
	)
)

module.exports = ofNamespace
