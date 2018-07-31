const { combineEpics } = require('redux-observable')

const stateCliEpic = require('./stateCliEpic')

const cliEpic = (
	combineEpics(
		stateCliEpic,
	)
)

module.exports = {
	cliEpic,
}
