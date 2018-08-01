const { createDeprecationMessage } = require('@ghadyani-framework/base')

const channelsListSelector = (
	({ channels }) => (
		Array
		.from(
			channels
			.connectionList
			.keys()
		)
	)
)

const channelSelector = (
	({ channels }, { namespace }) => (
		channels
		.connectionlist
		.get(namespace)
	)
)

module.exports = {
	channelsListSelector,
	channelSelector,
	getChannel: (
		createDeprecationMessage({
			deprecatedMethodName: 'getChannel',
			func: channelSelector,
			replacementMethodName: 'channelSelector',
		})
	),
	getChannelsList: (
		createDeprecationMessage({
			deprecatedMethodName: 'getChannelsList',
			func: channelsListSelector,
			replacementMethodName: 'channelsListSelector',
		})
	),
}
