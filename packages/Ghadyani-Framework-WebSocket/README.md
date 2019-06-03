# Ghadyani Framework for WebSockets

For an example use case, look at [`./app.js`](app.js).

## Installation

### `npm`
```sh
npm i @ghadyani-framework/websocket @ghadyani-framework/node @ghadyani-framework/redux-utils
```

### `yarn`
```sh
yarn add @ghadyani-framework/websocket @ghadyani-framework/node @ghadyani-framework/redux-utils
```

## API

### Redux
- `createHttpServers`
- `createWebSocketServers`
- `ofReponseType`
- `ofRequestType`
- `webSocketsEpic`
- `webSocketsReducers`

## Custom Configuration

### WebSocket Server
To configure the Webpack listener, you have 3 options available to modify in your `./localConfig.js`:

module.exports = {
	// ... other config options ...
	hostname,
	port,
	protocol,
}

## Testing

### Join a Channel
To test joining a channel, load up a browser, and go to `about:blank`.

Then paste this into the devtools console:
```js
webSocket = new WebSocket('ws://localhost:3000', 'v1')
webSocket.onmessage = console.log
webSocket.onerror = console.error
webSocket.onclose = console.info
webSocket.onopen = () => {
	console.log('READY')
	
	webSocket
	.send(
		JSON
		.stringify({
			channelName: 'TestChannel',
			type: 'REQUEST::JOIN_CHANNEL',
		})
	)
}
```
