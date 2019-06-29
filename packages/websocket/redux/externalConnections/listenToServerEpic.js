const { ADD_SERVER } = require('./actions')
const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { filter, ignoreElements, mergeMap, pluck, startWith, takeUntil, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')
const { throwError } = require('rxjs')

const {
	connectionReady,
	ERROR_MESSAGE,
} = require('./actions')

const listenToServerEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADD_SERVER),
		mergeMap(({
			connection,
			namespace,
		}) => (
			connection
			.pipe(
				takeUntil(
					action$
					.pipe(
						ofType(ADD_SERVER),
						ofNamespace(namespace),
					)
				),
				filter(response => (
					typeof response === 'object'
					&& (
						response
						.type
					)
					&& (
						response
						.type === ERROR_MESSAGE
					)
				)),
				pluck('errorMessage'),
				mergeMap(throwError),
				ignoreElements(),
				startWith(
					connectionReady({
						connection,
						namespace,
					}
				)),
				catchEpicError(),
			)
		)),
		catchEpicError(),
	)
)

module.exports = listenToServerEpic
