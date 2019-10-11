const { createDeprecationFunction } = require('@redux-observable-backend/core')

const selectChannel = (
	{ namespace },
) => (
	{ channels },
) => (
	channels
	.connectionlist
	.get(namespace)
)

const selectChannelList = () => ({
	channels,
}) => (
	Array
	.from(
		channels
		.connectionList
		.keys()
	)
)

module.exports = {
	channelSelector: (
		createDeprecationFunction({
			adapter: (state, props) => selectChannel(props)(state),
			deprecatedMethodName: 'channelSelector',
			replacementMethodName: 'selectChannel',
		})
	),
	channelsListSelector: (
		createDeprecationFunction({
			adapter: (state, props) => selectChannelList(props)(state),
			deprecatedMethodName: 'channelsListSelector',
			replacementMethodName: 'selectChannelList',
		})
	),
	selectChannel,
	selectChannelList,
}
