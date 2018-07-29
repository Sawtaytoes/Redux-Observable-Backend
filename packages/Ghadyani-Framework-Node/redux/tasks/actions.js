const START_TASK = 'TASKS::START_TASK'

const startTask = (
	taskName => ({
		taskName,
		type: START_TASK,
	})
)

module.exports = {
	START_TASK,
	startTask,
}
