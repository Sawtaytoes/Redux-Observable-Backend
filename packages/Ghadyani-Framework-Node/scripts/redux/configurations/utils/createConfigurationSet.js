const convertToConfigurationSet = require('./convertToConfigurationSet')
const createCustomConfigurationSet = require('./createCustomConfigurationSet')
const defaultConfigurationSet = require('config/defaultConfigurationSet')
const defaultEnvironmentVariablesConversions = require('config/defaultEnvironmentVariablesConversions')
const requireConfigFile = require('scripts/utils/requireConfigFile')
const { dispatch } = require('scripts/redux/store')
const { doublePrefixFormatter } = require('scripts/redux/configurations/utils/dynamicEnvironmentVariables')

const {
	addConfigurationSet,
	copyFromConfigurationSet,
} = require('scripts/redux/configurations/actions')

const projectConfigurationSet = requireConfigFile('projectConfig', {})
const localConfigurationSet = requireConfigFile('localConfig', {})

const createConfigurationSet = ({
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

	dispatch(
		addConfigurationSet({
			configurationSet: {
				...defaultConfigurationSet,
				...additionalDefaultConfigurationSet,
				...environmentVariables,
				...projectConfigurationSet,
				...localConfigurationSet,
			},
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
