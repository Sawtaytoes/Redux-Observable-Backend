const { filter } = require('rxjs/operators')

const hasActionObject = () => (
	filter(({ message }) => (
		typeof message === 'object'
		&& typeof message.type === 'string'
	))
)

module.exports = hasActionObject
