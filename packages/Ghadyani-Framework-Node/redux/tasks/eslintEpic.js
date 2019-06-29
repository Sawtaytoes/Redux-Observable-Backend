const { ignoreElements, switchMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const ofTaskName = require('./utils/ofTaskName')
const runEslint = require('./utils/runEslint')
const stateSelector = require('$redux/utils/stateSelector')
const { getConfigurationSet } = require('$redux/configurations/selectors')
const { START_TASK } = require('./actions')

const eslintEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(START_TASK),
			ofTaskName(
				'lint',
				'undefined',
			),
			switchMap(() => (
				stateSelector({
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
