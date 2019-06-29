const formatDispatchableMessage = (
	({ message, ...props }) => ({
		...props,
		...message,
	})
)

module.exports = formatDispatchableMessage
