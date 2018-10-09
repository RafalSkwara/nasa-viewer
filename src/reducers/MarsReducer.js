export const MarsReducer = (state = {
	solDate: 1,
	solMax: 5111,
	rover: 'curiosity',
	camera: 'NAVCAM',
	pictures: [],
	empty: true
}, action) => {
	switch (action.type) {
		case 'MARS_SET_ROVER':
			return {
				...state,
				rover: action.payload,
			}
		case 'MARS_SET_CAMERA':
			return {
				...state,
				camera: action.payload,
			}
		case 'MARS_SET_SOL_DATE':
			return {
				...state,
			solDate: action.payload,
			}
		case 'MARS_SET_SOL_MAX':
			return {
				...state,
			solMax: action.payload,
			}
		case 'MARS_GET_PICTURES':
			return {
				...state,
			pictures: action.payload,
			}
		case 'MARS_SET_EMPTY_PICTURES':
			return {
				...state,
			empty: action.payload,
			}
		default:
			return state;
	}
}
