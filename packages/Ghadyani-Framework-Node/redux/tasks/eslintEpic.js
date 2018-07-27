const { ignoreElements, switchMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const ofTaskName = require('./utils/ofTaskName')
const runEslint = require('./utils/runEslint')
const stateSelector = require('$redux/utils/rxjs/stateSelector')
const { defaultConfigurationsNamespace } = require('$redux/configurations/actions')
const { getConfigurationSet } = require('$redux/configurations/selectors')
const { START_TASK } = require('./actions')

const configurationSetProps = {
	namespace: defaultConfigurationsNamespace,
}

const eslintEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(START_TASK),
			ofTaskName(
				'eslint',
				'undefined',
			),
			switchMap(() => (
				stateSelector({
					props: configurationSetProps,
					selector: getConfigurationSet,
					state$,
				})
				.pipe(
					tap(runEslint),
					ignoreElements(),
				)
			)),
		)
	)
)

module.exports = eslintEpic
