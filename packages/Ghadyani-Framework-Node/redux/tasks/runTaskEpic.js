const yargs = require('yargs')
const { combineLatest } = require('rxjs')
const { ignoreElements, switchMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const stateSelector = require('@scripts/utils/rxjs/stateSelector')
const { defaultConfigurationsNamespace } = require('@redux/configurations/actions')
const { getConfigurationSet } = require('@redux/configurations/selectors')
const { getTask } = require('./selectors')
const { RUN_TASK } = require('./actions')

const configurationSetProps = {
	namespace: defaultConfigurationsNamespace,
}

const runTaskEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(RUN_TASK),
			switchMap(({
				taskName = yargs.argv.task,
			}) => (
				combineLatest(
					(
						stateSelector({
							props: { taskName },
							selector: getTask,
							state$,
						})
					),
					(
						stateSelector({
							props: configurationSetProps,
							selector: getConfigurationSet,
							state$,
						})
					),
				)
				.pipe(
					tap(([task, configurationSet]) => (
						task(configurationSet)
					)),
					ignoreElements(),
				)
			)),
		)
	)
)

module.exports = runTaskEpic
