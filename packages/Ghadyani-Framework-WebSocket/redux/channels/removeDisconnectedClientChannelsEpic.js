const { map, mergeMap, switchMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')
const { stateSelector } = require('@ghadyani-framework/redux-utils')

const { channelsListSelector } = require('./selectors')
const { leaveChannel } = require('$redux/channels/actions')
const { REMOVE_CLIENT } = require('$redux/clients/actions')

const removeDisconnectedClientChannelsEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(REMOVE_CLIENT),
			mergeMap(({ connection }) => (
				stateSelector({
					selector: channelsListSelector,
					state$,
				})
				.pipe(
					switchMap(channelsList => (
						channelsList
					)),
					map(channelName => (
						leaveChannel({
							connection,
							namespace: channelName,
						})
					)),
				)
			)),
		)
	)
)

module.exports = removeDisconnectedClientChannelsEpic
