const { ignoreElements, switchMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const ofTaskName = require('./utils/ofTaskName')
const startWebSocketServers = require('./utils/startWebSocketServers')
const stateSelector = require('$utils/rxjs/stateSelector')
const { defaultConfigurationsNamespace } = require('$redux/configurations/actions')
const { getConfigurationSet } = require('$redux/configurations/selectors')
const { START_TASK } = require('./actions')

const configurationSetProps = {
	namespace: defaultConfigurationsNamespace,
}

const startWebSocketServersEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(START_TASK),
			ofTaskName(
				'serve',
				'undefined',
			),
			switchMap(() => (
				stateSelector({
					props: configurationSetProps,
					selector: getConfigurationSet,
					state$,
				})
				.pipe(
					tap(startWebSocketServers),
				)
			)),
		)
	)
)

module.exports = startWebSocketServersEpic
