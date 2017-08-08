import { messageTypes } from '../config/config.js'

const dockerNetwork = (state = {}, action) => {

    if (action.type === messageTypes.refreshNetwork) {
        let dockerNetwork = JSON.parse(action.payload)
        return Object.assign({}, state, {
            containers: dockerNetwork.Containers,
            networks: dockerNetwork.Networks,
        })
    }

    return state
}

export default dockerNetwork
