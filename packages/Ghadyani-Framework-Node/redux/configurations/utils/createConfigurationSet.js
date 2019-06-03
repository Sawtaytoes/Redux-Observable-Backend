const convertToConfigurationSet = require('./convertToConfigurationSet')
const createCustomConfigurationSet = require('./createCustomConfigurationSet')
const defaultConfigurationSet = require('$redux/configurations/utils/defaultConfigurationSet')
const defaultEnvironmentVariablesConversions = require('$redux/configurations/utils/defaultEnvironmentVariablesConversions')
const importConfigFile = require('./importConfigFile')
const sanitizeConfigurationSet = require('./sanitizeConfigurationSet')
const { deprecateArgument } = require('@ghadyani-framework/base')
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
	additionalConfigurationSetDefaults,
	additionalConfigurationSetSanitization = (
		configurationSet => configurationSet
	),
	additionalDefaultConfigurationSet, // DEPRECATED
	configurationCopyList = [],
	environmentVariableConversions,
}) => (
	({ dispatch }) => {
		additionalDefaultConfigurationSet
		&& (
			deprecateArgument({
				deprecatedArgumentName: 'additionalDefaultConfigurationSet',
				functionName: 'createConfigurationSet',
				replacementArgumentName: 'additionalConfigurationSetDefaults',
			})
		)

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
					...additionalConfigurationSetDefaults,
					...additionalDefaultConfigurationSet,
					...environmentVariables,
					...projectConfigurationSet,
					...localConfigurationSet,
				})
			)
		)

		process
		.env
		.NODE_ENV = (
			configurationSet
			.nodeEnv
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
