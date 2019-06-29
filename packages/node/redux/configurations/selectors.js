const { createDeprecatedFunction } = require('@redux-observable-backend/core')

const { defaultConfigurationsNamespace } = require('$redux/configurations/actions')

const selectConfigurationSet = (
	props,
) => ({
	configurations,
}) => (
	configurations
	.configurationSets
	.get(
		props
		? props.namespace
		: defaultConfigurationsNamespace
	)
)

module.exports = {
	configurationSetSelector: (
		createDeprecatedFunction({
			deprecatedMethodName: 'configurationSetSelector',
			func: (state, props) => selectConfigurationSet(props)(state),
			replacementMethodName: 'selectConfigurationSet',
		})
	),
	selectConfigurationSet,
}
