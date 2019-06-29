const { defaultConfigurationsNamespace } = require('$redux/configurations/actions')

const configurationSetSelector = (
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
	configurationSetSelector,
}
