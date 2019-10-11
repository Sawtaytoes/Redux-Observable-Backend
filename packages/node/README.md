# Redux Observable Backend - Node
[What is this library?](https://github.com/Sawtaytoes/Redux-Observable-Backend/blob/master/README.md)

For an example use case, look at [`./app.js`](app.js).

## Installation
This package requires you also install these peer dependencies:

- `@redux-observable-backend/redux-utils`
- `rxjs`

### npm
```sh
npm i rxjs @redux-observable-backend/node @redux-observable-backend/redux-utils
```

### yarn
```sh
yarn add rxjs @redux-observable-backend/node @redux-observable-backend/redux-utils
```

## API
- `createConfigurationSet`
- `nodeEpic`
- `nodeReducers`
- `ofTaskName`
- `runTasks`

## Custom Configuration

### NODE_ENV
To configure your Node environment, you don't have to specify NODE_ENV at the command line or scripting layer. You could instead add a `./localConfig.js` file:

module.exports = {
	nodeEnv: 'development',
}
