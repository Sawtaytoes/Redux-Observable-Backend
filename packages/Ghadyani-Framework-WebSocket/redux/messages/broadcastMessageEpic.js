const { ActionsObservable, ofType } = require('redux-observable')
const { filter, mergeMap } = require('rxjs/operators')
const { merge } = require('rxjs')

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
					.map(action => (
						ActionsObservable
						.of(action)
					))
				)
			)
		)),
	)
)

module.exports = broadcastMessageEpic
