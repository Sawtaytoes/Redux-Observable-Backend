# Redux Observable Backend - Redux Helpers
[What is this library?](https://github.com/Sawtaytoes/Redux-Observable-Backend/blob/master/README.md)

Redux helper functions and middleware.

> _**NOTE:** I've changed the API for `createNamespaceReducer`. By default, it will utilize an object but can be extended to use a `Map` or some other storage mechanism instead. The previous `Map` functionality is now it's own function: `createMappedNamespaceReducer`._

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

### RxJS
- `createEpicError`
- `ofNamespace`
