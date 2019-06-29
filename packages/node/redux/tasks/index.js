const { combineEpics } = require('redux-observable')

const eslintEpic = require('./eslintEpic')

const tasksEpic = (
	combineEpics(
		eslintEpic,
	)
)

module.exports = {
	tasks: {
		actions: require('./actions'),
	},
	tasksEpic,
}
