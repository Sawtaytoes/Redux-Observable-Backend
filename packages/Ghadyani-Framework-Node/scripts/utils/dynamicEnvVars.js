const addToConfig = (
	(dynamicEnvVars, dynamicEnvVar) => ({
		...dynamicEnvVars,
		...dynamicEnvVar,
	})
)

const hasPrefix = (
	prefix => envVar => (
		envVar
		.startsWith(prefix)
	)
)

const formatAsConfigName = (
	dynamicEnvVarName => (
		dynamicEnvVarName
		.charAt(0)
		.concat(
			dynamicEnvVarName
			.slice(1)
			.toLowerCase()
		)
	)
)

const lowercaseFirstLetter = (
	configName => (
		configName
		.charAt(0)
		.toLowerCase()
		.concat(
			configName
			.slice(1)
		)
	)
)

const getConfigNameFromDynamicEnvVarName = (
	(prefix, dynamicEnvVarName) => (
		lowercaseFirstLetter(
			dynamicEnvVarName
			.replace(prefix, '')
			.split('_')
			.map(formatAsConfigName)
			.join('')
		)
	)
)

const booleanValues = {
	true: true,
	false: false,
}

const getBooleanValueFromString = (
	value => (
		typeof booleanValues[value] === 'boolean'
		? booleanValues[value]
		: value
	)
)

const getValue = (
	dynamicEnvVarName => (
		process.env[dynamicEnvVarName]
	)
)

const singlePrefixFormatter = (
	prefix => dynamicEnvVarName => ({
		[
			getConfigNameFromDynamicEnvVarName(
				prefix.concat('_'),
				dynamicEnvVarName
			)
		]: (
			getBooleanValueFromString(
				getValue(dynamicEnvVarName)
			)
		),
	})
)

const doublePrefixFormatter = (
	prefix => dynamicEnvVarName => ({
		[
			dynamicEnvVarName
			.replace(/^.+?_(.+?)_.*$/, '$1')
			.toLowerCase()
			.concat('_')
			.concat(
				getConfigNameFromDynamicEnvVarName(
					new RegExp(`^(${prefix}_.+?_)`),
					dynamicEnvVarName
				)
			)
		]: (
			getBooleanValueFromString(
				getValue(dynamicEnvVarName)
			)
		),
	})
)

const createDynamicEnvVars = (
	prefix,
	formatForAppConfig = singlePrefixFormatter
) => (
	Object
	.keys(process.env)
	.filter(hasPrefix(prefix))
	.map(formatForAppConfig(prefix))
	.reduce(addToConfig, {})
)

module.exports = {
	createDynamicEnvVars,
	doublePrefixFormatter,
}
