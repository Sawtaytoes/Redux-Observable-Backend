const itemMatchesIds = (
	(item, ids) => searchItem => (
		ids
		.every(id => (
			item[id] === searchItem[id]
		))
	)
)

const createMergeById = (
	(...ids) => (currentItems, updatedItems) => (
		currentItems
		.map(object => (
			(
				updatedItems
				.find(
					itemMatchesIds(
						object,
						ids,
					)
				)
			)
			? {
				...object,
				...(
					updatedItems
					.find(
						itemMatchesIds(
							object,
							ids,
						)
					)
				),
			}
			: object
		))
		.concat(
			updatedItems
			.filter(updatedObject => (
				!(
					currentItems
					.find(
						itemMatchesIds(
							updatedObject,
							ids,
						)
					)
				)
			))
		)
	)
)

module.exports = createMergeById
