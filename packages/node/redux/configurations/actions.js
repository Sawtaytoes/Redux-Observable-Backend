const ADD_CONFIGURATION_SET = 'CONFIGURATIONS::ADD_CONFIGURATION_SET'
const COPY_FROM_CONFIGURATION_SET = 'CONFIGURATIONS::COPY_FROM_CONFIGURATION_SET'
const COPY_INTO_CONFIGURATION_SET = 'CONFIGURATIONS::COPY_INTO_CONFIGURATION_SET'
const REMOVE_CONFIGURATION_VALUE = 'CONFIGURATIONS::REMOVE_CONFIGURATION_VALUE'

const defaultConfigurationsNamespace = 'node'

const addConfigurationSet = ({
	configurationSet,
	namespace = defaultConfigurationsNamespace,
}) => ({
	configurationSet,
	namespace,
	type: ADD_CONFIGURATION_SET,
})

const copyIntoConfigurationSet = ({
	configurationSetName,
	namespace = defaultConfigurationsNamespace,
}) => ({
	configurationSetName,
	namespace,
	type: COPY_INTO_CONFIGURATION_SET,
})

const copyFromConfigurationSet = ({
	configurationCopyList,
	configurationSetName = defaultConfigurationsNamespace,
	namespace = defaultConfigurationsNamespace,
}) => ({
	configurationCopyList,
	configurationSetName,
	namespace,
	type: COPY_FROM_CONFIGURATION_SET,
})

const removeConfigurationValue = ({
	configurationName,
	namespace = defaultConfigurationsNamespace,
}) => ({
	configurationName,
	namespace,
	type: REMOVE_CONFIGURATION_VALUE,
})

module.exports = {
	ADD_CONFIGURATION_SET,
	addConfigurationSet,
	COPY_FROM_CONFIGURATION_SET,
	COPY_INTO_CONFIGURATION_SET,
	copyFromConfigurationSet,
	copyIntoConfigurationSet,
	defaultConfigurationsNamespace,
	REMOVE_CONFIGURATION_VALUE,
	removeConfigurationValue,
}
