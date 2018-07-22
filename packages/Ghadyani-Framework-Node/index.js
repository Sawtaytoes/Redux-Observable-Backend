#!/usr/bin/env node
require('app-module-path/register')

const chalk = require('chalk')
const simpleMap = require('scripts/utils/rxjs/simpleMap')
const { fromEvent } = require('rxjs')
const { pluck } = require('rxjs/operators')

fromEvent(
	process,
	'uncaughtException',
)
.pipe(
	pluck('stack'),
	simpleMap(chalk.red),
	simpleMap(console.error),
)
.subscribe()

const createConfigurationSet = require('scripts/redux/configurations/utils/createConfigurationSet')
const createAndRunTasks = require('scripts/redux/tasks/utils/createAndRunTasks')

module.exports = {
	createConfigurationSet,
	createAndRunTasks,
}
