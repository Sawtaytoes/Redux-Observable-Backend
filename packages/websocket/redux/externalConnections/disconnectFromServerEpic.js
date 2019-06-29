const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { map, pluck } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const {
	DISCONNECT_FROM_SERVER,
	removeServer,
} = require('./actions')

const disconnectFromServerEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(DISCONNECT_FROM_SERVER),
		pluck('namespace'),
		map(removeServer),
		catchEpicError(),
	)
)

module.exports = disconnectFromServerEpic
