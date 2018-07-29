const { filter, map, reduce, switchMap } = require('rxjs/operators')
const { of } = require('rxjs')
const { ofType } = require('redux-observable')

const stateSelector = require('$redux/utils/stateSelector')
const { getConfigurationSet } = require('./selectors')

const {
	addConfigurationSet,
	COPY_FROM_CONFIGURATION_SET,
} = require('./actions')

const copyConfigurationListEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(COPY_FROM_CONFIGURATION_SET),
			switchMap(({
				configurationCopyList,
				configurationSetName,
				namespace,
			}) => (
				stateSelector({
					props: { namespace: configurationSetName },
					selector: getConfigurationSet,
					state$,
				})
				.pipe(
					switchMap(configurationSet => (
						of(configurationSet)
						.pipe(
							switchMap(Object.keys),
							filter(key => (
								configurationCopyList
								.includes(key)
							)),
							reduce(
								(combined, key) => ({
									...combined,
									[key]: (
										configurationSet[key]
									),
								}),
								{},
							),
						)
					)),
					map(configurationSet => ({
						configurationSet,
						namespace,
					})),
				)
			)),
			map(addConfigurationSet),
		)
	)
)

module.exports = copyConfigurationListEpic
