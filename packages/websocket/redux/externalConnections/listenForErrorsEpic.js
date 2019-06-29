const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { catchError, filter, ignoreElements, mergeMap, pluck, takeUntil } = require('rxjs/operators')
const { ofType } = require('redux-observable')
const { throwError } = require('rxjs')

const {
	ADD_SERVER,
	ERROR_MESSAGE,
	REMOVE_SERVER,
} = require('./actions')

const listenForErrorsEpic = (
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
						ofType(
							ADD_SERVER,
							REMOVE_SERVER,
						),
						ofNamespace(namespace),
					)
				),
				catchError(error => (
					error.constructor.name === 'CloseEvent'
					? throwError(`WebSocket connection closed for ${namespace}.`)
					: throwError(error)
				)),
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
				catchEpicError(),
			)
		)),
		catchEpicError(),
	)
)

module.exports = listenForErrorsEpic
