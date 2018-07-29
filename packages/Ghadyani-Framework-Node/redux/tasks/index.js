const { combineEpics } = require('redux-observable')

const eslintEpic = require('./eslintEpic')

const tasksEpic = (
	combineEpics(
		eslintEpic,
	)
)

module.exports = {
	tasksEpic,
}
