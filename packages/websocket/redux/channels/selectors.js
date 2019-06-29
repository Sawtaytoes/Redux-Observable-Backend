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
			deprecatedMethodName: 'channelSelector',
			func: (state, props) => selectChannel(props)(state),
			replacementMethodName: 'selectChannel',
		})
	),
	channelsListSelector: (
		createDeprecatedFunction({
			deprecatedMethodName: 'channelsListSelector',
			func: (state, props) => selectChannelList(props)(state),
			replacementMethodName: 'selectChannelList',
		})
	),
	selectChannel,
	selectChannelList,
}
