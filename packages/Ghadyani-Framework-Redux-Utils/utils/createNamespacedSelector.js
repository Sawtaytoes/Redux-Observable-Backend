const createNamespaceSelector = (
	(select, format) => {
		const previousSelectedValue = {}
		const previousFormattedValue = {}

		return (
			(state, props) => {
				const selectedValue = select(state, props)
				const { namespace } = props

				const formattedValue = (
					selectedValue !== previousSelectedValue[namespace]
					? ({
						[namespace]: (
							format(selectedValue)
						),
					})
					: previousFormattedValue[namespace]
				)

				previousSelectedValue[namespace] = selectedValue
				previousFormattedValue[namespace] = formattedValue

				return formattedValue
			}
		)
	}
)

module.exports = createNamespaceSelector
