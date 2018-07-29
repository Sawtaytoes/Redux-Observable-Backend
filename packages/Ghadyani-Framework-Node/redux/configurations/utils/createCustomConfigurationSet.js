const importConfigFile = require('./importConfigFile')
const { createDynamicEnvironmentVariables } = require('./dynamicEnvironmentVariables')

const {
	addConfigurationSet,
	copyIntoConfigurationSet,
} = require('$redux/configurations/actions')

const projectConfigurationSet = (
	importConfigFile(
		'projectConfig',
		{},
	)
)

const localConfigurationSet = (
	importConfigFile(
		'localConfig',
		{},
	)
)

const createCustomConfigurationSet = ({
	additionalDefaultConfigurationSet,
	configurationSetName,
	environmentVariableFormatter,
	environmentVariablePrefix,
	isPartOfAppConfiguration,
}) => (
	({ dispatch }) => {
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
)

module.exports = createCustomConfigurationSet
