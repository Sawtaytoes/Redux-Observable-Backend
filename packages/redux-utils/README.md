# Redux Observable Backend - Redux Helpers
[What is this library?](https://github.com/Sawtaytoes/Redux-Observable-Backend/blob/master/README.md)

Redux helper functions and middleware.

## Installation
This package requires `rxjs` as a `peerDependency`.

### npm
```sh
npm i rxjs @redux-observable-backend/redux-utils
```

### yarn
```sh
yarn add rxjs @redux-observable-backend/redux-utils
```

## API Overview

### Redux Middleware
- [`createActionLoggerMiddleware`](#createactionloggermiddleware)

### fp Reducer Patterns
- [`createMappedNamespaceReducer`](#createmappednamespacereducer)
- [`createMergeById`](#createmergebyid)
- [`createNamespaceReducer`](#createnamespacereducer)
- [`createNamespaceReducerCreator`](#createnamespacereducercreator)
- [`createNamespaceSelector`](#createnamespaceselector)
- [`createReducer`](#createreducer)
- [`createReducerReducer`](#createreducerreducer)

### RxJS
- [`catchEpicError`](#catchepicerror)
- [`ofNamespace`](#ofnamespace)

## API Docs

### createActionLoggerMiddleware
This is a Redux middleware that will log every action and optionally blacklist actions when passed an array of action types.

#### Example
```js
const { applyMiddleware, createStore } = require('redux')

const middleware = (
  applyMiddleware(
    createActionLoggerMiddleware({
      blacklist: [
        'ACTION_THAT_FIRES_A_LOT', // This will be blacklisted (it doesn't get logged).
      ],
    }),
    epicMiddleware
  )
)

const store = (
  createStore(
    rootReducer,
    middleware,
  )
)
```

#### Args _(Object)_

##### `blacklist` _(Array of string)_
This is useful in muting actions that get fired many times like once every section or actions that you really don't care to see logged while developing.

---

### catchEpicError
Similar to RxJS's `catchError`, this operator will catch an error, log it, and return back the observable passed-in. If no observable is passed, it will return `EMPTY`.

#### Example
```js
someObservable$
.pipe(
  catchEpicError(),
)
```

#### Args

##### `returnValue` _(Observable)_
This is the same value normally returned by `catchError`. If nothing's passed in, it defaults to returning the `EMPTY` observable.

---

### createMappedNamespaceReducer - [More Info](https://medium.com/@Sawtaytoes/the-secret-to-using-redux-createnamespacereducer-d3fed2ccca4a)
A higher-order reducer that allows segmenting a reducer into many dynamic states based on a `namespace` prop on the action.

To pull state off a namespaced reducer, you need to first pull the value off a JavaScript `Map` using `.get(namespace)`. Just make sure your selector has the namespace, or you won't be able to grab that slice of state of your namespaced reducer.

To remove the slice of state, just reset the reducer. As long as the reducer's state is equal to the `initialState`, then it will be removed from your namespaced reducer.

The reason for using this over [`createNamespaceReducer`](#createnamespacereducer), a similar higher-order reducer, is because this uses a `Map` and can take objects as the `namespace` instead of only strings. Examples uses are WebSocket connections, HTTP servers, and Bluetooth devices.

#### Example
##### Standard Use
```js
const configurationSetsReducer = (
  createMappedNamespaceReducer(
    createReducer(
      reducerActions,
      initialState,
    )
  )
)
```

##### Optional Initial State
```js
const reducer = (
  createReducer(
    reducerActions,
    initialState,
  )
)

const initialNamespaceState = (
  new Map()
  .set('default', { isLocalDevelopment: true })
)

const configurationSetsReducer = (
  createMappedNamespaceReducer(
    reducer,
    initialNamespaceState,
  )
)
```

#### Args

##### `reducer` _(Function)_
Since this is a higher-order reducer, it takes a standard `reducer` function.

##### `initialNamespaceState` _(Map)_
While your reducer has its own initial state, the namespace wrapper can also have an initial state. If not passed in, will default to a `new Map()`.

---

### createMergeById
This creates a merge action you can pass to a reducer when a set of items needs to be merged with another set of items by ID.

It expects an array objects. These object should have an ID prop which is specified when calling `createMergeById`.

When merging, it will concatenate all values that are not already present in the current array. It identifies items in the array by their ID prop.

#### Example
##### Standard Use
```js
const mergeById = (
  createMergeById('id')
)

const reducerActions = {
  [ADD_HTTP_API_LIGHTS]: (
    prevState,
    { lights },
  ) => (
    mergeById(
      prevState,
      lights,
    )
  ),
}
```

##### Optional Multiple IDs
```js
const mergeById = (
  createMergeById(
    'nodeId',
    'parentId',
  )
)

const reducerActions = {
  [ADD_NODE]: (
    prevState,
    { nodes },
  ) => (
    mergeById(
      prevState,
      nodes,
    )
  ),
}
```

#### Args
This is a function that returns a function.

##### `ids` _(Arguments)_
A list of IDs to search. Usually this is going to be `id`, but sometimes there are other possible identifiers and sometimes more than just one when you have a many to many relationship in your data.

#### Returned Function Args

##### `currentItems` _(Array)_
An array of previous items. Usually this is your reducer's `previousState`.

##### `updatedItems` _(Array)_
This is an array to be merged and concatenated into the previous array. Usually this is sent in an action's payload.

---

### createNamespaceReducer - [More Info](https://medium.com/@Sawtaytoes/the-secret-to-using-redux-createnamespacereducer-d3fed2ccca4a)
A higher-order reducer that allows segmenting a reducer into many dynamic states based on a `namespace` prop on the action.

To pull state off a namespaced reducer, you need to first pull the value off a JavaScript `Object` using `[namespace]`. Just make sure your selector has the namespace, or you won't be able to grab that slice of state of your namespaced reducer.

To remove the slice of state, just reset the reducer. As long as the reducer's state is equal to the `initialState`, then it will be removed from your namespaced reducer.

This is similar to Redux's official `combineReducers`, but `combineReducers` is statically assigned before Redux is loaded. While `createNamespaceReducer` is also assigned at reducer creation, it allows namespaces to be created on-the-fly through actions rather than the one time `combineReducers` is called.

#### Example
##### Standard Use
```js
const configurationSetsReducer = (
  createNamespaceReducer(
    createReducer(
      reducerActions,
      initialState,
    )
  )
)
```

##### Optional Initial State
```js
const reducer = (
  createReducer(
    reducerActions,
    initialState,
  )
)

const initialNamespaceState = {
  default: {
    isLocalDevelopment: true,
  },
},

const configurationSetsReducer = (
  createNamespaceReducer(
    reducer,
    initialNamespaceState,
  )
)
```

#### Args

##### `reducer` _(Function)_
Since this is a higher-order reducer, it takes a standard `reducer` function.

##### `initialNamespaceState` _(Object)_
While your reducer has its own initial state, the namespace wrapper can also have an initial state. If not passed in, will default to `{}`.

---

### createNamespaceReducerCreator - [More Info](https://medium.com/@Sawtaytoes/the-secret-to-using-redux-createnamespacereducer-d3fed2ccca4a)
This function creates a higher-order reducer that allows segmenting a reducer into many dynamic states based on a `namespace` prop on the action.

Most people will not need this functionality as there's already an `Object` and `Map` version of `createNamespaceReducer`, but it's possible you might be in need of more-custom functionality and another data type. If so, you may need to explore this function.

This function provides the boilerplate necessary and takes in a few callback functions it uses when trying to do certain actions. This way you only need to pass in these functions and don't need to worry about testing the underlying reducer code.

#### Example
```js
const getPreviousState = ({
  namespace,
  previousNamespaceState,
}) => (
  previousNamespaceState[namespace]
)

const removeNamespaceFromState = ({
  namespace,
  previousNamespaceState,
}) => {
  const nextNamespaceState = { ...previousNamespaceState }

  delete nextNamespaceState[namespace]

  return nextNamespaceState
}

const updateNamespaceState = ({
  namespace,
  nextState,
  previousNamespaceState,
}) => ({
  ...previousNamespaceState,
  [namespace]: nextState,
})

const createNamespaceReducer = (
  reducer,
  initialNamespaceState = {},
) => {
  if (typeof initialNamespaceState !== 'object') {
    throw new Error(
      "`initialNamespaceState` not set to type `object` in `createNamespaceReducer`."
    )
  }

  return (
    createNamespaceReducerCreator(
      reducer,
      initialNamespaceState,
      {
        getPreviousState,
        removeNamespaceFromState,
        updateNamespaceState,
      },
    )
  )
}
```

#### Args

##### `reducer` _(Function)_
Since this is a higher-order reducer, it takes a standard `reducer` function.

##### `initialNamespaceState` _(any)_
While your reducer has its own initial state, the namespace wrapper can also have an initial state. This is the default value that would be used when a consumer calls a namespace reducer creator and doesn't pass value.

##### Third Arg _(object)_
The third arg contains functions that get called when `createNamespaceReducerCreator` wants to utilize a namespace to for its own internal functionality.

###### `getPreviousState` _(Function)_ takes _(Object)_
When given a `previousNamespaceState`, grab in the namespaced state off it using `namespace`.

###### `removeNamespaceFromState` _(Function)_
When given a `previousNamespaceState`, remove the namespaced state off it using `namespace`.

###### `updateNamespaceState` _(Function)_
When given a `previousNamespaceState`, update the namespaced state with `nextState` using `namespace`.

---

### createReducer
This is a standard function found in many libraries. It creates a reducer from an object of possible actions and an initial state.

If you don't want to use `if` or `switch` statements when creating a reducer, use `createReducer` instead.

#### Example
```js
const initialState = new Set()

const reducerActions = {
  [ADD_CLIENT]: (
    prevState,
    { connection },
  ) => (
    new Set(prevState)
    .add(connection)
  ),

  [REMOVE_CLIENT]: (
    prevState,
    { connection },
  ) => {
    const nextState = (
      new Set(prevState)
    )

    nextState
    .delete(connection)

    return nextState
  },
}

const clientsListReducer = (
  createReducer(
    reducerActions,
    initialState,
  )
)
```

#### Args
This is a function that returns a reducer function.

##### `reducerActions` _(Object)_
An object where the keys are actions and the values are reducer functions.

##### `initialState` _(any)_
The initial value of the reducer's state.

---

### createReducerReducer
This is a higher-order reducer that takes an array of reducers and returns a new one. Instead of taking an initial state, it generates it by calling each reducer in-order and reducing the state from all of them.

It's rare you'd need this reducer combiner, but it might be necessary depending on your needs. If you want to segment out a bunch of logic into separate reducers and need a few of them to interact with the state from other reducers, that's where you'd want to use this function.

It allows you to run an array of reducers in order and run the output through another reducer to get a final value. The intention is to clean up messy code by segmenting reducers to a single use. It also allows those reducers to be more-easily tested and even used for other areas of the application.

#### Example
```js
// gridPersonReducer.js
const initialState = { personType: '' }

const reducerActions = {
  [FILTER_BY_PERSON]: (
    (prevState, { personType }) => ({
      ...prevState,
      personType,
    })
  ),

  [INITIALIZE_GRID]: (
    (prevState, { personType }) => ({
      ...prevState,
      personType,
    })
  ),

  [RESET_GRID]: prevState => ({
    ...prevState,
    ...initialState,
  }),
}

const gridPersonReducer = (
  createReducer(
    reducerActions,
    initialState,
  )
)

// gridTodayReducer.js
const initialState = { isToday: false }

const reducerActions = {
  [TOGGLE_CURRENT_DAY]: (
    (prevState, { friendType }) => ({
      ...prevState,
      isToday: !prevState.isToday,
    })
  ),

  [INITIALIZE_GRID]: (
    (prevState, { friendType }) => ({
      ...prevState,
      isToday,
    })
  ),

  [RESET_GRID]: prevState => ({
    ...prevState,
    ...initialState,
  }),
}

const gridTodayReducer = (
  createReducer(
    reducerActions,
    initialState,
  )
)

// gridReducer.js
const gridReducer = (
  createReducerReducer
    gridPersonReducer,
    gridTodayReducer,
  )
)
```

#### Args
This is a higher-order reducer that takes reducers and returns a reducer.

##### `reducers` _(Array)_
An array of reducers to reduce in-order.

---

### ofNamespace
Much like Redux-Observable's `ofType`, `ofNamespace` searches for the given `namespace` prop on the action. If found, it allows data to pass through. If not, it stops right there the same way as RxJS's `filter`.

#### Example
##### Simple
```js
action$
.pipe(
  ofType(RECONNECT_TO_SERVER),
  ofNamespace('persons'),
  // ...
)
```

##### Advanced
```js
action$
.pipe(
  ofType(RECONNECT_TO_SERVER),
  ofNamespace(namespace),
  takeUntil(
    action$
    .pipe(
      ofType(DISCONNECT_FROM_SERVER),
      ofNamespace(namespace),
    )
  ),
  startWith(null),
  map(() => (
    webSocket({
      protocol: protocolVersion,
      url: 'wss://example.com'
    })
  )),
  map(webSocketServer => (
    addServer({
      connection: webSocketServer,
      namespace,
    })
  )),
)
```

#### Args
##### `expectedNamespace` _(any)_
Usually, `namespace` will be a string, but depending on reducer, it may be an object. Sometimes you may be statically assigning the `namespace` value in your epic, but in the advanced example above, it's being dynamically pulled in at a higher level.
