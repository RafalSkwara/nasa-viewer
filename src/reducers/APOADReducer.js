export const APOADReducer = (state = {
	imgUrl:'',
	imgHDUrl: '',
	mediaType: '',
	details: ''
}, action) => {
	switch (action.type) {
		case 'SET_IMAGE_URL':
			return {
				...state,
				imageUrl: action.payload
			}
		case 'SET_HD_IMAGE_URL':
			return {
				...state,
				imageHDUrl: action.payload
			}
		case 'SET_DETAILS':
			return {
				...state,
				details: action.payload
			}
		case 'SET_MEDIA_TYPE':
			return {
				...state,
				mediaType: action.payload
			}
		case 'BULK_UPDATE_IMAGE':
			return {
				...state,
				imgUrl: action.payload.imgUrl,
				imgHDUrl: action.payload.imgHDUrl,
				mediaType: action.payload.mediaType,
				details: action.payload.details
			}
		case 'CLEAR_IMAGE_DATA':
			return {
				...state,
				imgUrl: '',
				imgHDUrl: '',
				mediaType: '',
				details: '',
			}
		default:
			return state;
	}
}
