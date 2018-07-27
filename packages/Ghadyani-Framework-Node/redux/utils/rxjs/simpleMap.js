const { map } = require('rxjs/operators')

// Indexless version of `map`
const simpleMap = func => (
	map(value => (
		func(value)
	))
)

module.exports = simpleMap
