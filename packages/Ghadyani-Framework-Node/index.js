#!/usr/bin/env node
require('@ghadyani-framework/setup-module-aliases')(__dirname)

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
