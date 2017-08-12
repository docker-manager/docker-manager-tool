import * as actionTypes from '../actions/actionTypes'

const view = (state = {}, action) => {

    if (action.type === actionTypes.selectContainer) {
        return Object.assign({}, state, {
            selectedContainerId: action.containerId
        })
    }

    return state
}

export default view
