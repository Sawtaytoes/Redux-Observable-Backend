const getTask = (
	({ tasks }, { taskName }) => (
		tasks
		.tasksList[taskName]
	)
)

module.exports = {
	getTask,
}
