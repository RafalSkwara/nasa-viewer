export const EPICReducer = (state = {
	natural: true,
	pictureName: '',
	variant: 0,
	imgUrl: '',
	imgLength: 2,
	day: 0,
	month: 0,
	year: 0
}, action) => {
	switch (action.type) {
		case 'EPIC_SET_DATE':
			return {
				...state,
				day: action.payload[0],
				month: action.payload[1],
				year: action.payload[2]
			}
		case 'EPIC_SET_IMAGE':
			return {
				...state,
				imgUrl: action.payload
			}
		case 'EPIC_CLEAR_IMAGE':
			return {
				...state,
				imgUrl: ''
			}
		case 'EPIC_SET_LENGTH':
			return {
				...state,
				imgLength: action.payload
			}
		case 'CHANGE_EPIC_NATURAL':
			return {
				...state,
				natural: !state.natural
			}
		case 'EPIC_VARIANT_PLUS':
			return {
				...state,
				variant: state.variant+1
			}
		case 'EPIC_VARIANT_MINUS':
			return {
				...state,
				variant: state.variant-1
			}
		case 'EPIC_SET_VARIANT':
			return {
				...state,
				variant: action.payload
			}
		default:
			return state;
	}
}
