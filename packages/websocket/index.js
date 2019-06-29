#!/usr/bin/env node
require('better-module-alias')(__dirname)

const createHttpServers = require('$redux/httpServers/utils/createHttpServers')
const createWebSocketServers = require('$redux/webSocketServers/utils/createWebSocketServers')

const {
	rootEpic,
	rootReducers,
} = require('$redux')

const {
	ofReponseType,
	ofRequestType,
} = require('$redux/utils/actionTypeCheckers')

module.exports = {
	channels: require('$redux/channels').channels,
	clients: require('$redux/clients').clients,
	createHttpServers,
	createWebSocketServers,
	externalConnections: require('$redux/externalConnections').externalConnections,
	httpServers: require('$redux/httpServers').httpServers,
	messages: require('$redux/messages').messages,
	ofReponseType,
	ofRequestType,
	webSocketsEpic: rootEpic,
	webSocketServers: require('$redux/webSocketServers').webSocketServers,
	webSocketsReducers: rootReducers,
}
