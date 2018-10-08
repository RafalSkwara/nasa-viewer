import {combineReducers} from 'redux'
import thunk from "redux-thunk"
import {keyReducer} from './keyReducer'
import {EPICReducer} from './EPICReducer'
import { APOADReducer } from './APOADReducer'
import { NeoReducer } from './NeoReducer'
import { MarsReducer } from './MarsReducer'

const rootReducer = combineReducers({
	keyReducer,
	EPICReducer,
	APOADReducer,
	NeoReducer,
	MarsReducer
});
// const rootReducer = (state = 
// 	{ apiKey: "bcfe80d108c38d49f6ebc3fdf06942e0"
// }) => state

export default rootReducer