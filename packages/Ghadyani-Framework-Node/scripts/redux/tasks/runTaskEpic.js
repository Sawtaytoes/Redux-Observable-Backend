const yargs = require('yargs')
const { ignoreElements, switchMap, tap } = require('rxjs/operators')
const { combineLatest, of } = require('rxjs')
const { ofType } = require('redux-observable')

const mapToSelector = require('scripts/utils/rxjs/mapToSelector')
const { defaultConfigurationsNamespace } = require('scripts/redux/configurations/actions')
const { getConfigurationSet } = require('scripts/redux/configurations/selectors')
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
						of(state$.value)
						.pipe(
							mapToSelector(
								getTask,
								{ taskName },
							),
						)
					),
					(
						of(state$.value)
						.pipe(
							mapToSelector(
								getConfigurationSet,
								configurationSetProps,
							),
						)
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
