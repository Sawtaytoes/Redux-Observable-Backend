const { of } = require('rxjs')
const { tap } = require('rxjs/operators')

const {
	createConfigurationSet,
	createReduxStore,
	runTasks,
} = require('@ghadyani-framework/node')

const {
	createHttpServers,
	createWebSocketServers,
} = require('./')

const {
	rootEpic,
	rootReducers,
} = require('$redux')

of(
	createReduxStore({
		additionalEpics: rootEpic,
		additionalReducers: rootReducers,
	})
)
.pipe(
	tap(createConfigurationSet({})),
	tap(createHttpServers()),
	tap(createWebSocketServers()),
	tap(
		runTasks(
			'lint',
			'serve',
		)
	),
)
.subscribe()
