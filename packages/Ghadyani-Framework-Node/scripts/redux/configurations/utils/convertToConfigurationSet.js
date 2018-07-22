const environmentVariables = require('./environmentVariables')

const createConfigurationSet = (
	(combined, { key, value }) => ({
		...combined,
		[key]: value,
	})
)

const getEnvironmentVariableValue = (
	environmentVariableConversions => (
		key => ({
			key: environmentVariableConversions[key],
			value: environmentVariables[key],
		})
	)
)

const hasValue = ({ value }) => (
	typeof value !== 'undefined'
)

const convertToConfigurationSet = (
	environmentVariableConversions => (
		Object
		.keys(environmentVariableConversions)
		.map(
			getEnvironmentVariableValue(
				environmentVariableConversions
			)
		)
		.filter(hasValue)
		.reduce(
			createConfigurationSet,
			{},
		)
	)
)

module.exports = convertToConfigurationSet
