const convertToConfigurationSet = require('./convertToConfigurationSet')
const createCustomConfigurationSet = require('./createCustomConfigurationSet')
const defaultConfigurationSet = require('$redux/configurations/utils/defaultConfigurationSet')
const defaultEnvironmentVariablesConversions = require('$redux/configurations/utils/defaultEnvironmentVariablesConversions')
const importConfigFile = require('./importConfigFile')
const sanitizeConfigurationSet = require('./sanitizeConfigurationSet')
const { doublePrefixFormatter } = require('./dynamicEnvironmentVariables')

const {
	addConfigurationSet,
	copyFromConfigurationSet,
} = require('../actions')

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

const createConfigurationSet = ({
	additionalConfigurationSetSanitization = (
		configurationSet => configurationSet
	),
	additionalDefaultConfigurationSet,
	configurationCopyList = [],
	environmentVariableConversions,
}) => (
	({ dispatch }) => {
		const environmentVariables = (
			convertToConfigurationSet({
				...defaultEnvironmentVariablesConversions,
				...environmentVariableConversions,
			})
		)

		const configurationSet = (
			additionalConfigurationSetSanitization(
				sanitizeConfigurationSet({
					...defaultConfigurationSet,
					...additionalDefaultConfigurationSet,
					...environmentVariables,
					...projectConfigurationSet,
					...localConfigurationSet,
				})
			)
		)

		dispatch(
			addConfigurationSet({
				configurationSet,
			})
		)

		dispatch(
			copyFromConfigurationSet({
				configurationCopyList: (
					configurationCopyList
					.concat([
						'applicationName',
						'environmentName',
						'hostedAddress',
					])
				),
				namespace: 'app',
			})
		)

		const featureFlagsConfigurationSetProps = {
			configurationSetName: (
				'featureFlags'
			),
			environmentVariableFormatter: (
				doublePrefixFormatter
			),
			environmentVariablePrefix: (
				'FEATUREFLAG'
			),
			isPartOfAppConfig: true,
		}

		createCustomConfigurationSet(
			featureFlagsConfigurationSetProps
		)({
			dispatch,
		})
	}
)

module.exports = createConfigurationSet
