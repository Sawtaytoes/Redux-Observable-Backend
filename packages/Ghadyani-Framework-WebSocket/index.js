#!/usr/bin/env node
require('@ghadyani-framework/setup-module-aliases')(__dirname)

const createWebSocketServers = require('$redux/webSocketServers/utils/createWebSocketServers')

module.exports = {
	createWebSocketServers,
}
