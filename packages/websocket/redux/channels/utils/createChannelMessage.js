const { CHANNEL_MESSAGE } = require('$redux/channels/actions')

const createChannelMessage = (channelName, message) => ({
	...message,
	channelName,
	type: CHANNEL_MESSAGE,
})

module.exports = createChannelMessage
