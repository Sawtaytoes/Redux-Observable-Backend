const getConfigurationSet = (
	({ configurations }, { namespace }) => (
		configurations
		.configurationSets
		.get(namespace)
	)
)

module.exports = {
	getConfigurationSet,
}
