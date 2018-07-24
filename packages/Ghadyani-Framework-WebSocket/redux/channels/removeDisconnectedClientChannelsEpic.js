const { ActionsObservable, ofType } = require('redux-observable')
const { map, mergeMap, tap } = require('rxjs/operators')

const stateSelector = require('@ghadyani-framework/node/utils/rxjs/stateSelector')
const { getChannelsList } = require('./selectors')
const { leaveChannel } = require('$redux/channels/actions')
const { REMOVE_CLIENT } = require('$redux/clients/actions')

const removeDisconnectedClientChannelsEpic = (action$, state$) => (
	action$
	.pipe(
		ofType(REMOVE_CLIENT),
		mergeMap(({ connection }) => (
			stateSelector({
				selector: getChannelsList,
				state$,
			})
			.pipe(
				map(channelName => (
					leaveChannel({
						connection,
						namespace: channelName,
					})
				)),
				map(action => (
					ActionsObservable
					.of(action)
				)),
			)
		)),
		tap(() => console.log('-----------------')),
		tap(console.log),
	)
)

module.exports = removeDisconnectedClientChannelsEpic
