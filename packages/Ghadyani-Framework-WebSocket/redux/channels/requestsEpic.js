const { combineEpics } = require('redux-observable')
const { map } = require('rxjs/operators')

const { ofRequestType } = require('$redux/utils/actionTypeCheckers')

const {
	JOIN_CHANNEL,
	joinNamespacedChannel,
	LEAVE_CHANNEL,
	leaveNamespacedChannel,
} = require('./actions')

const joinChannelRequestEpic = action$ => (
	action$
	.pipe(
		ofRequestType(JOIN_CHANNEL),
		map(({ channelName, connection }) => (
			joinNamespacedChannel(
				channelName,
				connection
			)
		)),
	)
)

const leaveChannelRequestEpic = action$ => (
	action$
	.pipe(
		ofRequestType(LEAVE_CHANNEL),
		map(({ channelName, connection }) => (
			leaveNamespacedChannel(
				channelName,
				connection
			)
		)),
	)
)

const requestsEpic = (
	combineEpics(
		joinChannelRequestEpic,
		leaveChannelRequestEpic,
	)
)

module.exports = requestsEpic
