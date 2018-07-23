#!/usr/bin/env node
require('module-alias/register')

const createWebSocketServers = require('$$redux/webSocketServers/utils/createWebSocketServers')

module.exports = {
	createWebSocketServers,
}
