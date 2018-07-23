const getChannel = (
	({ channels }, { namespace }) => (
		channels
		.connectionlist
		.get(namespace)
	)
)

const getChannelsList = (
	({ channels }) => (
		Array
		.from(
			channels
			.connectionList
			.keys()
		)
	)
)

module.exports = {
	getChannel,
	getChannelsList,
}
