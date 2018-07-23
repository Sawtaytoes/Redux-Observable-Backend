const { of } = require('rxjs')
const { tap } = require('rxjs/operators')

require('./')

const {
	createAndRunTasks,
	createConfigurationSet,
	createReduxStore,
} = require('@ghadyani-framework/node')

const {
	rootEpic,
	rootReducers,
} = require('$$redux')

of(
	createReduxStore({
		additionalEpics: rootEpic,
		additionalReducers: rootReducers,
	})
)
.pipe(
	tap(createConfigurationSet({})),
	tap(createAndRunTasks()),
)
.subscribe()
