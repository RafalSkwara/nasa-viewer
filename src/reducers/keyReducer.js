export const keyReducer = (state = {
	apiKey: "LqGe0BDDEOUijMSxA6encVpjHH9ETdmVNMb2tfuX"
}, action) => {
	switch (action.type) {
		case 'CHANGE_KEY':
			return {
				...state,
				apiKey: action.payload
			}
		default:
			return state;
	}
}
