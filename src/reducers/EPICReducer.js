export const EPICReducer = (state = {
	natural: true,
	pictureName: '',
	variant: 0
}, action) => {
	switch (action.type) {
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
