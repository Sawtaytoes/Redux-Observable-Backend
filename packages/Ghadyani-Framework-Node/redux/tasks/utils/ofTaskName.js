const { filter } = require('rxjs/operators')

const ofTaskName = (
	(...expectedTaskNames) => (
		filter(({ taskName }) => (
			expectedTaskNames
			.includes(taskName)
		))
	)
)

module.exports = ofTaskName
