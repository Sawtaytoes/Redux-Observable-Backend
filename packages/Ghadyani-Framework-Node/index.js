#!/usr/bin/env node
require('app-module-path/register')

// Load before any other file
const handleUncaughtExceptions = require('scripts/utils/handleUncaughtExceptions')

const createAndRunTasks = require('scripts/redux/tasks/utils/createAndRunTasks')
const createConfigurationSet = require('scripts/redux/configurations/utils/createConfigurationSet')
const createReduxStore = require('scripts/redux/utils/createReduxStore')

handleUncaughtExceptions
.subscribe()

module.exports = {
	createAndRunTasks,
	createConfigurationSet,
	createReduxStore,
}
