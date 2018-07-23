const { fromEvent } = require('rxjs')
const { map, mapTo, mergeMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const {
	ADD_CLIENT,
	removeClient,
} = require('./actions')

const removeDisconnectedClientsEpic = (
	action$ => (
		action$
		.pipe(
			ofType(ADD_CLIENT),
			mergeMap(({ connection }) => (
				fromEvent(
					connection,
					'close',
				)
				.pipe(
					mapTo(connection)
				)
			)),
			map(removeClient),
		)
	)
)

module.exports = removeDisconnectedClientsEpic
