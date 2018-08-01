const { map, switchMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { configurationSetSelector } = require('./selectors')
const { stateSelector } = require('@ghadyani-framework/redux-utils')

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
					selector: configurationSetSelector,
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
