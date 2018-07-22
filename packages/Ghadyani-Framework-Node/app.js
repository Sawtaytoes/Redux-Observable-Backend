require('./')

const createConfigurationSet = require('scripts/redux/configurations/utils/createConfigurationSet')
createConfigurationSet({})

// const runTask = require('scripts/runTask')

// runTask()
// .subscribe({
// 	complete: () => console.info('-- Completed running tasks. --'),
// 	error: error => console.error(error),
// })
