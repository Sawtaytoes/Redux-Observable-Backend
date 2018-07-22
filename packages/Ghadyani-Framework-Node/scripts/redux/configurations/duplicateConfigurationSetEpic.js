const { map, switchMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const stateSelector = require('scripts/utils/rxjs/stateSelector')
const { getConfigurationSet } = require('./selectors')

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
				stateSelector({
					props: { namespace: configurationSetName },
					selector: getConfigurationSet,
					state$,
				})
				.pipe(
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
