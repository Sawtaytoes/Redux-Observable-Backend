const { map } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const {
	ADD_ENVIRONMENT_VARIABLE_CONVERSIONS,
	addConfigurationSet,
} = require('./actions')

const environmentVariables = process.env

const createConfigObject = (acc, { key, value }) => ({
	...acc,
	[key]: value,
})

const getProcessEnvValue = (
	environmentVariableConversions => (
		key => ({
			key: environmentVariableConversions[key],
			value: environmentVariables[key],
		})
	)
)

const hasValue = ({ value }) => typeof value !== 'undefined'

const convertEnvironmentVariableToConfigSetEpic = (
	action$ => (
		action$
		.pipe(
			ofType(ADD_ENVIRONMENT_VARIABLE_CONVERSIONS),
			map(environmentVariableConversions => (
				Object
				.keys(environmentVariableConversions)
				.map(getProcessEnvValue(environmentVariableConversions))
				.filter(hasValue)
				.reduce(createConfigObject, {})
			)),
			map(addConfigurationSet),
		)
	)
)

module.exports = convertEnvironmentVariableToConfigSetEpic
