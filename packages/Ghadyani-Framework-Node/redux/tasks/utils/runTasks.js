const yargs = require('yargs')

const { startTask } = require('../actions')

const cliTask = (
	yargs
	.argv
	.task
)

const runTasks = (
	(...taskNames) => (
		({ dispatch }) => {
			(
				cliTask
				? [cliTask]
				: taskNames
			)
			.map(startTask)
			.forEach(dispatch)
		}
	)
)

module.exports = runTasks
