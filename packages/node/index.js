#!/usr/bin/env node
require('better-module-alias')(__dirname)
require('@redux-observable-backend/core')

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
}
