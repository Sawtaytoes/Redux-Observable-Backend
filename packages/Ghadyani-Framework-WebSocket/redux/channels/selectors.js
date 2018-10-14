const { createDeprecatedFunction } = require('@ghadyani-framework/base')

const channelsListSelector = ({
	channels,
}) => (
	Array
	.from(
		channels
		.connectionList
		.keys()
	)
)

const channelSelector = (
	{ channels },
	{ namespace },
) => (
	channels
	.connectionlist
	.get(namespace)
)

module.exports = {
	channelsListSelector,
	channelSelector,
	getChannel: (
		createDeprecatedFunction({
			deprecatedMethodName: 'getChannel',
			func: channelSelector,
			replacementMethodName: 'channelSelector',
		})
	),
	getChannelsList: (
		createDeprecatedFunction({
			deprecatedMethodName: 'getChannelsList',
			func: channelsListSelector,
			replacementMethodName: 'channelsListSelector',
		})
	),
}
