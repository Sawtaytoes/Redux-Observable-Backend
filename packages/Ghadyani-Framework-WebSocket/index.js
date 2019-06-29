#!/usr/bin/env node
require('@redux-observable-backend/setup-module-aliases')(__dirname)

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
	createHttpServers,
	createWebSocketServers,
	ofReponseType,
	ofRequestType,
	webSocketsEpic: rootEpic,
	webSocketsReducers: rootReducers,
}
