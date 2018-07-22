const requireConfigFile = require('scripts/utils/requireConfigFile')
const { createDynamicEnvironmentVariables } = require('scripts/redux/configurations/utils/dynamicEnvironmentVariables')
const { dispatch } = require('scripts/redux/store')

const {
	addConfigurationSet,
	copyIntoConfigurationSet,
} = require('scripts/redux/configurations/actions')

const projectConfigurationSet = requireConfigFile('projectConfig', {})
const localConfigurationSet = requireConfigFile('localConfig', {})

const createCustomConfigurationSet = ({
	additionalDefaultConfigurationSet,
	configurationSetName,
	environmentVariableFormatter,
	environmentVariablePrefix,
	isPartOfAppConfiguration,
}) => {
	const dynamicEnvironmentVariables = (
		environmentVariablePrefix
		&& (
			createDynamicEnvironmentVariables(
				environmentVariablePrefix,
				environmentVariableFormatter,
			)
		)
	)

	const projectCustomConfigurationSet = (
		projectConfigurationSet[
			configurationSetName
		]
	)

	const localCustomConfigurationSet = (
		localConfigurationSet[
			configurationSetName
		]
	)

	dispatch(
		addConfigurationSet({
			configurationSet: {
				...additionalDefaultConfigurationSet,
				...dynamicEnvironmentVariables,
				...projectCustomConfigurationSet,
				...localCustomConfigurationSet,
			},
			namespace: 'featureFlags',
		})
	)

	isPartOfAppConfiguration
	&& (
		dispatch(
			copyIntoConfigurationSet({
				configurationSetName,
				namespace: 'app',
			})
		)
	)
}

module.exports = createCustomConfigurationSet
