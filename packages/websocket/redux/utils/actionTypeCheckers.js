const { ofType } = require('redux-observable')

const replaceActionTypeGroup = (
	actionType,
	actionTypeGroup,
) => (
	actionType
	.replace(
		/^.+(::.+)/,
		`${actionTypeGroup}$1`,
	)
)

const ofReponseType = (
	actionType,
) => (
	ofType(
		replaceActionTypeGroup(
			actionType,
			'RESPONSE',
		)
	)
)

const ofRequestType = (
	actionType,
) => (
	ofType(
		replaceActionTypeGroup(
			actionType,
			'REQUEST',
		)
	)
)

module.exports = {
	ofReponseType,
	ofRequestType,
}
