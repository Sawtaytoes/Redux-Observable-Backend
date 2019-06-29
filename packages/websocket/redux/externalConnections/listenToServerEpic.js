const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { catchError, ignoreElements, mapTo, mergeMap, startWith, takeUntil } = require('rxjs/operators')
const { timer } = require('rxjs')
const { ofType } = require('redux-observable')

const {
	ADD_SERVER,
	connectionReady,
	DISCONNECT_FROM_SERVER,
	reconnectToServer,
	REMOVE_SERVER,
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
						ofType(
							ADD_SERVER,
							REMOVE_SERVER,
						),
						ofNamespace(namespace),
					)
				),
				ignoreElements(),
				catchError(() => (
					timer(5000)
					.pipe(
						takeUntil(
							action$
							.pipe(
								ofType(DISCONNECT_FROM_SERVER),
								ofNamespace(namespace),
							)
						),
						mapTo(
							reconnectToServer(
								namespace
							)
						),
					)
				)),
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
