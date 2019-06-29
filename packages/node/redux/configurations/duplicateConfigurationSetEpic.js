const { map, switchMap } = require('rxjs/operators')
const { of } = require('rxjs')
const { ofType } = require('redux-observable')

const { selectConfigurationSet } = require('./selectors')

const {
	addConfigurationSet,
	COPY_INTO_CONFIGURATION_SET,
} = require('./actions')

const duplicateConfigurationSetEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(COPY_INTO_CONFIGURATION_SET),
			switchMap(({
				configurationSetName,
				namespace,
			}) => (
				of(state$.value)
				.pipe(
					map(
						selectConfigurationSet({
							namespace: configurationSetName,
						})
					),
					map(configurationSet => ({
						configurationSet: {
							[configurationSetName]: (
								configurationSet
							),
						},
						namespace,
					})),
				)
			)),
			map(addConfigurationSet),
		)
	)
)

module.exports = duplicateConfigurationSetEpic
