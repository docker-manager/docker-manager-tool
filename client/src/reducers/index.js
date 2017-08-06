import { combineReducers } from 'redux'
import dockerNetwork from './dockerNetwork'

const RootReducer = combineReducers({
    dockerNetwork
})

export default RootReducer
