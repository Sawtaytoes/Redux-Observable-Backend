const ADD_TASKS = 'TASKS::ADD_TASKS'
const RUN_TASK = 'TASKS::RUN_TASK'

const addTasks = (
	tasks => ({
		tasks,
		type: ADD_TASKS,
	})
)

const runTask = (
	taskName => ({
		taskName,
		type: RUN_TASK,
	})
)

module.exports = {
	ADD_TASKS,
	addTasks,
	RUN_TASK,
	runTask,
}
