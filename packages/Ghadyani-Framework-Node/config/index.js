const requireConfigFile = require('scripts/utils/requireConfigFile')
const defaultEnvironmentVariablesConversions = require('config/defaultEnvironmentVariablesConversions')
const projectConfiguration = require('projectConfiguration')
const { dispatch } = require('scripts/redux/store')

const {
	addConfigurationSet,
	addEnvironmentVariableConversions,
} = require('scripts/redux/configurations/actions')

const customConfig = requireConfigFile('custom', {})

dispatch(
	addConfigurationSet(
		projectConfiguration
	)
)

dispatch(
	addEnvironmentVariableConversions(
		defaultEnvironmentVariablesConversions
	)
)

dispatch(
	addConfigurationSet(
		customConfig
	)
)
