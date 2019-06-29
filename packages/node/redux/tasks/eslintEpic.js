const { ignoreElements, switchMap, map, tap } = require('rxjs/operators')
const { of } = require('rxjs')
const { ofType } = require('redux-observable')

const ofTaskName = require('./utils/ofTaskName')
const runEslint = require('./utils/runEslint')
const { selectConfigurationSet } = require('$redux/configurations/selectors')
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
				of(state$.value)
				.pipe(
					map(selectConfigurationSet),
					tap(runEslint),
					ignoreElements(),
				)
			)),
		)
	)
)

module.exports = eslintEpic
