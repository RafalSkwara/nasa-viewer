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
