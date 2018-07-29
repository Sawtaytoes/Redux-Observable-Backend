#!/usr/bin/env node
require('@ghadyani-framework/setup-module-aliases')(__dirname)

const createHttpServers = require('$redux/httpServers/utils/createHttpServers')
const createWebSocketServers = require('$redux/webSocketServers/utils/createWebSocketServers')
const { ofReponseType, ofRequestType } = require('$redux/utils/actionTypeCheckers')
const { rootEpic, rootReducers } = require('$redux')

module.exports = {
	createHttpServers,
	createWebSocketServers,
	ofReponseType,
	ofRequestType,
	webSocketsEpic: rootEpic,
	webSocketsReducers: rootReducers,
}
