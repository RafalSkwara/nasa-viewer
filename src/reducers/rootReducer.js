import {combineReducers} from 'redux'
import thunk from "redux-thunk"
import {keyReducer} from './keyReducer'

const rootReducer = combineReducers({
	keyReducer
});
// const rootReducer = (state = 
// 	{ apiKey: "bcfe80d108c38d49f6ebc3fdf06942e0"
// }) => state

export default rootReducer