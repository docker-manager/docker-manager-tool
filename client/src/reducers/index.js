import { combineReducers } from 'redux'
import docker from './docker'
import filters from './filters'
import view from './view'

const RootReducer = combineReducers({
    docker,
    filters,
    view,
})

export default RootReducer
