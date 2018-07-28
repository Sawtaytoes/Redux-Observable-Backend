const { filter } = require('rxjs/operators')

const isValidMessageActionType = (
	({ requiresAuthentication }) => (
		filter(({ message }) => (
			(
				/^REQUEST::.+$/
				.test(message.type)
			)
			|| (
				requiresAuthentication
				&& (
					/^RESPONSE::.+$/
					.test(message.type)
				)
			)
		))
	)
)

module.exports = isValidMessageActionType
