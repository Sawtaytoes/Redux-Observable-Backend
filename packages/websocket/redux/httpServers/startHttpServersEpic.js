const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { configurations, ofTaskName, tasks } = require('@redux-observable-backend/node')
const { ignoreElements, map, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const getServerUrl = require('./utils/getServerUrl')
const onListening = require('./utils/onListening')
const { selectHttpServer } = require('./selectors')

const startHttpServersEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(
			tasks
			.actions
			.START_TASK
		),
		ofTaskName(
			'serve',
			'undefined',
		),
		map(() => ({
			configurationSet: (
				configurations
				.selectors
				.selectConfigurationSet()(
					state$.value,
				)
			),
			httpServer: (
				selectHttpServer()(
					state$.value,
				)
			),
		})),
		tap(({
			configurationSet,
			httpServer,
		}) => {
			httpServer
			.listen(
				configurationSet.port,
				(
					onListening(
						'WebSocket Server running as',
						(
							getServerUrl({
								hostname: configurationSet.hostname,
								port: configurationSet.port,
								protocol: configurationSet.protocol,
							})
							.replace(
								'http',
								'ws',
							)
						)
					)
				)
			)
		}),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = startHttpServersEpic
