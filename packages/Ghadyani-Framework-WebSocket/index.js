#!/usr/bin/env node
require('@ghadyani-framework/setup-module-aliases')(__dirname)

const createHttpServers = require('$redux/httpServers/utils/createHttpServers')
const createWebSocketServers = require('$redux/webSocketServers/utils/createWebSocketServers')

module.exports = {
	createHttpServers,
	createWebSocketServers,
}
