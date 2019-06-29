const { map, mergeMap, switchMap } = require('rxjs/operators')
const { of } = require('rxjs')
const { ofType } = require('redux-observable')

const { selectChannelList } = require('./selectors')
const { leaveChannel } = require('$redux/channels/actions')
const { REMOVE_CLIENT } = require('$redux/clients/actions')

const removeDisconnectedClientChannelsEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(REMOVE_CLIENT),
			mergeMap(({ connection }) => (
				of(state$.value)
				.pipe(
					map(selectChannelList()),
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
