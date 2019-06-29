const { filter } = require('rxjs/operators')

const hasMessage = () => (
	filter(({ message }) => message)
)

module.exports = hasMessage
