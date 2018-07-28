const CHANNEL_MESSAGE = 'CHANNEL_MESSAGE'
const JOIN_CHANNEL = 'CHANNELS::JOIN_CHANNEL'
const LEAVE_CHANNEL = 'CHANNELS::LEAVE_CHANNEL'

const joinChannel = ({
	connection,
	namespace,
}) => ({
	connection,
	namespace,
	type: JOIN_CHANNEL,
})

const leaveChannel = ({
	connection,
	namespace,
}) => ({
	connection,
	namespace,
	type: LEAVE_CHANNEL,
})

module.exports = {
	CHANNEL_MESSAGE,
	JOIN_CHANNEL,
	joinChannel,
	LEAVE_CHANNEL,
	leaveChannel,
}
