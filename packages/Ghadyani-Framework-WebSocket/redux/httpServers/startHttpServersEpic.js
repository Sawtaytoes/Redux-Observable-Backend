const { combineLatest } = require('rxjs')
const { ignoreElements, switchMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const getServerUrl = require('./utils/getServerUrl')
const ofTaskName = require('@ghadyani-framework/node/redux/tasks/utils/ofTaskName')
const onListening = require('./utils/onListening')
const stateSelector = require('@ghadyani-framework/node/redux/utils/rxjs/stateSelector')
const { defaultConfigurationsNamespace } = require('@ghadyani-framework/node/redux/configurations/actions')
const { getConfigurationSet } = require('@ghadyani-framework/node/redux/configurations/selectors')
const { getHttpServer } = require('./selectors')
const { START_TASK } = require('@ghadyani-framework/node/redux/tasks/actions')

const configurationSetProps = {
	namespace: defaultConfigurationsNamespace,
}

const startHttpServersEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(START_TASK),
			ofTaskName(
				'serve',
				'undefined',
			),
			switchMap(() => (
				combineLatest(
					stateSelector({
						props: configurationSetProps,
						selector: getConfigurationSet,
						state$,
					}),
					stateSelector({
						selector: getHttpServer,
						state$,
					}),
				)
			)),
			tap(([
				{
					hostname,
					port,
					protocol,
				},
				httpServer,
			]) => (
				httpServer
				.listen(
					port,
					(
						onListening(
							'WebSocket Server running as',
							(
								getServerUrl({
									hostname,
									port,
									protocol,
								})
								.replace('http', 'ws')
							)
						)
					)
				)
			)),
			ignoreElements(),
		)
	)
)

module.exports = startHttpServersEpic
