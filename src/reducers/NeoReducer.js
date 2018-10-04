export const NeoReducer = (state = {
	startDate: '',
	endDate: ''
}, action) => {
	switch (action.type) {
		case 'NEO_SET_START_DATE':
			return {
				...state,
				startDate: action.payload,
			}
		case 'NEO_SET_END_DATE':
			return {
				...state,
				endDate: action.payload,
			}

		default:
			return state;
	}
}
