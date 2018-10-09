export function MarsSetSolMax(str) {
	return {
		type: "MARS_SET_SOL_MAX",
		payload: str
	};
}
export function MarsSetSolDate(str) {
	return {
		type: "MARS_SET_SOL_DATE",
		payload: str
	};
}
export function MarsSetCamera(str) {
	return {
		type: "MARS_SET_CAMERA",
		payload: str
	};
}
export function MarsSetRover(str) {
	return {
		type: "MARS_SET_ROVER",
		payload: str
	};
}
export function MarsGetPictures(arr) {
	return {
		type: "MARS_GET_PICTURES",
		payload: arr
	};
}
export function MarsSetEmptyPictures(bool) {
	return {
		type: "MARS_SET_EMPTY_PICTURES",
		payload: bool
	};
}