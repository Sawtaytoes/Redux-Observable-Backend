const { createDeprecatedFunction } = require('@redux-observable-backend/core')

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
		createDeprecatedFunction({
			adapter: (state, props) => selectChannel(props)(state),
			deprecatedMethodName: 'channelSelector',
			replacementMethodName: 'selectChannel',
		})
	),
	channelsListSelector: (
		createDeprecatedFunction({
			adapter: (state, props) => selectChannelList(props)(state),
			deprecatedMethodName: 'channelsListSelector',
			replacementMethodName: 'selectChannelList',
		})
	),
	selectChannel,
	selectChannelList,
}
