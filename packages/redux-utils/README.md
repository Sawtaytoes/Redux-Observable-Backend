# Redux Helpers for Ghadyani Framework Packages
Redux helper functions and middleware.

> _**NOTE:** I've changed the API for `createNamespaceReducer`. By default, it will utilize an object but can be extended to use a `Map` or some other storage mechanism instead. The previous `Map` functionality is now it's own function: `createMappedNamespaceReducer`._

## Installation

### `npm`
```sh
npm i @redux-observable-backend/redux-utils @redux-observable-backend/base
```

### `yarn`
```sh
yarn add @redux-observable-backend/redux-utils @redux-observable-backend/base
```

## API

### Redux Middleware
- `createActionLoggerMiddleware`

### fp Reducer Patterns
- `createMappedNamespaceReducer`
- `createMergeById`
- [`createNamespaceReducer`](https://medium.com/@Sawtaytoes/the-secret-to-using-redux-createnamespacereducer-d3fed2ccca4a)
- `createNamespaceReducerCreator` // Extensible function to create namespaceReducer creator functions.
- `createNamespaceSelector`
- `createReducer`
- `createReduceReducers`

### RxJS Utilities
- `mapToState`
- `simpleMap`
- `stateSelector`
