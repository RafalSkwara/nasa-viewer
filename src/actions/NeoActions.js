export function NeoSetEndDate(str) {
	return {
		type: "NEO_SET_END_DATE",
		payload: str
	};
}
export function NeoSetStartDate(str) {
	return {
		type: "NEO_SET_START_DATE",
		payload: str
	};
}
