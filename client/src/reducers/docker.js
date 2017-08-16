import { messageTypes } from '../config/config.js'

const docker = (state = {}, action) => {

    if (action.type === messageTypes.receiveDockerData) {
        return Object.assign({}, state, {
            containers: action.payload.Containers,
            networks: action.payload.Networks
        })
    }

    return state
}

export default docker
