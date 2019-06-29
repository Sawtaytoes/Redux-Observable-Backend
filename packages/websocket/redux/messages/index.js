const { combineEpics } = require('redux-observable')

const sendMessageEpic = require('./sendMessageEpic')
const broadcastMessageEpic = require('./broadcastMessageEpic')

const messagesEpic = (
	combineEpics(
		sendMessageEpic,
		broadcastMessageEpic,
	)
)

module.exports = {
	messagesEpic,
}
