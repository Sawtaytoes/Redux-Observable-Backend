const ADD_TASKS = 'TASKS::ADD_TASKS'
const START_TASK = 'TASKS::START_TASK'

const addTasks = (
	tasks => ({
		tasks,
		type: ADD_TASKS,
	})
)

const startTask = (
	taskName => ({
		taskName,
		type: START_TASK,
	})
)

module.exports = {
	ADD_TASKS,
	addTasks,
	START_TASK,
	startTask,
}
