require('better-module-alias')(__dirname) // Include this import before local imports.
const { logUncaughtExceptions } = require('@redux-observable-backend/core')

logUncaughtExceptions()

const { applyMiddleware, createStore } = require('redux')
const { createActionLoggerMiddleware } = require('@redux-observable-backend/redux-utils')
const { createEpicMiddleware } = require('redux-observable')
const { of } = require('rxjs')
const { tap } = require('rxjs/operators')

const {
	createConfigurationSet,
	runTasks,
} = require('./')

const {
	rootEpic,
	rootReducer,
} = require('$redux')

const actionLoggerMiddleware = (
	createActionLoggerMiddleware()
)

const epicMiddleware = createEpicMiddleware()

const middleware = (
	applyMiddleware(
		actionLoggerMiddleware,
		epicMiddleware,
	)
)

const store = (
	createStore(
		rootReducer,
		middleware,
	)
)

epicMiddleware
.run(rootEpic)

of(store)
.pipe(
	tap(createConfigurationSet({})),
	tap(runTasks('lint')),
)
.subscribe()
