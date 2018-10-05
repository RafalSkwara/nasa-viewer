export const NeoReducer = (state = {
	startDate: '',
	endDate: '',
	dates: [],
	asteroids: []
}, action) => {
	switch (action.type) {
		case 'NEO_SET_START_DATE':
			return {
				...state,
				startDate: action.payload,
			}
		case 'NEO_GET_ALL_DATES':
			return {
				...state,
				dates: action.payload,
			}
		case 'NEO_GET_NEOS':
			return {
				...state,
			asteroids: action.payload,
			}
		case 'NEO_CLEAR_NEOS':
			return {
				...state,
			asteroids: [],
			}

		default:
			return state;
	}
}
