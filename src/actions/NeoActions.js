export function NeoSetStartDate(str) {
	return {
		type: "NEO_SET_START_DATE",
		payload: str
	};
}
export function NeoGetAllDates(arr) {
	return {
		type: "NEO_GET_ALL_DATES",
		payload: arr
	};
}
export function NeoGetNeos(arr) {
	return {
		type: "NEO_GET_NEOS",
		payload: arr
	};
}
export function NeoClearNeo() {
	return {
		type: "NEO_CLEAR_NEOS"
	};
}
