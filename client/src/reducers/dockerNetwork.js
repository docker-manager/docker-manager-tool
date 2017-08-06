import { messageTypes } from '../config/config.js'

const dockerNetwork = (state = {}, action) => {

    if (action.type === messageTypes.refreshNetwork) {
        return Object.assign({}, state, {
            containers: JSON.parse(action.payload),
        })
    }

    return state
}

export default dockerNetwork
