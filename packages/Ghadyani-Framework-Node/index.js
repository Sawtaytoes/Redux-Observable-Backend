#!/usr/bin/env node
require('module-alias/register')

// Load this before any other file
const handleUncaughtExceptions = require('$utils/handleUncaughtExceptions')

const createConfigurationSet = require('$redux/configurations/utils/createConfigurationSet')
const createReduxStore = require('$redux/utils/createReduxStore')
const runTasks = require('$redux/tasks/utils/runTasks')

handleUncaughtExceptions
.subscribe()

module.exports = {
	createConfigurationSet,
	createReduxStore,
	runTasks,
}
