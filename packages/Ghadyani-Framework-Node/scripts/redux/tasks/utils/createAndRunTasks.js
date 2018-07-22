const { dispatch } = require('scripts/redux/store')

const {
	addTasks,
	runTask,
} = require('../actions')

const eslint = config => (
	require('./eslint')(config)
)

const defaultTaskNames = {
	lint: eslint,
	undefined: eslint,
}

const createAndRunTasks = (tasks = {}) => {
	dispatch(
		addTasks({
			...defaultTaskNames,
			...tasks,
		})
	)

	dispatch(
		runTask()
	)
}

module.exports = createAndRunTasks
