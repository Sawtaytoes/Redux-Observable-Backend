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

const createAndRunTasks = (
	(tasks = {}) => (
		({ dispatch }) => {
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
	)
)

module.exports = createAndRunTasks
