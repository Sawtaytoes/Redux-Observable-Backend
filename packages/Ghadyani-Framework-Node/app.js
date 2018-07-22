require('./')

const createConfigurationSet = require('scripts/redux/configurations/utils/createConfigurationSet')
const createAndRunTasks = require('scripts/redux/tasks/utils/createAndRunTasks')

createConfigurationSet({})
createAndRunTasks()

// const runTask = require('scripts/runTask')

// runTask()
// .subscribe({
// 	complete: () => console.info('-- Completed running tasks. --'),
// 	error: error => console.error(error),
// })
