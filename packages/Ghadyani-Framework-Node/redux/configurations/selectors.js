const { defaultConfigurationsNamespace } = require('$redux/configurations/actions')

const getConfigurationSet = (
	({ configurations }, props) => (
		configurations
		.configurationSets
		.get(
			props
			? props.namespace
			: defaultConfigurationsNamespace
		)
	)
)

module.exports = {
	getConfigurationSet,
}
