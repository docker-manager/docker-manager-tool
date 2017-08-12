import { messageTypes } from '../config/config.js'

const filters = (state = {}, action) => {

    if (action.type === messageTypes.refreshDocker) {
        return Object.assign({}, state, {
            networks: {
                values: Object.keys(action.payload.Networks),
                selectedFilter: ''
            }
        })
    }

    return state
}

export default filters
