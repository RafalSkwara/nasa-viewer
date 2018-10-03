export function EPICVariantPlus() {
	return {
		type: "EPIC_VARIANT_PLUS"
	};
}
export function EPICVariantMinus() {
	return {
		type: "EPIC_VARIANT_MINUS"
	};
}
export function EPICSetVariant(num) {
	return {
		type: "EPIC_SET_VARIANT",
		payload: num
	};
}
export function EPICSetImage(str) {
	return {
		type: "EPIC_SET_IMAGE",
		payload: str
	};
}
export function EPICClearImage() {
	return {
		type: "EPIC_CLEAR_IMAGE"
	};
}
export function EPICSetLength(num) {
	return {
		type: "EPIC_SET_LENGTH",
		payload: num
	};
}
export function EPICSetDate(arr) {
	return {
		type: "EPIC_SET_DATE",
		payload: arr
	};
}

export function changeEPICNatural() {
	return {
		type: "CHANGE_EPIC_NATURAL",
	};
}
