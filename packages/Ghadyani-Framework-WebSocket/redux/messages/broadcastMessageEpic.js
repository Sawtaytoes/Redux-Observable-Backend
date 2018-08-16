const { filter, map, mergeMap } = require('rxjs/operators')
const { from } = require('rxjs')
const { ofType } = require('redux-observable')

const {
	sendMessage,
	BROADCAST_MESSAGE,
} = require('./actions')

const broadcastMessageEpic = (
	action$ => (
		action$
		.pipe(
			ofType(BROADCAST_MESSAGE),
			filter(({ connections }) => connections),
			mergeMap(({ connections, message }) => (
				from(connections)
				.pipe(
					map(connection => ({
						connection,
						message,
					})),
					map(sendMessage),
				)
			)),
		)
	)
)

module.exports = broadcastMessageEpic
