import { messageTypes } from '../config/config.js'

const filters = (state = {}, action) => {

    if (action.type === messageTypes.receiveDockerData) {
        return Object.assign({}, state, {
            networks: {
                values: Object.keys(action.payload.Networks),
                current: ''
            }
        })
    }

    return state
}

export default filters
