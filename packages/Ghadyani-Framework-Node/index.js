#!/usr/bin/env node
require('@ghadyani-framework/setup-module-aliases')(__dirname)

// Load this before any other file
const logUncaughtExceptions = require('$utils/logUncaughtExceptions')

logUncaughtExceptions
.subscribe()

const {
	rootEpic,
	rootReducers,
} = require('$redux')

module.exports = {
	createConfigurationSet: require('$redux/configurations/utils/createConfigurationSet'),
	nodeEpic: rootEpic,
	nodeReducers: rootReducers,
	ofTaskName: require('$redux/tasks/utils/ofTaskName'),
	runTasks: require('$redux/tasks/utils/runTasks'),
	safeImport: require('$utils/safeImport'),
}
