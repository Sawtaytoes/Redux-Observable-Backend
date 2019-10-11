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
			adapter: (state, props) => selectConfigurationSet(props)(state),
			deprecatedMethodName: 'configurationSetSelector',
			replacementMethodName: 'selectConfigurationSet',
		})
	),
	selectConfigurationSet,
}
