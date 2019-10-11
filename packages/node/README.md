# Redux Observable Backend - Node
[What is this library?](https://github.com/Sawtaytoes/Redux-Observable-Backend/blob/master/README.md)

For an example use case, look at [`./app.js`](app.js).

## Installation

### `npm`
```sh
npm i @redux-observable-backend/node @redux-observable-backend/redux-utils
```

### `yarn`
```sh
yarn add @redux-observable-backend/node @redux-observable-backend/redux-utils
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
