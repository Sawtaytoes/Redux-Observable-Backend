const environmentVariables = require('./environmentVariables')

const addToConfig = (
	(dynamicEnvironmentVariables, dynamicEnvironmentVariable) => ({
		...dynamicEnvironmentVariables,
		...dynamicEnvironmentVariable,
	})
)

const hasPrefix = (
	prefix => EnvironmentVariable => (
		EnvironmentVariable
		.startsWith(prefix)
	)
)

const formatAsConfigName = (
	dynamicEnvironmentVariableName => (
		dynamicEnvironmentVariableName
		.charAt(0)
		.concat(
			dynamicEnvironmentVariableName
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

const getConfigNameFromDynamicEnvironmentVariableName = (
	(prefix, dynamicEnvironmentVariableName) => (
		lowercaseFirstLetter(
			dynamicEnvironmentVariableName
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
	dynamicEnvironmentVariableName => (
		environmentVariables[dynamicEnvironmentVariableName]
	)
)

const singlePrefixFormatter = (
	prefix => dynamicEnvironmentVariableName => ({
		[
			getConfigNameFromDynamicEnvironmentVariableName(
				prefix.concat('_'),
				dynamicEnvironmentVariableName
			)
		]: (
			getBooleanValueFromString(
				getValue(dynamicEnvironmentVariableName)
			)
		),
	})
)

const doublePrefixFormatter = (
	prefix => dynamicEnvironmentVariableName => ({
		[
			dynamicEnvironmentVariableName
			.replace(/^.+?_(.+?)_.*$/, '$1')
			.toLowerCase()
			.concat('_')
			.concat(
				getConfigNameFromDynamicEnvironmentVariableName(
					new RegExp(`^(${prefix}_.+?_)`),
					dynamicEnvironmentVariableName
				)
			)
		]: (
			getBooleanValueFromString(
				getValue(dynamicEnvironmentVariableName)
			)
		),
	})
)

const createDynamicEnvironmentVariables = (
	prefix,
	formatForAppConfig = singlePrefixFormatter
) => (
	Object
	.keys(environmentVariables)
	.filter(hasPrefix(prefix))
	.map(formatForAppConfig(prefix))
	.reduce(addToConfig, {})
)

module.exports = {
	createDynamicEnvironmentVariables,
	doublePrefixFormatter,
}
