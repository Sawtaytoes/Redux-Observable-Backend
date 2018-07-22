const sanitizeConfigurationSet = ({
	isLocalDevelopment,
	nodeEnv,
	protocol,
	...props
}) => ({
	...props,
	isDeployment: nodeEnv !== 'development',
	isLocalDevelopment: (
		Boolean(
			isLocalDevelopment
		)
	),
	isSecure: protocol === 'https',
	nodeEnv,
	protocol,
})

module.exports = sanitizeConfigurationSet
