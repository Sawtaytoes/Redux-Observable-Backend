const { filter } = require('rxjs/operators')

const isValidMessageActionType = (
	({ requiresAuthentication }) => (
		filter(({ message }) => (
			(
				/^.*_CHANNEL_REQUEST$/
				.test(message.type)
			)
			|| (
				requiresAuthentication
				&& (
					/^.*_AUTH_REQUEST$/
					.test(message.type)
				)
			)
		))
	)
)

module.exports = isValidMessageActionType
