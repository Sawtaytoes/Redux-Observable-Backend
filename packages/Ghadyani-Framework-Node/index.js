#!/usr/bin/env node
require('app-module-path/register')

// Load before any other file
const handleUncaughtExceptions = require('scripts/utils/handleUncaughtExceptions')

const createAndRunTasks = require('scripts/redux/tasks/utils/createAndRunTasks')
const createConfigurationSet = require('scripts/redux/configurations/utils/createConfigurationSet')

handleUncaughtExceptions
.subscribe()

module.exports = {
	createConfigurationSet,
	createAndRunTasks,
}
