const { filter, mergeMap } = require('rxjs/operators')
const { merge, of } = require('rxjs')
const { ofType } = require('redux-observable')

const {
	sendMessage,
	BROADCAST_MESSAGE,
} = require('./actions')

const broadcastMessageEpic = action$ => (
	action$
	.pipe(
		ofType(BROADCAST_MESSAGE),
		filter(({ connections }) => connections),
		mergeMap(({ connections, message }) => (
			merge(
				...(
					connections
					.map(connection => ({
						connection,
						message,
					}))
					.map(sendMessage)
					.map(of)
				)
			)
		)),
	)
)

module.exports = broadcastMessageEpic
