const createNamespaceSelector = (
	select,
) => (
	state,
	props,
) => ({
	[props.namespace]: (
		select(state, props)
	),
})

module.exports = createNamespaceSelector
