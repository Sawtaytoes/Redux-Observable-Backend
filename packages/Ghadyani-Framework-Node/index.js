#!/usr/bin/env node
require('@ghadyani-framework/setup-module-aliases')(__dirname)

// Load this before any other file
const logUncaughtExceptions = require('$utils/logUncaughtExceptions')

logUncaughtExceptions
.subscribe()

module.exports = {
	createConfigurationSet: require('$redux/configurations/utils/createConfigurationSet'),
	createReduxStore: require('$redux/utils/createReduxStore'),
	runTasks: require('$redux/tasks/utils/runTasks'),
	safeImport: require('$utils/safeImport'),
}
