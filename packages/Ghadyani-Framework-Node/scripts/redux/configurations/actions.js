const ADD_CONFIGURATION_SET = 'CONFIGURATIONS::ADD_CONFIGURATION_SET'
const ADD_ENVIRONMENT_VARIABLE_CONVERSIONS = 'CONFIGURATIONS::ADD_ENVIRONMENT_VARIABLE_CONVERSIONS'

const addConfigurationSet = (
	configurationSet => ({
		configurationSet,
		type: ADD_CONFIGURATION_SET,
	})
)

const addEnvironmentVariableConversions = (
	environmentVariableConversions => ({
		environmentVariableConversions,
		type: ADD_ENVIRONMENT_VARIABLE_CONVERSIONS,
	})
)

module.exports = {
	ADD_CONFIGURATION_SET,
	ADD_ENVIRONMENT_VARIABLE_CONVERSIONS,
	addConfigurationSet,
	addEnvironmentVariableConversions,
}
