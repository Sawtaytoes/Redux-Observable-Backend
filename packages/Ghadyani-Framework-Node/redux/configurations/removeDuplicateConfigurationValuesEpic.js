const { filter, map, pluck } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const {
	ADD_CONFIGURATION_SET,
	defaultConfigurationsNamespace,
	removeConfigurationValue,
} = require('./actions')

const removeDuplicateConfigurationValuesEpic = (
	action$ => (
		action$
		.pipe(
			ofType(ADD_CONFIGURATION_SET),
			pluck('namespace'),
			filter(namespace => (
				namespace !== defaultConfigurationsNamespace
			)),
			map(namespace => ({
				configurationName: namespace,
			})),
			map(removeConfigurationValue),
		)
	)
)

module.exports = removeDuplicateConfigurationValuesEpic
