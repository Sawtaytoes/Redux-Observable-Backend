const convertToConfigurationSet = require('./convertToConfigurationSet')
const createCustomConfigurationSet = require('./createCustomConfigurationSet')
const defaultConfigurationSet = require('config/defaultConfigurationSet')
const defaultEnvironmentVariablesConversions = require('config/defaultEnvironmentVariablesConversions')
const requireConfigFile = require('scripts/utils/requireConfigFile')
const sanitizeConfigurationSet = require('./sanitizeConfigurationSet')
const { dispatch } = require('scripts/redux/store')
const { doublePrefixFormatter } = require('./dynamicEnvironmentVariables')

const {
	addConfigurationSet,
	copyFromConfigurationSet,
} = require('../actions')

const projectConfigurationSet = requireConfigFile('projectConfig', {})
const localConfigurationSet = requireConfigFile('localConfig', {})

const createConfigurationSet = ({
	additionalConfigurationSetSanitization = (
		configurationSet => configurationSet
	),
	additionalDefaultConfigurationSet,
	configurationCopyList = [],
	environmentVariableConversions,
}) => {
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

	createCustomConfigurationSet({
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
	})
}

module.exports = createConfigurationSet
