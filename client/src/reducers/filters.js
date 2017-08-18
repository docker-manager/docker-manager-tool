import { messageTypes } from '../config/config.js'
import * as actionTypes from '../actions/actionTypes'

const filters = (state = {}, action) => {

    if (action.type === messageTypes.receiveDockerData) {
        return Object.assign({}, state, {
            networks: {
                values: Object.keys(action.payload.Networks),
                current: action.payload.Filters.NetworksFilter
            },
            containers: {
                current: action.payload.Filters.ContainersFilter,
                all: action.payload.Filters.ContainersFilterAll,
            }
        })
    }

    if (action.type === actionTypes.resetDockerFilterForm) {
        console.log('reset')
        return Object.assign({}, state, {
            networks: {
                values: [],
                current: ''
            },
            containers: {
                current: '',
                all: false,
            }
        })
    }

    return state
}

export default filters
