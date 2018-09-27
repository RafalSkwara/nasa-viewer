export const keyReducer = (state = {
	apiKey: "bcfe80d108c38d49f6ebc3fdf06942e0"
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
