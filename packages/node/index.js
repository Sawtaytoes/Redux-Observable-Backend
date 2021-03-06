#!/usr/bin/env node
require('better-module-alias')(__dirname)
require('@redux-observable-backend/core')

const {
	rootEpic,
	rootReducers,
} = require('$redux')

module.exports = {
	configurations: require('$redux/configurations').configurations,
	createConfigurationSet: require('$redux/configurations/utils/createConfigurationSet'),
	createCustomConfigurationSet: require('$redux/configurations/utils/createCustomConfigurationSet'),
	nodeEpic: rootEpic,
	nodeReducers: rootReducers,
	ofTaskName: require('$redux/tasks/utils/ofTaskName'),
	runTasks: require('$redux/tasks/utils/runTasks'),
	tasks: require('$redux/tasks').tasks,
}
