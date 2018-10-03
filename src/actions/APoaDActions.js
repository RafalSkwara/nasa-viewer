export function setImageUrl(str) {
	return {
		type: "SET_IMAGE_URL",
		payload: str
	};
}
export function setHDImageUrl(str) {
	return {
		type: "SET_HD_IMAGE_URL",
		payload: str
	};
}
export function setDetails(str) {
	return {
		type: "SET_DETAILS",
		payload: str
	};
}
export function setMediaType(str) {
	return {
		type: "SET_MEDIA_TYPE",
		payload: str
	};
}
export function bulkUpdateImage(obj) {
	return {
		type: "BULK_UPDATE_IMAGE",
		payload: obj
	};
}
export function clearImageData() {
	return {
		type: "CLEAR_IMAGE_DATA"
	};
}