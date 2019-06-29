#!/usr/bin/env node
require('module-alias/register')

// Load this before any other file
const handleUncaughtExceptions = require('$utils/handleUncaughtExceptions')

const createAndRunTasks = require('$redux/tasks/utils/createAndRunTasks')
const createConfigurationSet = require('$redux/configurations/utils/createConfigurationSet')
const createReduxStore = require('$redux/utils/createReduxStore')

handleUncaughtExceptions
.subscribe()

module.exports = {
	createAndRunTasks,
	createConfigurationSet,
	createReduxStore,
}
