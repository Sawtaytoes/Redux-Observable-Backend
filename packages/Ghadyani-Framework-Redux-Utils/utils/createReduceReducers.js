const getInitialState = (
	reducers => (
		reducers
		.map(reducer => (
			reducer(
				undefined,
				{},
			)
		))
		.reduce(
			(prevState, state) => ({
				...prevState,
				...state,
			})
		)
	)
)

const createReduceReducers = (
	(...reducers) => {
		const initialState = (
			getInitialState(reducers)
		)

		return (
			(prevState = initialState, action) => (
				reducers
				.reduce(
					(state, reducer) => (
						reducer(
							state,
							action,
						)
					),
					prevState,
				)
			)
		)
	}
)

module.exports = createReduceReducers
