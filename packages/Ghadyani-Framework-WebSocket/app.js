require('./')

const createConfigurationSet = require('scripts/redux/configurations/utils/createConfigurationSet')
const createAndRunTasks = require('scripts/redux/tasks/utils/createAndRunTasks')

createConfigurationSet({})
createAndRunTasks()
